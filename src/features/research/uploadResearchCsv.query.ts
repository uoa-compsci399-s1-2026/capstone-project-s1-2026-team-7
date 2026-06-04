import { readFile } from 'node:fs/promises'
import { getPayloadClient } from '@/lib/payload'
import { uploadResearch } from './uploadResearch.query'
import {
  buildCsvResearchIdentity,
  markMissingResearchAsCsvDeleted,
  type CsvDeletedResearchIdentities,
} from './researchCsvDeletionPersistence'

type ResearchCsvRow = {
  title: string
  doi: string
  url: string
  publicationDate: string
  staffNames?: string
  staffIds: string
  orcidIds?: string
  categories?: string
}

type ParsedResearchRow = {
  title: string
  doi: string
  url: string
  publicationDate: string
  staffIds: number[]
  categoryNames: string[]
}

export type UploadResearchCsvProgressEvent = {
  index: number
  total: number
  status: 'created' | 'updated' | 'skipped' | 'failed' | 'deleted'
  title: string
  error?: string
}

export type UploadResearchCsvResult = {
  totalRows: number
  validRows: number
  uploadedRows: number
  createdRows: number
  updatedRows: number
  skippedRows: number
  failedRows: number
  deletedRows: number
}

function parseCsv(content: string): Record<string, string>[] {
  const rows: string[][] = []
  let currentRow: string[] = []
  let currentValue = ''
  let insideQuotes = false

  const cleanedContent = content.replace(/^\uFEFF/, '')

  for (let i = 0; i < cleanedContent.length; i++) {
    const char = cleanedContent[i]
    const nextChar = cleanedContent[i + 1]

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        currentValue += '"'
        i++
      } else {
        insideQuotes = !insideQuotes
      }

      continue
    }

    if (char === ',' && !insideQuotes) {
      currentRow.push(currentValue)
      currentValue = ''
      continue
    }

    if ((char === '\n' || char === '\r') && !insideQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++
      }

      currentRow.push(currentValue)

      if (currentRow.some((value) => value.trim().length > 0)) {
        rows.push(currentRow)
      }

      currentRow = []
      currentValue = ''
      continue
    }

    currentValue += char
  }

  if (currentValue.length > 0 || currentRow.length > 0) {
    currentRow.push(currentValue)

    if (currentRow.some((value) => value.trim().length > 0)) {
      rows.push(currentRow)
    }
  }

  if (rows.length === 0) {
    return []
  }

  const headers = rows[0].map((header) => header.trim())

  return rows.slice(1).map((row) => {
    const record: Record<string, string> = {}

    headers.forEach((header, index) => {
      record[header] = row[index]?.trim() ?? ''
    })

    return record
  })
}

function parseStaffIds(value: string | undefined): number[] {
  if (!value) {
    return []
  }

  return value
    .split(/[;,]/)
    .map((id) => Number(id.trim()))
    .filter((id) => Number.isInteger(id) && id > 0)
}

function parseCategoryNames(value: string | undefined): string[] {
  if (!value) {
    return []
  }

  const separator = value.includes(';') ? /;/ : /,/

  return value
    .split(separator)
    .map((category) => category.trim())
    .filter(Boolean)
}

function normalizeDoi(value: string | undefined): string {
  if (!value) {
    return ''
  }

  return value
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\/(dx\.)?doi\.org\//, '')
    .replace(/^doi:/, '')
}

function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function normalizeResearchCsvRow(
  row: Record<string, string>,
  rowNumber: number,
): ParsedResearchRow | null {
  const csvRow = row as ResearchCsvRow

  const title = csvRow.title?.trim()

  if (!title) {
    console.warn(`Skipping row ${rowNumber}: missing title`)
    return null
  }

  return {
    title,
    doi: normalizeDoi(csvRow.doi),
    url: csvRow.url?.trim() ?? '',
    publicationDate: csvRow.publicationDate?.trim() ?? '',
    staffIds: parseStaffIds(csvRow.staffIds),
    categoryNames: parseCategoryNames(csvRow.categories),
  }
}

