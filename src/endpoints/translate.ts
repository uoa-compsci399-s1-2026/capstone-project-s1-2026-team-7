import type { Endpoint } from 'payload'
import { translateText } from '../lib/translate'

export const translateEndpoint: Endpoint = {
  path: '/translate',
  method: 'post',

  handler: async (req) => {
    const body = await req.json?.()

    if (!body || typeof body !== 'object') {
      return Response.json({ error: 'Invalid body' }, { status: 400 })
    }

    const { text } = body as { text?: string }

    if (!text || typeof text !== 'string') {
      return Response.json({ error: 'Missing or invalid text' }, { status: 400 })
    }

    const translatedText = await translateText(text)

    if (!translatedText) {
      return Response.json({ error: 'Translation returned empty text' }, { status: 500 })
    }

    return Response.json({
      translatedText,
    })
  },
}
