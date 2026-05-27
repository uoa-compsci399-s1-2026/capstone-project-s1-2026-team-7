import type { StaffDTO } from '@/features/our-team/staff.schema'
import { getStaff } from '@/features/our-team/getStaff.query'
import { getOrcidList, compareEntries, getData } from './input'
import { buildCsvRows, convertToCsv } from './output'
import { getEnabledCategories } from './getcategories'
import { CsvResearchRow, nameWithORcid, PerPersonOutputType } from './types'

export async function getResearchExportRows(): Promise<CsvResearchRow[]> {
  const staff: StaffDTO[] = await getStaff()
  const people: nameWithORcid[] = await getOrcidList(staff)

  const data: PerPersonOutputType[] = await getData(people)

  const cleanedResearch = compareEntries(data)
  const rows = buildCsvRows(cleanedResearch, people)

  const categoryResults = await getEnabledCategories(rows)

  return rows.map((row) => {
    const matchingCategoryResult = categoryResults.find((result) => result.title === row.title)

    return {
      ...row,
      categories: matchingCategoryResult?.categories.join('; ') ?? '',
    }
  })
}

export async function getResearchExportCsv(): Promise<{ csv: string; rows: CsvResearchRow[] }> {
  const rows = await getResearchExportRows()

  return {
    rows,
    csv: `${convertToCsv(rows)}\n`,
  }
}
