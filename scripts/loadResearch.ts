/*import { config as loadEnv } from 'dotenv'
import {
  OrcidWorksResponse,
  OrcidWorkSummary,
  nameWithORcid,
  ArticleOutput,
  PerPersonOutputType,
  SharedArticle,
  SharedArticleInternal,
} from './loadertypes'
import { uploadResearch } from '@/queries/uploadResearch'
import { getStaff } from '@/queries/getStaff'
import { StaffDTO } from '@/validation'

loadEnv()

function hasOrcid(staff: StaffDTO): staff is StaffDTO & { orcid: string } {
  return typeof staff.orcid === 'string' && staff.orcid.trim().length > 0
}

async function getOrcidList(): Promise<nameWithORcid[]> {
  const staff: StaffDTO[] = await getStaff()
  return staff
    .filter((s) => s.orcid)
    .map((s) => ({
      name: `${s.firstname} ${s.lastname}`.trim(),
      orcid: s.orcid,
      staffId: s.id,
    }))
}

async function fetchResearchOrcid(orcid: string): Promise<ArticleOutput[]> {
  const response = await fetch(`https://pub.orcid.org/v3.0/${orcid}/works`, {
    headers: {
      Accept: 'application/vnd.orcid+json',
    },
    next: {
      revalidate: 60 * 60 * 24,
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch ORCID works for ${orcid}: ${response.status}`)
  }

  const data = (await response.json()) as OrcidWorksResponse

  return getArticleOutput(data)
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

function getArticleOutput(data: OrcidWorksResponse): ArticleOutput[] {
  const works = data.group.flatMap((group) => group['work-summary'])

  return works.map((work) => {
    const title = work.title.title.value
    const doi = getDoiFromWork(work)
    const url = work.url?.value ?? null

    const publicationDateData = work['publication-date']

    const year = publicationDateData?.year?.value
    const month = publicationDateData?.month?.value
    const day = publicationDateData?.day?.value

    const publicationDate = year ? [year, month, day].filter(Boolean).join('-') : null

    return {
      title,
      doi,
      url,
      publicationDate,
    }
  })
}

function articleKey(article: ArticleOutput): string {
  if (article.doi) {
    return `doi:${article.doi}`
  }

  return `fallback:${article.title.toLowerCase().trim()}|${article.url ?? ''}|${
    article.publicationDate ?? ''
  }`
}

function compareEntries(data: PerPersonOutputType[]): SharedArticle[] {
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

async function main() {
  const nameidpair: nameWithORcid[] = await getOrcidList()

  const data: PerPersonOutputType[] = await Promise.all(
    nameidpair.map(async (pair) => {
      const articles = await fetchResearchOrcid(pair.orcid)

      return {
        name: pair.name,
        staffId: pair.staffId,
        articles,
      }
    }),
  )

  const cleaned: SharedArticle[] = compareEntries(data)

  for (const item of cleaned) {
    await uploadResearch({
      title: item.article.title,
      doi: item.article.doi ?? '',
      link: item.article.url ?? '',
      date: item.article.publicationDate ?? '',
      staffID: item.staffIds,
      categories: ["other","health"]
    })
  }

  console.log(cleaned)
  return cleaned
}

main()
*/
