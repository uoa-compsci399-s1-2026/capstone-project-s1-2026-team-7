import { config as loadEnv } from 'dotenv'
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

  return staff.filter(hasOrcid).map((s) => ({
    name: [s.firstname, s.lastname].filter(Boolean).join(' ').trim(),
    orcid: s.orcid.trim(),
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

  const doi = doiEntry?.['external-id-normalized']?.value ?? doiEntry?.['external-id-value'] ?? null

  return normalizeDoi(doi)
}

function getArticleOutput(data: OrcidWorksResponse): ArticleOutput[] {
  const works = data.group.flatMap((group) => group['work-summary'])

  return works.map((work) => {
    const title = work.title.title.value
    const doi = getDoiFromWork(work)
    const url = work.url?.value ?? null

    const year = work['publication-date']?.year?.value
    const month = work['publication-date']?.month?.value
    const day = work['publication-date']?.day?.value

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
  const articleMap = new Map<string, SharedArticleInternal>()

  for (const person of data) {
    for (const article of person.articles) {
      const key = articleKey(article)
      const existing = articleMap.get(key)

      if (existing) {
        existing.people.add(person.name)
      } else {
        articleMap.set(key, {
          article,
          people: new Set([person.name]),
        })
      }
    }
  }

  return Array.from(articleMap.values()).map((entry) => ({
    article: entry.article,
    people: Array.from(entry.people),
  }))
}
/*
async function uploadToDatabase(data: ArticleOutput): Promise<void> {
  await uploadResearch({
    title: data.title,
    doi: data.doi || '',
    url: data.url || '',
    publicationDate: data.publicationDate || '',
  })
}
*/

async function uploadToDatabase(data: ArticleOutput): Promise<void> {
  if (!data.url) {
    console.log(`Skipping article with no URL: ${data.title}`)
    return
  }

  if (!data.doi) {
    console.log(`Skipping article with no DOI: ${data.title}`)
    return
  }

  await uploadResearch({
    title: data.title,
    doi: data.doi,
    url: data.url,
    publicationDate: data.publicationDate ?? '',
  })
}

async function main() {
  const nameidpair: nameWithORcid[] = await getOrcidList()

  const data: PerPersonOutputType[] = await Promise.all(
    nameidpair.map(async (pair) => {
      const articles = await fetchResearchOrcid(pair.orcid)

      return {
        name: pair.name,
        articles,
      }
    }),
  )

  const cleaned: SharedArticle[] = compareEntries(data)
  await Promise.all(cleaned.map((data) => uploadToDatabase(data.article)))
  console.log(cleaned)
  return cleaned
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
