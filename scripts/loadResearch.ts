import { OrcidWorkGroup, OrcidWorksResponse } from './loadertypes'
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

async function compareEntries() {}

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

  console.log(data)
  return data
}

main()
