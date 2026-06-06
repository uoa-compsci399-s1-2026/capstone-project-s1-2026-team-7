import 'dotenv/config'
import { getPayloadClient } from '@/lib/payload'
import { fetchPubMedEnrichment } from '@/features/research/pubmed'

async function main() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({ collection: 'research', limit: 0, depth: 0 })

  console.log(`Scanning ${docs.length} publications...`)
  let enriched = 0
  let skipped = 0
  let noMatch = 0

  for (const doc of docs) {
    const hasText = typeof doc.searchText === 'string' && doc.searchText.length > 0
    if (!doc.doi || hasText) {
      skipped++
      continue
    }

    const searchText = await fetchPubMedEnrichment(doc.doi)
    if (!searchText) {
      noMatch++
      console.log(`  no PubMed match: ${doc.title}`)
      continue
    }

    await payload.update({
      collection: 'research',
      id: doc.id,
      data: { searchText },
      overrideAccess: true,
    })

    enriched++
    console.log(`(${enriched}) enriched: ${doc.title}`)
    await new Promise((resolve) => setTimeout(resolve, 150)) // be polite to NCBI
  }

  console.log(
    `\nDone. Enriched ${enriched}, skipped ${skipped} (already done / no DOI), no PubMed match ${noMatch}.`,
  )
  process.exit(0)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
