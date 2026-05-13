import { TranslateClient, TranslateTextCommand } from '@aws-sdk/client-translate'

export async function translateText(text: string) {
  const accessKeyId = process.env.AWS_ACCESS_KEY?.trim()
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY?.trim()
  const region = process.env.AWS_REGION || 'ap-southeast-2'

  if (!accessKeyId || !secretAccessKey) {
    throw new Error(
      'Missing AWS credentials. Check AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in .env.local',
    )
  }

  const client = new TranslateClient({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  })

  const command = new TranslateTextCommand({
    Text: text,
    SourceLanguageCode: 'en',
    TargetLanguageCode: 'zh',
  })

  const result = await client.send(command)

  return result.TranslatedText
}
