import { XMLParser } from 'fast-xml-parser'

const parser = new XMLParser({
  ignoreAttributes: false,
})

function parsePubmedXML(xml: string) {
  return parser.parse(xml)
}

// Dummy loader function

const apiKey = process.env.PUBMED_API_KEY
if (!apiKey) {
  throw new Error('Missing PUBMED_API_KEY in environment variables')
}

export type PubmedList = {
  ids: string[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function seedResearch() {
  console.log('Loader started')
  const pubmedIDList: string[] = await getPubmedList()
  console.log(pubmedIDList)
  const pubmedXMLList: any = await getAllPubmedArticles(pubmedIDList)
  console.log(pubmedXMLList)
}

async function getPubmedList(): Promise<string[]> {
  let idList: string[] = []
  let counter: number = 0
  let total: number
  let page: number = 0
  do {
    const pubmedList: PubmedList = await fetchPubmedInfo(++page, 100)
    total = pubmedList.total
    idList = idList.concat(pubmedList.ids)
    counter += pubmedList.ids.length
    await sleep(100)
  } while (counter < total)
  return idList
}

async function fetchPubmedInfo(page = 1, pageSize = 20): Promise<PubmedList> {
  const baseurl = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/'
  const term = 'human+nutrition+unit+auckland'
  const retstart = (page - 1) * pageSize
  const url = `${baseurl}esearch.fcgi?db=pubmed&term=${term}&retmode=json&retmax=${pageSize}&retstart=${retstart}&api_key=${apiKey}`
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`HTTP error: ${res.status}`)
  }
  const json = await res.json()
  const result = json.esearchresult
  return {
    ids: result.idlist,
    total: parseInt(result.count, 10),
    page,
    pageSize,
    totalPages: Math.ceil(result.count / pageSize),
  }
}

const BATCH_SIZE = 50
async function getAllPubmedArticles(ids: string[]): Promise<string[]> {
  const results: string[] = []
  for (let i = 0; i < ids.length; i += BATCH_SIZE) {
    const batch = ids.slice(i, i + BATCH_SIZE)
    const xml = await fetchPubmedArticlesBatch(batch)
    results.push(xml)
    await sleep(200)
  }
  return results
}

async function fetchPubmedArticlesBatch(ids: string[]): Promise<string> {
  const baseurl = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/'
  const url = `${baseurl}efetch.fcgi?db=pubmed&id=${ids.join(',')}&retmode=xml&api_key=${apiKey}`
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`HTTP error: ${res.status}`)
  }
  const xml = await res.text()
  return parsePubmedXML(xml)
}

/*
async function fetchPubmedArticle(id: string): Promise<string> {
  const baseurl = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/'
  const url = `${baseurl}efetch.fcgi?db=pubmed&id=${id}&retmode=xml&api_key=${apiKey}`
  const res = await fetch(url)
  const xml = await res.text()
  return xml
}

async function getAllPubmedArticles(ids: string[]): Promise<string[]> {
  const results: string[] = await Promise.all(
    ids.map((id) => {
      sleep(100)
      return fetchPubmedArticle(id)
    }),
  )
  return results
}
  */
