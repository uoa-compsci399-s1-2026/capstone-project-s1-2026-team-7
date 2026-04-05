import { loader } from '../src/lib/loader/loader'

async function main() {
  await loader()
}

main().catch((err) => {
  console.error('Error running loader:', err)
  process.exit(1)
})
