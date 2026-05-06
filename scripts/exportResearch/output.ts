import { CsvResearchRow, nameWithORcid, SharedArticle } from './types'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

function escapeCsvValue(value: string | number | null | undefined): string {
  const stringValue = value === null || value === undefined ? '' : String(value)

  if (/[",\n\r]/.test(stringValue)) {
    return `"${stringValue.replace(/"/g, '""')}"`
  }

  return stringValue
}

function convertToCsv(rows: CsvResearchRow[]): string {
  const headers: Array<keyof CsvResearchRow> = [
    'title',
    'doi',
    'url',
    'publicationDate',
    'staffNames',
    'staffIds',
    'orcidIds',
  ]

  const csvRows = rows.map((row) => headers.map((header) => escapeCsvValue(row[header])).join(','))

  return [headers.join(','), ...csvRows].join('\n')
}

export function buildCsvRows(
  cleanedResearch: SharedArticle[],
  people: nameWithORcid[],
): CsvResearchRow[] {
  return cleanedResearch.map((item) => {
    const linkedPeople = people.filter((person) => item.staffIds.includes(person.staffId))

    const orcidIds = linkedPeople.map((person) => person.orcid)

    return {
      title: item.article.title,
      doi: item.article.doi ?? '',
      url: item.article.url ?? '',
      publicationDate: item.article.publicationDate ?? '',
      staffNames: item.people.join('; '),
      staffIds: item.staffIds.join('; '),
      orcidIds: [...new Set(orcidIds)].join('; '),
    }
  })
}

export async function exportCsv(rows: CsvResearchRow[]): Promise<void> {
  const outputDirectory = path.resolve(process.cwd(), 'src', 'csv')
  const outputPath = path.join(outputDirectory, 'research.csv')

  await mkdir(outputDirectory, { recursive: true })
  await writeFile(outputPath, `${convertToCsv(rows)}\n`, 'utf8')

  console.log(`Exported ${rows.length} research records to ${outputPath}`)
}
