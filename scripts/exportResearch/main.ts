import 'dotenv/config'
import { exportCsv } from './output'
import { getResearchExportRows } from './run'

async function main() {
  const rows = await getResearchExportRows()

  await exportCsv(rows)

  return rows
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
