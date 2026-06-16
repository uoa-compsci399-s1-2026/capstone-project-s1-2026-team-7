export type OpenAlexHierarchyNode = {
  id?: string | number | null
  display_name?: string | null
}

export type OpenAlexTopic = {
  id?: string | null
  display_name?: string | null
  score?: number | null
  subfield?: OpenAlexHierarchyNode | null
  field?: OpenAlexHierarchyNode | null
  domain?: OpenAlexHierarchyNode | null
}

export type OpenAlexKeyword = {
  id?: string | null
  display_name?: string | null
  score?: number | null
}

export type OpenAlexWork = {
  id?: string | null
  doi?: string | null
  title?: string | null
  display_name?: string | null
  primary_topic?: OpenAlexTopic | null
  topics?: OpenAlexTopic[] | null
  keywords?: OpenAlexKeyword[] | null
}

export type OpenAlexCategorySuggestion = {
  name: string
  source: 'primary_topic' | 'topic' | 'keyword'
  score: number | null
}
