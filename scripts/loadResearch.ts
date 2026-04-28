import { config as loadEnv } from 'dotenv'

loadEnv()

import { OrcidWorkGroup, OrcidWorksResponse } from './loadertypes'

import { uploadResearch, UploadResearchDTO } from '@/queries/uploadResearch'

type nameWithORcid = {
  name: string
  orcid: string
}

type ArticleOutput = {
  title: string
  url: string | null
  publicationDate: string | null
}

type PerPersonOutputType = { name: string; articles: ArticleOutput[] }

function getOrcidList() {
  const list: nameWithORcid[] = [{ name: 'Miles-Chan', orcid: '0000-0003-0313-7048' }]
  return list
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
  const data: OrcidWorksResponse = await response.json()
  return getArticleOutput(data)
}

function getArticleOutput(data: OrcidWorksResponse): ArticleOutput[] {
  const works = data.group.flatMap((group) => group['work-summary'])
  return works.map((work) => {
    const title = work.title.title.value
    const url = work.url?.value ?? null
    const year = work['publication-date'].year?.value
    const month = work['publication-date'].month?.value
    const day = work['publication-date'].day?.value
    const publicationDate = year ? [year, month, day].filter(Boolean).join('-') : null
    return {
      title,
      url,
      publicationDate,
    }
  })
}

async function updateDatabase() {}

type SharedArticle = {
  article: ArticleOutput
  people: string[]
}

function articleKey(article: ArticleOutput) {
  return `${article.title.toLowerCase().trim()}|${article.url ?? ''}|${article.publicationDate ?? ''}`
}

async function compareEntries(data: PerPersonOutputType[]): Promise<SharedArticle[]> {
  const articleMap = new Map<string, SharedArticle>()

  for (const person of data) {
    for (const article of person.articles) {
      const key = articleKey(article)

      const existing = articleMap.get(key)

      if (existing) {
        if (!existing.people.includes(person.name)) {
          existing.people.push(person.name)
        }
      } else {
        articleMap.set(key, {
          article,
          people: [person.name],
        })
      }
    }
  }

  return Array.from(articleMap.values())
}

function uploadToDatabase(data: ArticleOutput) {
  uploadResearch({
    title: data.title,
    url: data.url || '',
    publicationDate: data.publicationDate || '',
  })
}

async function main() {
  const data: PerPersonOutputType[] = await Promise.all(
    getOrcidList().map(async (pair) => {
      const articles = await fetchResearchOrcid(pair.orcid)
      return {
        name: pair.name,
        articles,
      }
    }),
  )

  const cleaned: SharedArticle[] = await compareEntries(data)
  cleaned.map((data) => uploadToDatabase(data.article))

  console.log(cleaned)
  return cleaned
}

main()
