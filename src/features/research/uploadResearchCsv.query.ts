import { readFile } from 'node:fs/promises'
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
}

export type UploadResearchCsvResult = {
  totalRows: number
  validRows: number
  uploadedRows: number
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
  }
}

export async function uploadResearchCsv(
  csvPath: string,
  options?: {
    dryRun?: boolean
  },
): Promise<UploadResearchCsvResult> {
  const dryRun = options?.dryRun ?? false

  const content = await readFile(csvPath, 'utf8')
  const rawRows = parseCsv(content)

  const rows = rawRows
    .map((row, index) => normalizeResearchCsvRow(row, index + 2))
    .filter((row): row is ParsedResearchRow => row !== null)

  let uploadedRows = 0
  let failedRows = 0

  for (const [index, row] of rows.entries()) {
    try {
      if (dryRun) {
        console.log(`[DRY RUN] Would upload row ${index + 1}: ${row.title}`)
        continue
      }

      await uploadResearch({
        title: row.title,
        doi: row.doi,
        link: row.url,
        date: row.publicationDate,
        staffID: row.staffIds,
      })

      uploadedRows++
      console.log(`Uploaded ${uploadedRows}/${rows.length}: ${row.title}`)
    } catch (error) {
      failedRows++
      console.error(`Failed to upload row ${index + 1}: ${row.title}`)
      console.error(error)
    }
  }

  return {
    totalRows: rawRows.length,
    validRows: rows.length,
    uploadedRows,
    failedRows,
  }
}
