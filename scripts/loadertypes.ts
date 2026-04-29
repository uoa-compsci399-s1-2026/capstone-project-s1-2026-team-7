export type SharedArticle = {
  article: ArticleOutput
  people: string[]
}

export type SharedArticleInternal = {
  article: ArticleOutput
  people: Set<string>
}

export type nameWithORcid = {
  name: string
  orcid: string
}

export type ArticleOutput = {
  title: string
  doi: string | null
  url: string | null
  publicationDate: string | null
}

export type PerPersonOutputType = {
  name: string
  articles: ArticleOutput[]
}

export type OrcidDateValue = {
  value: number
}

export type OrcidStringValue = {
  value: string
}

export type OrcidNullableStringValue = OrcidStringValue | null

export type OrcidExternalId = {
  'external-id-type': string
  'external-id-value': string
  'external-id-normalized': {
    value: string
    transient: boolean
  } | null
  'external-id-normalized-error': string | null
  'external-id-url': OrcidNullableStringValue
  'external-id-relationship': string
}

export type OrcidExternalIds = {
  'external-id': OrcidExternalId[]
}

export type OrcidSource = {
  'source-orcid': {
    uri: string
    path: string
    host: string
  } | null

  'source-client-id': {
    uri: string
    path: string
    host: string
  } | null

  'source-name': OrcidStringValue | null

  'assertion-origin-orcid': {
    uri: string
    path: string
    host: string
  } | null

  'assertion-origin-client-id': {
    uri: string
    path: string
    host: string
  } | null

  'assertion-origin-name': OrcidStringValue | null
}

export type OrcidTitle = {
  title: OrcidStringValue
  subtitle: OrcidNullableStringValue
  'translated-title': OrcidNullableStringValue
}

export type OrcidPublicationDate = {
  year: OrcidStringValue | null
  month: OrcidStringValue | null
  day: OrcidStringValue | null
}

export type OrcidWorkSummary = {
  'put-code': number
  'created-date': OrcidDateValue
  'last-modified-date': OrcidDateValue
  source: OrcidSource
  title: OrcidTitle
  'external-ids': OrcidExternalIds
  url: OrcidNullableStringValue
  type: string
  'publication-date': OrcidPublicationDate
  'journal-title': OrcidNullableStringValue
  visibility: string
  path: string
  'display-index': string
}

export type OrcidWorkGroup = {
  'last-modified-date': OrcidDateValue
  'external-ids': OrcidExternalIds
  'work-summary': OrcidWorkSummary[]
}

export type OrcidWorksResponse = {
  'last-modified-date': OrcidDateValue
  group: OrcidWorkGroup[]
}
