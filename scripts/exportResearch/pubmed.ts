import type { CsvResearchRow } from './types'

type PubMedSearchResponse = {
  esearchresult?: {
    idlist?: string[]
  }
}

type PubMedKeywordProgressEvent = {
  current: number
  total: number
}

type PubMedKeywordProgressOptions = {
  onProgress?: (event: PubMedKeywordProgressEvent) => void
  signal?: AbortSignal
}

const NCBI_TOOL = 'hnu-research-export'
export const PUBMED_KEYWORD_DELIMITER = '; '
const pubMedKeywordCache = new Map<string, string[]>()

let hasWarnedMissingEmail = false

function throwIfAborted(signal?: AbortSignal): void {
  if (!signal?.aborted) return

  const error = new Error('Export cancelled.')
  error.name = 'AbortError'
  throw error
}

function sleep(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      const error = new Error('Export cancelled.')
      error.name = 'AbortError'
      reject(error)
      return
    }

    const timeout = setTimeout(() => {
      signal?.removeEventListener('abort', onAbort)
      resolve()
    }, ms)

    const onAbort = () => {
      clearTimeout(timeout)
      const error = new Error('Export cancelled.')
      error.name = 'AbortError'
      reject(error)
    }

    signal?.addEventListener('abort', onAbort, { once: true })
  })
}

function getNcbiDelayMs(): number {
  return process.env.NCBI_API_KEY ? 120 : 350
}

function normalizeDoi(doi: string | null | undefined): string | null {
  if (!doi) return null

  return doi
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\/(dx\.)?doi\.org\//, '')
    .replace(/^doi:/, '')
}

function extractPmidFromUrl(url: string | null | undefined): string | null {
  if (!url) return null

  const normalizedUrl = url.trim()

  const pubmedMatch = normalizedUrl.match(/pubmed\.ncbi\.nlm\.nih\.gov\/(\d+)/i)
  if (pubmedMatch?.[1]) return pubmedMatch[1]

  const oldPubmedMatch = normalizedUrl.match(/[?&]term=(\d+)/i)
  if (oldPubmedMatch?.[1]) return oldPubmedMatch[1]

  return null
}

function addNcbiParams(url: URL): URL {
  url.searchParams.set('tool', NCBI_TOOL)

  const email = process.env.NCBI_EMAIL?.trim()

  if (email) {
    url.searchParams.set('email', email)
  } else if (!hasWarnedMissingEmail) {
    console.warn(
      'NCBI_EMAIL is not set. PubMed calls will still run, but NCBI recommends adding it.',
    )
    hasWarnedMissingEmail = true
  }

  const apiKey = process.env.NCBI_API_KEY?.trim()

  if (apiKey) {
    url.searchParams.set('api_key', apiKey)
  }

  return url
}

async function fetchNcbi(url: URL, signal?: AbortSignal): Promise<Response> {
  const maxAttempts = 4

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    throwIfAborted(signal)

    const response = await fetch(url, {
      headers: {
        Accept: 'application/json, application/xml, text/xml',
      },
      signal,
    })

    await sleep(getNcbiDelayMs(), signal)

    if (response.ok) {
      return response
    }

    if (response.status === 429 || response.status >= 500) {
      const retryAfter = response.headers.get('retry-after')
      const retryAfterMs = retryAfter ? Number(retryAfter) * 1000 : attempt * 1500

      console.warn(
        `NCBI request failed with ${response.status}. Waiting ${
          retryAfterMs / 1000
        }s before retry ${attempt}/${maxAttempts}.`,
      )

      await sleep(retryAfterMs, signal)
      continue
    }

    throw new Error(`NCBI request failed with ${response.status}: ${url.toString()}`)
  }

  throw new Error(`NCBI request failed after ${maxAttempts} attempts: ${url.toString()}`)
}

async function fetchPubMedIdByDoi(doi: string, signal?: AbortSignal): Promise<string | null> {
  const normalizedDoi = normalizeDoi(doi)

  if (!normalizedDoi) {
    return null
  }

  const url = addNcbiParams(new URL('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi'))

  url.searchParams.set('db', 'pubmed')
  url.searchParams.set('retmode', 'json')
  url.searchParams.set('retmax', '1')
  url.searchParams.set('term', `"${normalizedDoi}"[DOI]`)

  const response = await fetchNcbi(url, signal)
  const data = (await response.json()) as PubMedSearchResponse

  return data.esearchresult?.idlist?.[0] ?? null
}

