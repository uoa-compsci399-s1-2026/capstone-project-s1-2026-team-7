import 'dotenv/config'
import path from 'node:path'
import { uploadResearchCsv } from '@/features/research/uploadResearchCsv.query'

function getCsvPath(): string {
  const filePathArg = process.argv.find((arg) => arg.endsWith('.csv'))

  if (filePathArg) {
    return path.resolve(process.cwd(), filePathArg)
  }

  return path.resolve(process.cwd(), 'research.csv')
}

async function main(): Promise<void> {
  const csvPath = getCsvPath()
  const dryRun = process.argv.includes('--dry-run')

  console.log(`Reading CSV from: ${csvPath}`)

  const result = await uploadResearchCsv(csvPath, {
    dryRun,
  })

  console.log('CSV import complete:', result)
}

main()
  .then(() => {
    console.log('Import research script finished.')
    process.exit(0)
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
