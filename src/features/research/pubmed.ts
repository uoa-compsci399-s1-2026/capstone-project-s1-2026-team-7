const ESEARCH = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi'
const EFETCH = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi'

function normalizeDoi(doi: string): string {
  return doi
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\/(dx\.)?doi\.org\//, '')
    .replace(/^doi:/, '')
}

/** Shared NCBI params — set NCBI_API_KEY / NCBI_EMAIL in .env for higher rate limits. */
function ncbiParams(extra: Record<string, string>): URLSearchParams {
  const params = new URLSearchParams({ tool: 'hnu-website', ...extra })
  if (process.env.NCBI_EMAIL) params.set('email', process.env.NCBI_EMAIL)
  if (process.env.NCBI_API_KEY) params.set('api_key', process.env.NCBI_API_KEY)
  return params
}

function stripTags(value: string): string {
  return value.replace(/<[^>]+>/g, ' ')
}

function decodeEntities(value: string): string {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)))
}

function extractAll(xml: string, tag: string): string[] {
  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'g')
  const out: string[] = []
  let match: RegExpExecArray | null
  while ((match = regex.exec(xml)) !== null) {
    const text = decodeEntities(stripTags(match[1])).replace(/\s+/g, ' ').trim()
    if (text) out.push(text)
  }
  return out
}

async function findPmid(doi: string): Promise<string | null> {
  const params = ncbiParams({ db: 'pubmed', term: `${doi}[DOI]`, retmode: 'json' })
  const response = await fetch(`${ESEARCH}?${params.toString()}`, {
    headers: { Accept: 'application/json' },
  })
  if (!response.ok) return null
  const data = (await response.json()) as { esearchresult?: { idlist?: string[] } }
  return data.esearchresult?.idlist?.[0] ?? null
}

/** Returns a lowercased searchable blob from PubMed for a DOI, or '' if not found. */
export async function fetchPubMedEnrichment(doi: string): Promise<string> {
  const cleanDoi = normalizeDoi(doi)
  if (!cleanDoi) return ''

  try {
    const pmid = await findPmid(cleanDoi)
    if (!pmid) return ''

    const params = ncbiParams({ db: 'pubmed', id: pmid, retmode: 'xml', rettype: 'abstract' })
    const response = await fetch(`${EFETCH}?${params.toString()}`)
    if (!response.ok) {
      console.warn(`PubMed efetch failed for ${cleanDoi} (pmid ${pmid}): ${response.status}`)
      return ''
    }

    const xml = await response.text()
    const parts = [
      ...extractAll(xml, 'ArticleTitle'),
      ...extractAll(xml, 'AbstractText'),
      ...extractAll(xml, 'DescriptorName'), // MeSH terms
      ...extractAll(xml, 'Keyword'),
    ]

    return parts.join(' \n ').toLowerCase()
  } catch (error) {
    console.warn(`PubMed lookup error for ${cleanDoi}:`, error)
    return ''
  }
}
