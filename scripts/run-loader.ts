import { seedResearch } from '../src/lib/loader/seedResearch'

async function main() {
  await seedResearch()
}

main().catch((err) => {
  console.error('Error running loader:', err)
  process.exit(1)
})
