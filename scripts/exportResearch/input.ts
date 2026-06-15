import {
  OrcidWorksResponse,
  OrcidWorkSummary,
  nameWithORcid,
  ArticleOutput,
  PerPersonOutputType,
  SharedArticle,
} from './types'
import type { StaffDTO } from '@/features/our-team/staff.schema'

type GetDataOptions = {
  signal?: AbortSignal
  onPersonComplete?: (event: {
    index: number
    total: number
    person: nameWithORcid
    articles: ArticleOutput[]
  }) => void
}

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

function hasOrcid(staff: StaffDTO): staff is StaffDTO & { orcid: string } {
  return typeof staff.orcid === 'string' && staff.orcid.trim().length > 0
}

export function getOrcidList(staff: StaffDTO[]): nameWithORcid[] {
  return staff.filter(hasOrcid).map((s) => ({
    name: `${s.firstname} ${s.lastname}`.trim(),
    orcid: s.orcid.trim(),
    staffId: s.id,
  }))
}

function throwIfAborted(signal?: AbortSignal): void {
  if (!signal?.aborted) return

  const error = new Error('Export cancelled.')
  error.name = 'AbortError'
  throw error
}

export async function fetchResearchOrcid(
  orcid: string,
  options?: { signal?: AbortSignal },
): Promise<ArticleOutput[]> {
  throwIfAborted(options?.signal)

  const response: Response = await fetch(`https://pub.orcid.org/v3.0/${orcid}/works`, {
    headers: {
      Accept: 'application/vnd.orcid+json',
    },
    signal: options?.signal,
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch ORCID works for ${orcid}: ${response.status}`)
  }

  const data = (await response.json()) as OrcidWorksResponse

  return getArticleOutput(data, options?.signal)
}

function normalizeDoi(doi: string | null | undefined): string | null {
  if (!doi) return null

  return doi
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\/(dx\.)?doi\.org\//, '')
    .replace(/^doi:/, '')
}

function getDoiFromWork(work: OrcidWorkSummary): string | null {
  const externalIds = work['external-ids']?.['external-id'] ?? []

  const doiEntry = externalIds.find((id) => id['external-id-type']?.toLowerCase() === 'doi')

  return normalizeDoi(
    doiEntry?.['external-id-normalized']?.value ?? doiEntry?.['external-id-value'],
  )
}

function getOrcidPublicationDate(work: OrcidWorkSummary): string | null {
  const publicationDateData = work['publication-date']

  const year = publicationDateData?.year?.value
  const month = publicationDateData?.month?.value
  const day = publicationDateData?.day?.value

  return year ? [year, month, day].filter(Boolean).join('-') : null
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

function getDatePrecisionScore(date: string | null): number {
  if (!date) return 0

  const parts = date.split('-')

  if (parts.length === 3) return 3
  if (parts.length === 2) return 2
  if (parts.length === 1) return 1

  return 0
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

async function fetchCrossrefPublicationDate(
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

async function getArticleOutput(
  data: OrcidWorksResponse,
  signal?: AbortSignal,
): Promise<ArticleOutput[]> {
  const works = data.group.flatMap((group) => group['work-summary'])
  const articles: ArticleOutput[] = []

  for (const work of works) {
    throwIfAborted(signal)

    const title = work.title.title.value
    const doi = getDoiFromWork(work)
    const url = work.url?.value ?? null

    const orcidPublicationDate = getOrcidPublicationDate(work)
    const needsCrossrefDate =
      !orcidPublicationDate || getDatePrecisionScore(orcidPublicationDate) < 3

    let crossrefPublicationDate: string | null = null

    if (doi && needsCrossrefDate) {
      crossrefPublicationDate = await fetchCrossrefPublicationDate(doi, signal)

      await sleep(50, signal)
    }

    articles.push({
      title,
      doi,
      url,
      publicationDate: crossrefPublicationDate ?? orcidPublicationDate,
    })
  }

  return articles
}

function articleKey(article: ArticleOutput): string {
  if (article.doi) {
    return `doi:${article.doi}`
  }

  return `fallback:${article.title.toLowerCase().trim()}|${article.url ?? ''}|${
    article.publicationDate ?? ''
  }`
}

export function compareEntries(data: PerPersonOutputType[]): SharedArticle[] {
  const articleMap = new Map<string, SharedArticle>()

  for (const person of data) {
    for (const article of person.articles) {
      const key = articleKey(article)
      const existing = articleMap.get(key)

      if (existing) {
        if (!existing.people.includes(person.name)) {
          existing.people.push(person.name)
        }

        if (!existing.staffIds.includes(person.staffId)) {
          existing.staffIds.push(person.staffId)
        }
      } else {
        articleMap.set(key, {
          article,
          people: [person.name],
          staffIds: [person.staffId],
        })
      }
    }
  }

  return Array.from(articleMap.values())
}

export async function getData(
  people: nameWithORcid[],
  options?: GetDataOptions,
): Promise<PerPersonOutputType[]> {
  let completed = 0

  return Promise.all(
    people.map(async (person) => {
      throwIfAborted(options?.signal)

      const articles = await fetchResearchOrcid(person.orcid, {
        signal: options?.signal,
      })

      completed += 1
      options?.onPersonComplete?.({
        index: completed,
        total: people.length,
        person,
        articles,
      })

      return {
        name: person.name,
        staffId: person.staffId,
        articles,
      }
    }),
  )
}
