'use client'

import { useState } from 'react'
import { useDocumentInfo, useField, useLocale } from '@payloadcms/ui'

const SOURCE_LOCALE = 'en'
const TARGET_LOCALE = 'zh'

type UnknownRecord = Record<string, unknown>

type TranslationResponse = {
  translatedText?: string
  translation?: string
  text?: string
  result?: string
}

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === 'object' && value !== null
}

function getByPath(data: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((current, key) => {
    if (!isRecord(current)) {
      return undefined
    }

    return current[key]
  }, data)
}

export function TranslateFromEnglishButton({
  path,
  readOnly,
}: {
  path: string
  readOnly?: boolean
}) {
  const locale = useLocale()
  const documentInfo = useDocumentInfo()
  const { setValue } = useField<string>({ path })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  if (locale?.code !== TARGET_LOCALE || readOnly) {
    return null
  }

  async function handleTranslate() {
    setLoading(true)
    setMessage(null)

    try {
      const globalSlug = documentInfo.globalSlug
      const collectionSlug = documentInfo.collectionSlug
      const id = documentInfo.id

      let englishURL: string

      if (globalSlug) {
        englishURL = `/api/globals/${globalSlug}?locale=${SOURCE_LOCALE}&fallback-locale=none`
      } else if (collectionSlug && id) {
        englishURL = `/api/${collectionSlug}/${id}?locale=${SOURCE_LOCALE}&fallback-locale=none`
      } else {
        throw new Error('Could not identify this document/global.')
      }

      const englishResponse = await fetch(englishURL, {
        credentials: 'include',
      })

      if (!englishResponse.ok) {
        throw new Error(`Could not load English value. URL failed: ${englishURL}`)
      }

      const englishDoc: unknown = await englishResponse.json()
      const englishValue = getByPath(englishDoc, path)

      if (typeof englishValue !== 'string' || !englishValue.trim()) {
        throw new Error('No English text found for this field. Save the English locale first.')
      }

      const translateResponse = await fetch('/api/translate', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: englishValue,
          sourceLanguageCode: SOURCE_LOCALE,
          targetLanguageCode: TARGET_LOCALE,
        }),
      })

      if (!translateResponse.ok) {
        throw new Error('Translation request failed.')
      }

      const result = (await translateResponse.json()) as TranslationResponse

      const translatedText =
        result.translatedText ?? result.translation ?? result.text ?? result.result

      if (!translatedText) {
        throw new Error('Translation endpoint did not return translated text.')
      }

      setValue(translatedText)
      setMessage('Translated from English. Remember to save.')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Translation failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ marginTop: '0.5rem' }}>
      <button type="button" onClick={handleTranslate} disabled={loading}>
        {loading ? 'Translating...' : 'Translate from English'}
      </button>

      {message && <p style={{ marginTop: '0.35rem', fontSize: '0.85rem' }}>{message}</p>}
    </div>
  )
}

export default TranslateFromEnglishButton
