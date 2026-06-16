import type {
  ArticleOutput,
  CsvResearchRow,
  NameWithOrcid,
  PerPersonOutputType,
  SharedArticle,
} from './types'

function escapeCsvValue(value: string | number | null | undefined): string {
  const stringValue = value === null || value === undefined ? '' : String(value)

  if (/[",\n\r]/.test(stringValue)) {
    return `"${stringValue.replace(/"/g, '""')}"`
  }

  return stringValue
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

export function buildCsvRows(
  cleanedResearch: SharedArticle[],
  people: NameWithOrcid[],
): CsvResearchRow[] {
  return cleanedResearch.map((item) => {
    const linkedPeople = people.filter((person) => item.staffIds.includes(person.staffId))
    const orcidIds = linkedPeople.map((person) => person.orcid)

    return {
      title: item.article.title,
      doi: item.article.doi ?? '',
      url: item.article.url ?? '',
      publicationDate: item.article.publicationDate ?? '',
      staffNames: item.people.join('; '),
      staffIds: item.staffIds.join('; '),
      orcidIds: [...new Set(orcidIds)].join('; '),
      categories: '',
    }
  })
}

export function convertToCsv(rows: CsvResearchRow[]): string {
  const headers: Array<keyof CsvResearchRow> = [
    'title',
    'doi',
    'url',
    'publicationDate',
    'staffNames',
    'staffIds',
    'orcidIds',
    'categories',
  ]

  const csvRows = rows.map((row) => headers.map((header) => escapeCsvValue(row[header])).join(','))

  return [headers.join(','), ...csvRows].join('\n')
}
