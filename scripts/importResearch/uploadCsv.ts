import 'dotenv/config'

import { readFile } from 'node:fs/promises'
import path from 'node:path'
import type { Payload, Where } from 'payload'

import { getPayloadClient } from '@/lib/payload'
import type { Research } from '@/payload-types'
import { uploadResearch, type UploadResearchDTO } from '@/queries/uploadResearch'

type CsvRow = Record<string, string>

type ResearchImportRow = {
  rowNumber: number
  title: string
  doi: string
  link: string
  date: string
  staffIds: number[]
  order: number
}

type ImportSummary = {
  created: number
  updated: number
  skipped: number
  failed: number
}

const DEFAULT_CSV_PATH = path.resolve(process.cwd(), 'src', 'csv', 'research.csv')

function hasFlag(flag: string): boolean {
  return process.argv.includes(flag)
}

function getOptionValue(optionName: string): string | null {
  const exactArg = process.argv.find((arg) => arg.startsWith(`${optionName}=`))

  if (exactArg) {
    return exactArg.slice(optionName.length + 1)
  }

  const optionIndex = process.argv.indexOf(optionName)

  if (optionIndex !== -1) {
    return process.argv[optionIndex + 1] ?? null
  }

  return null
}

function getCsvPath(): string {
  const fileOption = getOptionValue('--file')
  const positionalPath = process.argv.slice(2).find((arg) => !arg.startsWith('--'))

  return path.resolve(process.cwd(), fileOption ?? positionalPath ?? DEFAULT_CSV_PATH)
}

