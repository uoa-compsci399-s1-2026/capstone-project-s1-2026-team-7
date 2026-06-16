import type { ParsedResearchRow, ResearchCsvRow } from './types'

export function parseCsv(content: string): Record<string, string>[] {
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

export function parseStaffIds(value: string | undefined): number[] {
  if (!value) {
    return []
  }

  return value
    .split(/[;,]/)
    .map((id) => Number(id.trim()))
    .filter((id) => Number.isInteger(id) && id > 0)
}

export function parseCategoryNames(value: string | undefined): string[] {
  if (!value) {
    return []
  }

  const separator = value.includes(';') ? /;/ : /,/

  return value
    .split(separator)
    .map((category) => category.trim())
    .filter(Boolean)
}

export function normalizeDoi(value: string | undefined): string {
  if (!value) {
    return ''
  }

  return value
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\/(dx\.)?doi\.org\//, '')
    .replace(/^doi:/, '')
}

export function normalizeResearchCsvRow(
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

export function parseResearchCsv(content: string): {
  rawRows: Record<string, string>[]
  rows: ParsedResearchRow[]
} {
  const rawRows = parseCsv(content)

  return {
    rawRows,
    rows: rawRows
      .map((row, index) => normalizeResearchCsvRow(row, index + 2))
      .filter((row): row is ParsedResearchRow => row !== null),
  }
}
