'use client'

import React, { useState } from 'react'
import { useAllFormFields, useDocumentInfo, useField, useLocale } from '@payloadcms/ui'

const SOURCE_LOCALE = 'en'
const TARGET_LOCALE = 'zh'

type UnknownRecord = Record<string, unknown>

type TranslateFromEnglishButtonProps = {
  path: string
  readOnly?: boolean
}

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function cloneDeep<T>(value: T): T {
  if (typeof structuredClone === 'function') {
    return structuredClone(value)
  }

  return JSON.parse(JSON.stringify(value)) as T
}

function normalizePath(path: string): string {
  return path.replace(/\[(\d+)\]/g, '.$1')
}

function getValueAtPath(source: unknown, path: string): unknown {
  const parts = normalizePath(path).split('.').filter(Boolean)

  let current: unknown = source

  for (const part of parts) {
    if (Array.isArray(current)) {
      const index = Number(part)
      current = current[index]
      continue
    }

    if (!isRecord(current)) {
      return undefined
    }

    current = current[part]
  }

  return current
}

function getPathCandidates(path: string): string[] {
  const normalized = normalizePath(path)
  const parts = normalized.split('.').filter(Boolean)
  const candidates = new Set<string>()

  candidates.add(normalized)

  if (normalized.startsWith('data.')) {
    candidates.add(normalized.slice(5))
  }

  if (normalized.startsWith('doc.')) {
    candidates.add(normalized.slice(4))
  }

  // Try suffix paths, useful when Payload admin path is deeper than REST response path
  for (let i = 1; i < parts.length; i += 1) {
    candidates.add(parts.slice(i).join('.'))
  }

  if (parts.length > 0) {
    candidates.add(parts[parts.length - 1])
  }

  return [...candidates]
}

function isLexicalRichText(value: unknown): value is UnknownRecord {
  return (
    isRecord(value) && isRecord(value.root) && Array.isArray((value.root as UnknownRecord).children)
  )
}

function collectTextNodes(value: unknown): UnknownRecord[] {
  const textNodes: UnknownRecord[] = []
  const seen = new WeakSet<object>()

  function walk(node: unknown) {
    if (Array.isArray(node)) {
      node.forEach(walk)
      return
    }

    if (!isRecord(node)) {
      return
    }

    if (seen.has(node)) {
      return
    }

    seen.add(node)

    if (typeof node.text === 'string') {
      textNodes.push(node)
    }

    if (isRecord(node.root)) {
      walk(node.root)
    }

    if (Array.isArray(node.children)) {
      walk(node.children)
    }
  }

  walk(value)

  return textNodes
}

function unwrapLocaleValue(value: unknown): unknown {
  // Useful if Payload ever returns { en: ..., zh: ... }
  if (isRecord(value) && SOURCE_LOCALE in value) {
    const maybeEnglishValue = value[SOURCE_LOCALE]

    if (typeof maybeEnglishValue === 'string' || isLexicalRichText(maybeEnglishValue)) {
      return maybeEnglishValue
    }
  }

  return value
}

function hasTranslatableContent(value: unknown): boolean {
  const unwrapped = unwrapLocaleValue(value)

  if (typeof unwrapped === 'string') {
    return unwrapped.trim().length > 0
  }

  if (isLexicalRichText(unwrapped)) {
    return collectTextNodes(unwrapped).some((node) => {
      return typeof node.text === 'string' && node.text.trim().length > 0
    })
  }

  return false
}

function findFirstTranslatableValueByKey(source: unknown, targetKey: string): unknown {
  const seen = new WeakSet<object>()

  function walk(node: unknown): unknown {
    if (Array.isArray(node)) {
      for (const item of node) {
        const found = walk(item)
        if (found !== undefined) {
          return found
        }
      }

      return undefined
    }

    if (!isRecord(node)) {
      return undefined
    }

    if (seen.has(node)) {
      return undefined
    }

    seen.add(node)

    if (targetKey in node) {
      const possibleValue = unwrapLocaleValue(node[targetKey])

      if (hasTranslatableContent(possibleValue)) {
        return possibleValue
      }
    }

    for (const value of Object.values(node)) {
      const found = walk(value)
      if (found !== undefined) {
        return found
      }
    }

    return undefined
  }

  return walk(source)
}

