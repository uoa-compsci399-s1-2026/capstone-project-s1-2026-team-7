import 'dotenv/config'
import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import { getResearchExportCsv } from '@/features/research/orcid/exportResearchCsv'

async function main() {
  const { csv, rows } = await getResearchExportCsv()
  const outputPath = path.join(process.cwd(), 'research.csv')

  await writeFile(outputPath, csv, 'utf8')

  console.log(`Exported ${rows.length} research records to ${outputPath}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
