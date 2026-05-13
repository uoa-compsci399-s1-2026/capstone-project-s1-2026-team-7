import 'dotenv/config'
import { StaffDTO } from '@/features'
import { getOrcidList, compareEntries, getData } from './input'
import { buildCsvRows, exportCsv } from './output'
import { getEnabledCategories } from './getcategories'
import { nameWithORcid, PerPersonOutputType } from './types'
import dummydata from './dummydata'
import { getStaff } from '@/features/our-team/getStaff.query'

async function main() {
  const staff: StaffDTO[] = await getStaff()
  const people: nameWithORcid[] = await getOrcidList(staff)

  const data: PerPersonOutputType[] = await getData(people)

  const cleanedResearch = compareEntries(data)
  const rows = buildCsvRows(cleanedResearch, people)

  const categoryResults = await getEnabledCategories(rows)

  const rowsWithCategories = rows.map((row) => {
    const matchingCategoryResult = categoryResults.find((result) => result.title === row.title)

    return {
      ...row,
      categories: matchingCategoryResult?.categories.join('; ') ?? '',
    }
  })

  await exportCsv(rowsWithCategories)

  return rowsWithCategories
}

main()
  .then(() => {
    console.log('Export research script finished.')
    process.exit(0)
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