function parseCsvLineBreakAware(csvText: string): string[][] {
  const rows: string[][] = []
  let currentRow: string[] = []
  let currentValue = ''
  let insideQuotes = false

  for (let index = 0; index < csvText.length; index += 1) {
    const char = csvText[index]
    const nextChar = csvText[index + 1]

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        currentValue += '"'
        index += 1
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
        index += 1
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

  if (insideQuotes) {
    throw new Error('Invalid CSV: found an opening quote without a closing quote.')
  }

  currentRow.push(currentValue)

  if (currentRow.some((value) => value.trim().length > 0)) {
    rows.push(currentRow)
  }

  return rows
}

function normalizeHeader(header: string): string {
  return header
    .trim()
    .replace(/^\uFEFF/, '')
    .toLowerCase()
}

function parseCsv(csvText: string): CsvRow[] {
  const rows = parseCsvLineBreakAware(csvText)
  const [headers, ...dataRows] = rows

  if (!headers || headers.length === 0) {
    throw new Error('CSV file is empty or missing a header row.')
  }

  const normalizedHeaders = headers.map(normalizeHeader)

  return dataRows.map((row) => {
    const csvRow: CsvRow = {}

    normalizedHeaders.forEach((header, index) => {
      csvRow[header] = row[index]?.trim() ?? ''
    })

    return csvRow
  })
}

function getCell(row: CsvRow, aliases: string[]): string {
  for (const alias of aliases) {
    const value = row[normalizeHeader(alias)]

    if (value) {
      return value.trim()
    }
  }

  return ''
}

function normalizeDoi(doi: string): string {
  return doi
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\/(dx\.)?doi\.org\//, '')
    .replace(/^doi:/, '')
}

function parseStaffIds(staffIds: string): number[] {
  if (!staffIds.trim()) {
    return []
  }

  return staffIds
    .split(/[;,|]/)
    .map((staffId) => Number(staffId.trim()))
    .filter((staffId) => Number.isInteger(staffId) && staffId > 0)
}

function toResearchImportRows(rows: CsvRow[]): ResearchImportRow[] {
  return rows.map((row, index) => {
    const rowNumber = index + 2
    const title = getCell(row, ['title'])
    const doi = normalizeDoi(getCell(row, ['doi']))
    const link = getCell(row, ['url', 'link', 'researchLink', 'research link'])
    const date = getCell(row, ['publicationDate', 'publication date', 'date'])
    const staffIds = parseStaffIds(getCell(row, ['staffIds', 'staff ids', 'staffID', 'staff id']))
    const orderFromCsv = Number(getCell(row, ['order', 'sortOrder', 'sort order']))

    return {
      rowNumber,
      title,
      doi,
      link,
      date,
      staffIds,
      order: Number.isInteger(orderFromCsv) ? orderFromCsv : index + 1,
    }
  })
}

function validateResearchRow(row: ResearchImportRow): string | null {
  if (!row.title) {
    return 'missing title'
  }

  if (!row.doi) {
    return 'missing DOI'
  }

  if (!row.link) {
    return 'missing URL/link'
  }

  return null
}

async function findExistingResearch(
  payload: Payload,
  row: ResearchImportRow,
): Promise<Research | null> {
  const conditions: Where[] = []

  if (row.doi) {
    conditions.push({
      doi: {
        equals: row.doi,
      },
    })
  }

  if (row.link) {
    conditions.push({
      link: {
        equals: row.link,
      },
    })
  }

  if (conditions.length === 0) {
    return null
  }

  const where: Where = conditions.length === 1 ? conditions[0] : { or: conditions }

  const existingResearch = await payload.find({
    collection: 'research',
    where,
    limit: 1,
  })

  return existingResearch.docs[0] ?? null
}

async function createResearch(row: ResearchImportRow): Promise<void> {
  await uploadResearch({
    id: row.rowNumber,
    title: row.title,
    doi: row.doi,
    link: row.link,
    image: undefined as unknown as UploadResearchDTO['image'],
    date: row.date,
    staffID: row.staffIds,
    categories: [] as UploadResearchDTO['categories'],
    order: row.order,
  })
}

async function updateResearch(
  payload: Payload,
  existingResearch: Research,
  row: ResearchImportRow,
) {
  await payload.update({
    collection: 'research',
    id: existingResearch.id,
    data: {
      title: row.title,
      doi: row.doi,
      link: row.link,
      date: row.date,
      staff: row.staffIds,
      order: row.order,
    },
  })
}

async function importCsv(): Promise<ImportSummary> {
  const csvPath = getCsvPath()
  const dryRun = hasFlag('--dry-run')
  const csvText = await readFile(csvPath, 'utf8')
  const rows = toResearchImportRows(parseCsv(csvText))
  const payload = await getPayloadClient()

  const summary: ImportSummary = {
    created: 0,
    updated: 0,
    skipped: 0,
    failed: 0,
  }

  console.log(`Importing research CSV from ${csvPath}`)

  if (dryRun) {
    console.log('Dry run enabled. No database changes will be made.')
  }

  for (const row of rows) {
    const validationError = validateResearchRow(row)

    if (validationError) {
      summary.skipped += 1
      console.warn(`Skipping row ${row.rowNumber}: ${validationError}.`)
      continue
    }

    try {
      const existingResearch = await findExistingResearch(payload, row)

      if (dryRun) {
        console.log(
          `${existingResearch ? 'Would update' : 'Would create'} row ${row.rowNumber}: ${row.title}`,
        )
        continue
      }

      if (existingResearch) {
        await updateResearch(payload, existingResearch, row)
        summary.updated += 1
        console.log(`Updated row ${row.rowNumber}: ${row.title}`)
      } else {
        await createResearch(row)
        summary.created += 1
        console.log(`Created row ${row.rowNumber}: ${row.title}`)
      }
    } catch (error) {
      summary.failed += 1
      console.error(`Failed row ${row.rowNumber}: ${row.title}`)
      console.error(error)
    }
  }

  return summary
}

importCsv()
  .then((summary) => {
    console.log('Research CSV import complete.')
    console.table(summary)
  })
  .catch((error) => {
    console.error('Research CSV import failed.')
    console.error(error)
    process.exit(1)
  })
