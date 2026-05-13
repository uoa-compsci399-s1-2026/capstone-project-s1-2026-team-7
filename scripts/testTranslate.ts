import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })
dotenv.config()

import { translateText } from '../src/lib/translate'

async function main() {
  console.log('AWS_ACCESS_KEY_ID loaded:', Boolean(process.env.AWS_ACCESS_KEY))
  console.log('AWS_SECRET_ACCESS_KEY loaded:', Boolean(process.env.AWS_SECRET_ACCESS_KEY))
  console.log('AWS_REGION:', process.env.S3_REGION)

  const text = 'Hello, how are you?'
  const translated = await translateText(text)

  console.log('Original:', text)
  console.log('Translated:', translated)
}

main().catch((error) => {
  console.error('Translate test failed:')
  console.error(error)
  process.exit(1)
})