async function buildCategoryResolver(
  rows: ParsedResearchRow[],
  dryRun: boolean,
): Promise<(names: string[]) => number[]> {
  if (dryRun) {
    return () => []
  }

  const uniqueNames = Array.from(new Set(rows.flatMap((row) => row.categoryNames).filter(Boolean)))

  if (uniqueNames.length === 0) {
    return () => []
  }

  const payload = await getPayloadClient()
  const uniqueSlugs = uniqueNames.map(slugify)

  const existing = await payload.find({
    collection: 'research-categories',
    where: {
      or: [{ title: { in: uniqueNames } }, { slug: { in: uniqueSlugs } }],
    },
    limit: uniqueNames.length * 2,
  })

  const titleToId = new Map<string, number>()
  const slugToId = new Map<string, number>()

  for (const category of existing.docs) {
    if (category.title) titleToId.set(category.title, category.id)
    if (category.slug) slugToId.set(category.slug, category.id)
  }

  const nameToId = new Map<string, number>()

  for (const name of uniqueNames) {
    const slug = slugify(name)
    const existingId = titleToId.get(name) ?? slugToId.get(slug)

    if (existingId !== undefined) {
      nameToId.set(name, existingId)
      continue
    }

    const created = await payload.create({
      collection: 'research-categories',
      data: { title: name, slug },
    })

    nameToId.set(name, created.id)
  }

  return (names) => {
    const ids: number[] = []
    const seen = new Set<number>()

    for (const name of names) {
      const id = nameToId.get(name)

      if (id !== undefined && !seen.has(id)) {
        ids.push(id)
        seen.add(id)
      }
    }

    return ids
  }
}

async function processRowsWithConcurrency<T>(
  items: T[],
  concurrency: number,
  fn: (item: T, index: number) => Promise<void>,
): Promise<void> {
  let nextIndex = 0

  async function worker(): Promise<void> {
    while (true) {
      const index = nextIndex++
      if (index >= items.length) return
      await fn(items[index], index)
    }
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, () => worker()))
}

export async function uploadResearchCsvContent(
  content: string,
  options?: {
    dryRun?: boolean
    onProgress?: (event: UploadResearchCsvProgressEvent) => void
  },
): Promise<UploadResearchCsvResult> {
  const dryRun = options?.dryRun ?? false
  const onProgress = options?.onProgress
  const rawRows = parseCsv(content)

  const rows = rawRows
    .map((row, index) => normalizeResearchCsvRow(row, index + 2))
    .filter((row): row is ParsedResearchRow => row !== null)

  let createdRows = 0
  let updatedRows = 0
  let skippedRows = 0
  let failedRows = 0
  let deletedRows = 0

  const activeIdentities: CsvDeletedResearchIdentities = {
    dois: new Set(),
    fallbackKeys: new Set(),
  }

  for (const row of rows) {
    const identity = buildCsvResearchIdentity({
      title: row.title,
      doi: row.doi,
      url: row.url,
      publicationDate: row.publicationDate,
    })

    if (identity.doi) {
      activeIdentities.dois.add(identity.doi)
    } else if (identity.fallbackKey.replace(/\|/g, '').trim()) {
      activeIdentities.fallbackKeys.add(identity.fallbackKey)
    }
  }

  const resolveCategoryIds = await buildCategoryResolver(rows, dryRun)

  await processRowsWithConcurrency(rows, 5, async (row, index) => {
    try {
      if (dryRun) {
        console.log(`[DRY RUN] Would upload row ${index + 1}: ${row.title}`)
        onProgress?.({
          index: index + 1,
          total: rows.length,
          status: 'skipped',
          title: row.title,
        })
        return
      }

      const categoryIDs = resolveCategoryIds(row.categoryNames)

      const result = await uploadResearch({
        title: row.title,
        doi: row.doi,
        link: row.url,
        date: row.publicationDate,
        staffID: row.staffIds,
        categoryIDs,
      })

      if (result.status === 'created') {
        createdRows++
      } else if (result.status === 'updated') {
        updatedRows++
      } else {
        skippedRows++
      }

      console.log(`${result.status} row ${index + 1}/${rows.length}: ${row.title}`)
      onProgress?.({
        index: index + 1,
        total: rows.length,
        status:
          result.status === 'created' || result.status === 'updated' ? result.status : 'skipped',
        title: row.title,
      })
    } catch (error) {
      failedRows++
      console.error(`Failed to upload row ${index + 1}: ${row.title}`)
      console.error(error)
      onProgress?.({
        index: index + 1,
        total: rows.length,
        status: 'failed',
        title: row.title,
        error: error instanceof Error ? error.message : String(error),
      })
    }
  })

  if (!dryRun && rows.length > 0) {
    deletedRows = await markMissingResearchAsCsvDeleted({
      activeIdentities,
      onDelete: ({ index, total, title }) => {
        onProgress?.({
          index,
          total,
          status: 'deleted',
          title,
        })
      },
    })
  }

  return {
    totalRows: rawRows.length,
    validRows: rows.length,
    uploadedRows: createdRows + updatedRows,
    createdRows,
    updatedRows,
    skippedRows,
    failedRows,
    deletedRows,
  }
}

export async function uploadResearchCsv(
  csvPath: string,
  options?: {
    dryRun?: boolean
  },
): Promise<UploadResearchCsvResult> {
  const content = await readFile(csvPath, 'utf8')

  return uploadResearchCsvContent(content, options)
}
