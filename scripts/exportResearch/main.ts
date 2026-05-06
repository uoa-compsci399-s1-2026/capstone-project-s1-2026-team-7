import { StaffDTO } from '@/validation'
import { getOrcidList, fetchResearchOrcid, compareEntries, getData } from './input'
import { buildCsvRows, exportCsv } from './output'
import { nameWithORcid, PerPersonOutputType } from './types'
import { getStaff } from '@/queries/getStaff' // await getStaff() @ LINE 9
import dummydata from './dummydata' // dummydata@ line 9

async function main() {
  const staff: StaffDTO[] = dummydata
  const people: nameWithORcid[] = await getOrcidList(staff)

  const data: PerPersonOutputType[] = await getData(people)

  const cleanedResearch = compareEntries(data)
  const rows = buildCsvRows(cleanedResearch, people)

  await exportCsv(rows)

  return rows
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
