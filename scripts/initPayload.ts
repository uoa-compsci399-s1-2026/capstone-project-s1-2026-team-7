import path from 'node:path'
import dotenv from 'dotenv'
import { getPayload } from 'payload'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })
dotenv.config({ path: path.resolve(process.cwd(), '.env.local'), override: true })

async function main() {
  const { default: config } = await import('../src/payload.config')

  await getPayload({ config })

  console.log('Payload initialized successfully')
  process.exit(0)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
