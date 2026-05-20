import { readFile } from 'node:fs/promises'
import { getPayloadClient } from '@/lib/payload'
import { uploadResearch } from './uploadResearch.query'

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

export type UploadResearchCsvResult = {
  totalRows: number
  validRows: number
  uploadedRows: number
  createdRows: number
  updatedRows: number
  skippedRows: number
  failedRows: number
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

async function resolveCategoryIDs(categoryNames: string[], dryRun: boolean): Promise<number[]> {
  if (dryRun || categoryNames.length === 0) {
    return []
  }

  const payload = await getPayloadClient()
  const categoryIDs: number[] = []

  for (const categoryName of [...new Set(categoryNames)]) {
    const slug = slugify(categoryName)

    const existing = await payload.find({
      collection: 'research-categories',
      where: {
        or: [
          {
            title: {
              equals: categoryName,
            },
          },
          {
            slug: {
              equals: slug,
            },
          },
        ],
      },
      limit: 1,
    })

    const existingCategory = existing.docs[0]

    if (existingCategory) {
      categoryIDs.push(existingCategory.id)
      continue
    }

    const createdCategory = await payload.create({
      collection: 'research-categories',
      data: {
        title: categoryName,
        slug,
      },
    })

    categoryIDs.push(createdCategory.id)
  }

  return categoryIDs
}

export async function uploadResearchCsvContent(
  content: string,
  options?: {
    dryRun?: boolean
  },
): Promise<UploadResearchCsvResult> {
  const dryRun = options?.dryRun ?? false
  const rawRows = parseCsv(content)

  const rows = rawRows
    .map((row, index) => normalizeResearchCsvRow(row, index + 2))
    .filter((row): row is ParsedResearchRow => row !== null)

  let createdRows = 0
  let updatedRows = 0
  let skippedRows = 0
  let failedRows = 0

  for (const [index, row] of rows.entries()) {
    try {
      if (dryRun) {
        console.log(`[DRY RUN] Would upload row ${index + 1}: ${row.title}`)
        continue
      }

      const categoryIDs = await resolveCategoryIDs(row.categoryNames, dryRun)

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
    } catch (error) {
      failedRows++
      console.error(`Failed to upload row ${index + 1}: ${row.title}`)
      console.error(error)
    }
  }

  return {
    totalRows: rawRows.length,
    validRows: rows.length,
    uploadedRows: createdRows + updatedRows,
    createdRows,
    updatedRows,
    skippedRows,
    failedRows,
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
