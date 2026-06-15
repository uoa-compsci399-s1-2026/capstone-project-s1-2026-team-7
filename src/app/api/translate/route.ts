import { NextResponse } from 'next/server'
import { TranslateClient, TranslateTextCommand } from '@aws-sdk/client-translate'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const text = body.text

    if (typeof text !== 'string' || text.trim().length === 0) {
      return NextResponse.json({ error: 'Missing text to translate' }, { status: 400 })
    }

    const client = new TranslateClient({
      region: process.env.AWS_REGION || 'ap-southeast-2',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!.trim(),
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!.trim(),
      },
    })

    const command = new TranslateTextCommand({
      Text: text,
      SourceLanguageCode: body.sourceLanguageCode || 'en',
      TargetLanguageCode: body.targetLanguageCode || 'zh',
    })

    const result = await client.send(command)

    return NextResponse.json({
      translatedText: result.TranslatedText || '',
    })
  } catch (error) {
    console.error('Translate API error:', error)

    return NextResponse.json({ error: 'Translation failed' }, { status: 500 })
  }
}