function getEnglishValue(
  englishDoc: unknown,
  path: string,
): {
  value: unknown
  matchedBy: string
  candidates: string[]
} {
  const candidates = getPathCandidates(path)

  for (const candidate of candidates) {
    const value = unwrapLocaleValue(getValueAtPath(englishDoc, candidate))

    if (hasTranslatableContent(value)) {
      return {
        value,
        matchedBy: candidate,
        candidates,
      }
    }
  }

  const finalKey = normalizePath(path).split('.').filter(Boolean).at(-1)

  if (finalKey) {
    const fallbackValue = findFirstTranslatableValueByKey(englishDoc, finalKey)

    if (hasTranslatableContent(fallbackValue)) {
      return {
        value: fallbackValue,
        matchedBy: `recursive key fallback: ${finalKey}`,
        candidates,
      }
    }
  }

  return {
    value: undefined,
    matchedBy: 'not found',
    candidates,
  }
}

async function translatePlainText(text: string): Promise<string> {
  const response = await fetch('/api/translate', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text,
      sourceLanguageCode: SOURCE_LOCALE,
      targetLanguageCode: TARGET_LOCALE,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(errorText || 'Translation request failed')
  }

  const data = await response.json()

  const translated = data.translatedText ?? data.translation ?? data.text ?? data.result

  if (typeof translated !== 'string') {
    throw new Error('Translation API did not return translated text')
  }

  return translated
}

async function translateRichText(value: UnknownRecord): Promise<UnknownRecord> {
  const clonedRichText = cloneDeep(value)
  const textNodes = collectTextNodes(clonedRichText)

  const nonEmptyTextNodes = textNodes.filter((node) => {
    return typeof node.text === 'string' && node.text.trim().length > 0
  })

  if (nonEmptyTextNodes.length === 0) {
    throw new Error('No English text nodes found inside the rich text field')
  }

  const cache = new Map<string, string>()

  for (const node of nonEmptyTextNodes) {
    const originalText = node.text as string

    if (!cache.has(originalText)) {
      const translatedText = await translatePlainText(originalText)
      cache.set(originalText, translatedText)
    }

    node.text = cache.get(originalText)
  }

  return clonedRichText
}

export function TranslateFromEnglishButton({ path, readOnly }: TranslateFromEnglishButtonProps) {
  const locale = useLocale()
  const documentInfo = useDocumentInfo()
  const { setValue } = useField<unknown>({ path })
  const [, dispatchFields] = useAllFormFields()

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  if (locale?.code !== TARGET_LOCALE || readOnly) {
    return null
  }

  async function handleTranslate() {
    setLoading(true)
    setMessage(null)

    try {
      const id = documentInfo?.id
      const collectionSlug = documentInfo?.collectionSlug
      const globalSlug = documentInfo?.globalSlug

      let englishURL: string | null = null

      if (globalSlug) {
        englishURL = `/api/globals/${globalSlug}?locale=${SOURCE_LOCALE}&fallback-locale=none&depth=0`
      } else if (collectionSlug && id) {
        englishURL = `/api/${collectionSlug}/${id}?locale=${SOURCE_LOCALE}&fallback-locale=none&depth=0`
      }

      if (!englishURL) {
        throw new Error('Could not build English document URL')
      }

      const englishResponse = await fetch(englishURL, {
        method: 'GET',
        credentials: 'include',
      })

      if (!englishResponse.ok) {
        const errorText = await englishResponse.text()
        throw new Error(errorText || 'Could not fetch English document')
      }

      const englishDoc: unknown = await englishResponse.json()
      const { value: englishValue, matchedBy, candidates } = getEnglishValue(englishDoc, path)

      console.log('Translate field path:', path)
      console.log('English URL:', englishURL)
      console.log('English document:', englishDoc)
      console.log('Path candidates:', candidates)
      console.log('Matched by:', matchedBy)
      console.log('English value found:', englishValue)

      if (typeof englishValue === 'string') {
        const translatedText = await translatePlainText(englishValue)

        setValue(translatedText)

        setMessage('Translated text from English. Remember to save.')
        return
      }

      if (isLexicalRichText(englishValue)) {
        const translatedRichText = await translateRichText(englishValue)

        // setValue updates form data.
        setValue(translatedRichText)

        // Lexical needs value + initialValue to visually refresh in Payload admin.
        dispatchFields({
          type: 'UPDATE',
          path,
          value: translatedRichText,
          initialValue: translatedRichText,
        })

        setMessage('Translated rich text from English. Remember to save.')
        return
      }

      throw new Error(
        'No English rich text found for this field. Check the console logs for the real English document shape and path.',
      )
    } catch (error) {
      console.error(error)

      setMessage(error instanceof Error ? error.message : 'Something went wrong while translating')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ marginTop: '0.5rem' }}>
      <button type="button" onClick={handleTranslate} disabled={loading}>
        {loading ? 'Translating...' : 'Translate from English'}
      </button>

      {message ? <p style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>{message}</p> : null}
    </div>
  )
}

export default TranslateFromEnglishButton
