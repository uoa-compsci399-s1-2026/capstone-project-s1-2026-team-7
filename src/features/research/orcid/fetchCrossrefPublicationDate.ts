import { getDatePrecisionScore, normalizeDoi, sleep, throwIfAborted } from './utils'

type CrossrefDate = {
  'date-parts'?: number[][]
}

type CrossrefWorkMessage = {
  published?: CrossrefDate
  'published-online'?: CrossrefDate
  'published-print'?: CrossrefDate
  issued?: CrossrefDate
}

type CrossrefWorkResponse = {
  status: string
  message: CrossrefWorkMessage
}

const crossrefDateCache = new Map<string, string | null>()

function formatDateParts(date: CrossrefDate | undefined): string | null {
  const dateParts = date?.['date-parts']?.[0]

  if (!dateParts || !dateParts[0]) {
    return null
  }

  const [year, month, day] = dateParts

  const formattedYear = String(year)
  const formattedMonth = month ? String(month).padStart(2, '0') : null
  const formattedDay = day ? String(day).padStart(2, '0') : null

  return [formattedYear, formattedMonth, formattedDay].filter(Boolean).join('-')
}

function getBestCrossrefDate(message: CrossrefWorkMessage): string | null {
  const dateCandidates = [
    formatDateParts(message.published),
    formatDateParts(message['published-online']),
    formatDateParts(message['published-print']),
    formatDateParts(message.issued),
  ].filter(Boolean) as string[]

  if (dateCandidates.length === 0) {
    return null
  }

  return dateCandidates.sort((a, b) => getDatePrecisionScore(b) - getDatePrecisionScore(a))[0]
}

export async function fetchCrossrefPublicationDate(
  doi: string,
  signal?: AbortSignal,
): Promise<string | null> {
  throwIfAborted(signal)

  const normalizedDoi = normalizeDoi(doi)

  if (!normalizedDoi) {
    return null
  }

  if (crossrefDateCache.has(normalizedDoi)) {
    return crossrefDateCache.get(normalizedDoi) ?? null
  }

  const mailto = process.env.CROSSREF_MAILTO
  const url = new URL(`https://api.crossref.org/works/${encodeURIComponent(normalizedDoi)}`)

  if (mailto) {
    url.searchParams.set('mailto', mailto)
  }

  const maxAttempts = 4

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
      },
      signal,
    })

    if (response.ok) {
      const data = (await response.json()) as CrossrefWorkResponse
      const publicationDate = getBestCrossrefDate(data.message)

      crossrefDateCache.set(normalizedDoi, publicationDate)

      return publicationDate
    }

    if (response.status === 429) {
      const retryAfter = response.headers.get('retry-after')
      const retryAfterMs = retryAfter ? Number(retryAfter) * 1000 : attempt * 3000

      console.warn(
        `Crossref rate limited DOI ${normalizedDoi}. Waiting ${
          retryAfterMs / 1000
        }s before retry ${attempt}/${maxAttempts}.`,
      )

      await sleep(retryAfterMs, signal)
      continue
    }

    console.warn(`Could not fetch Crossref date for DOI ${normalizedDoi}: ${response.status}`)

    crossrefDateCache.set(normalizedDoi, null)

    return null
  }

  console.warn(`Crossref failed after ${maxAttempts} attempts for DOI ${normalizedDoi}`)

  crossrefDateCache.set(normalizedDoi, null)

  return null
}
