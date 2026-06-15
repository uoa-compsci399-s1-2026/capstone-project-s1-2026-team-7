import type {
  ArticleOutput,
  NameWithOrcid,
  OrcidWorksResponse,
  OrcidWorkSummary,
  PerPersonOutputType,
} from './types'
import { fetchCrossrefPublicationDate } from './fetchCrossrefPublicationDate'
import { getDatePrecisionScore, normalizeDoi, sleep, throwIfAborted } from './utils'

type GetDataOptions = {
  signal?: AbortSignal
  onPersonComplete?: (event: {
    index: number
    total: number
    person: NameWithOrcid
    articles: ArticleOutput[]
  }) => void
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

export async function getData(
  people: NameWithOrcid[],
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
