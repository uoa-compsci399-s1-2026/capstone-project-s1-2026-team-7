import { TranslateClient, TranslateTextCommand } from '@aws-sdk/client-translate'

type TranslateTextOptions = {
  sourceLanguageCode?: string
  targetLanguageCode?: string
}

export async function translateText(text: string, options: TranslateTextOptions = {}) {
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID?.trim()
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY?.trim()
  const region = process.env.AWS_REGION || 'ap-southeast-2'

  if (!accessKeyId || !secretAccessKey) {
    throw new Error(
      'Missing AWS credentials. Check AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in .env',
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
    SourceLanguageCode: options.sourceLanguageCode ?? 'en',
    TargetLanguageCode: options.targetLanguageCode ?? 'zh',
  })

  const result = await client.send(command)

  return result.TranslatedText ?? ''
}
