import { TranslateClient, TranslateTextCommand } from '@aws-sdk/client-translate'

const client = new TranslateClient({
  region: 'ap-southeast-2', // use your AWS region (e.g. Sydney)
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

export async function translateText(text: string) {
  const command = new TranslateTextCommand({
    Text: text,
    SourceLanguageCode: 'en',
    TargetLanguageCode: 'zh', // Chinese
  })

  const result = await client.send(command)
  return result.TranslatedText
}