function decodeXmlEntities(value: string): string {
  return value.replace(/&(#x?[0-9a-fA-F]+|amp|lt|gt|quot|apos);/g, (match, entity: string) => {
    if (entity === 'amp') return '&'
    if (entity === 'lt') return '<'
    if (entity === 'gt') return '>'
    if (entity === 'quot') return '"'
    if (entity === 'apos') return "'"

    if (entity.startsWith('#x')) {
      return String.fromCodePoint(Number.parseInt(entity.slice(2), 16))
    }

    if (entity.startsWith('#')) {
      return String.fromCodePoint(Number.parseInt(entity.slice(1), 10))
    }

    return match
  })
}

function cleanKeyword(value: string): string {
  return decodeXmlEntities(value)
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function uniqueValues(values: string[]): string[] {
  const seen = new Set<string>()
  const unique: string[] = []

  for (const value of values) {
    const key = value.toLowerCase()

    if (!key || seen.has(key)) continue

    seen.add(key)
    unique.push(value)
  }

  return unique
}

function extractKeywordsFromPubMedXml(xml: string): string[] {
  const keywords = Array.from(xml.matchAll(/<Keyword\b[^>]*>([\s\S]*?)<\/Keyword>/gi))
    .map((match) => cleanKeyword(match[1]))
    .filter(Boolean)

  return uniqueValues(keywords)
}

async function fetchPubMedKeywordsByPmid(pmid: string, signal?: AbortSignal): Promise<string[]> {
  const url = addNcbiParams(new URL('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi'))

  url.searchParams.set('db', 'pubmed')
  url.searchParams.set('id', pmid)
  url.searchParams.set('retmode', 'xml')

  const response = await fetchNcbi(url, signal)
  const xml = await response.text()

  return extractKeywordsFromPubMedXml(xml)
}

async function fetchPubMedKeywordsForRow(
  row: Pick<CsvResearchRow, 'doi' | 'url' | 'title'>,
  signal?: AbortSignal,
): Promise<string[]> {
  const normalizedDoi = normalizeDoi(row.doi)
  const pmidFromUrl = extractPmidFromUrl(row.url)
  const cacheKey = normalizedDoi
    ? `doi:${normalizedDoi}`
    : pmidFromUrl
      ? `pmid:${pmidFromUrl}`
      : null

  if (!cacheKey) {
    return []
  }

  if (pubMedKeywordCache.has(cacheKey)) {
    return pubMedKeywordCache.get(cacheKey) ?? []
  }

  try {
    const pmid =
      pmidFromUrl ?? (normalizedDoi ? await fetchPubMedIdByDoi(normalizedDoi, signal) : null)

    if (!pmid) {
      pubMedKeywordCache.set(cacheKey, [])
      return []
    }

    const keywords = await fetchPubMedKeywordsByPmid(pmid, signal)

    pubMedKeywordCache.set(cacheKey, keywords)

    return keywords
  } catch (error) {
    console.warn(
      `Could not fetch PubMed keywords for "${row.title}"${normalizedDoi ? ` (${normalizedDoi})` : ''}.`,
      error,
    )

    pubMedKeywordCache.set(cacheKey, [])

    return []
  }
}

export async function addPubMedKeywordsToRows(
  rows: CsvResearchRow[],
  options?: PubMedKeywordProgressOptions,
): Promise<CsvResearchRow[]> {
  const rowsWithKeywords: CsvResearchRow[] = []

  for (const [index, row] of rows.entries()) {
    throwIfAborted(options?.signal)

    const keywords = await fetchPubMedKeywordsForRow(row, options?.signal)

    rowsWithKeywords.push({
      ...row,
      keywords: keywords.join(PUBMED_KEYWORD_DELIMITER),
      categories: row.categories ?? '',
    })

    options?.onProgress?.({
      current: index + 1,
      total: rows.length,
    })
  }

  return rowsWithKeywords
}
