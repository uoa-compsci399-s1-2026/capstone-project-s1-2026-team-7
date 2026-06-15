import { getPayloadClient } from '@/lib/payload'
import { normaliseResearchCategoryTerm } from './normaliseResearchCategoryTerm'
import type { OpenAlexCategorySuggestion } from '@/features/research/openalex/types'
import type { CsvResearchRow } from '@/features/research/orcid/types'

const RESEARCH_CATEGORY_TERMS_COLLECTION = 'research-category-terms' as const
const MAX_EXAMPLES_PER_TERM = 8

type ResearchCategoryTermSource = 'openalex-primary-topic' | 'openalex-topic' | 'openalex-keyword'

type ExampleResearch = {
  title: string
  doi?: string | null
  url?: string | null
}

type MappedCategoryDoc = {
  id?: number | string
  title?: string | null
}

type ResearchCategoryTermDoc = {
  id: number | string
  term?: string | null
  normalizedTerm?: string | null
  source?: ResearchCategoryTermSource | null
  status?: 'unmapped' | 'mapped' | 'ignored' | null
  mappedCategory?: number | string | MappedCategoryDoc | null
  sourceScore?: number | null
  timesSeen?: number | null
  exampleResearch?: ExampleResearch[] | null
}

function cleanTerm(value: string): string {
  return value.replace(/\s+/g, ' ').trim()
}

function sourceFromSuggestion(
  source: OpenAlexCategorySuggestion['source'],
): ResearchCategoryTermSource {
  if (source === 'primary_topic') return 'openalex-primary-topic'
  if (source === 'keyword') return 'openalex-keyword'
  return 'openalex-topic'
}

function getExampleFromRow(row: CsvResearchRow): ExampleResearch {
  return {
    title: row.title,
    doi: row.doi || null,
    url: row.url || null,
  }
}

function exampleKey(example: ExampleResearch): string {
  return normaliseResearchCategoryTerm(example.doi || example.title)
}

function mergeExample(
  existingExamples: ExampleResearch[] | null | undefined,
  nextExample: ExampleResearch,
): ExampleResearch[] {
  const examples: ExampleResearch[] = []
  const seen = new Set<string>()

  for (const example of existingExamples ?? []) {
    if (!example?.title) continue

    const key = exampleKey(example)
    if (!key || seen.has(key)) continue

    seen.add(key)
    examples.push({
      title: example.title,
      doi: example.doi || null,
      url: example.url || null,
    })
  }

  const nextKey = exampleKey(nextExample)
  if (nextKey && !seen.has(nextKey)) {
    examples.unshift(nextExample)
  }

  return examples.slice(0, MAX_EXAMPLES_PER_TERM)
}

function getMappedCategoryTitle(doc: ResearchCategoryTermDoc): string | null {
  if (doc.status === 'ignored') return null

  const mappedCategory = doc.mappedCategory

  if (!mappedCategory || typeof mappedCategory !== 'object') {
    return null
  }

  const title = mappedCategory.title?.trim()

  return title || null
}

function uniqueNames(names: string[]): string[] {
  const seen = new Set<string>()
  const unique: string[] = []

  for (const name of names.map(cleanTerm).filter(Boolean)) {
    const key = name.toLowerCase()
    if (seen.has(key)) continue

    seen.add(key)
    unique.push(name)
  }

  return unique
}

async function findTermByNormalizedValue(
  payload: Awaited<ReturnType<typeof getPayloadClient>>,
  normalizedTerm: string,
): Promise<ResearchCategoryTermDoc | null> {
  const result = await payload.find({
    collection: RESEARCH_CATEGORY_TERMS_COLLECTION as any,
    where: {
      normalizedTerm: { equals: normalizedTerm },
    },
    limit: 1,
    depth: 1,
    overrideAccess: true,
  })

  return (result.docs[0] as ResearchCategoryTermDoc | undefined) ?? null
}

async function upsertOpenAlexResearchCategoryTerm(
  payload: Awaited<ReturnType<typeof getPayloadClient>>,
  row: CsvResearchRow,
  suggestion: OpenAlexCategorySuggestion,
): Promise<ResearchCategoryTermDoc | null> {
  const term = cleanTerm(suggestion.name)
  const normalizedTerm = normaliseResearchCategoryTerm(term)

  if (!term || !normalizedTerm) return null

  const now = new Date().toISOString()
  const source = sourceFromSuggestion(suggestion.source)
  const example = getExampleFromRow(row)

  const existing = await findTermByNormalizedValue(payload, normalizedTerm)

  if (existing) {
    return (await payload.update({
      collection: RESEARCH_CATEGORY_TERMS_COLLECTION as any,
      id: existing.id,
      data: {
        term: existing.term || term,
        source: existing.source || source,
        sourceScore: suggestion.score ?? undefined,
        timesSeen: Number(existing.timesSeen ?? 0) + 1,
        lastSeenAt: now,
        exampleResearch: mergeExample(existing.exampleResearch, example),
      },
      depth: 1,
      overrideAccess: true,
    })) as ResearchCategoryTermDoc
  }

  try {
    return (await payload.create({
      collection: RESEARCH_CATEGORY_TERMS_COLLECTION as any,
      data: {
        term,
        normalizedTerm,
        source,
        sourceScore: suggestion.score ?? undefined,
        status: 'unmapped',
        timesSeen: 1,
        lastSeenAt: now,
        exampleResearch: [example],
      },
      depth: 1,
      overrideAccess: true,
    })) as ResearchCategoryTermDoc
  } catch (error) {
    // If another export worker created the same term first, refetch and update it.
    const duplicate = await findTermByNormalizedValue(payload, normalizedTerm)

    if (!duplicate) throw error

    return (await payload.update({
      collection: RESEARCH_CATEGORY_TERMS_COLLECTION as any,
      id: duplicate.id,
      data: {
        sourceScore: suggestion.score ?? undefined,
        timesSeen: Number(duplicate.timesSeen ?? 0) + 1,
        lastSeenAt: now,
        exampleResearch: mergeExample(duplicate.exampleResearch, example),
      },
      depth: 1,
      overrideAccess: true,
    })) as ResearchCategoryTermDoc
  }
}

export async function saveOpenAlexTermsAndGetMappedCategoryNames(
  row: CsvResearchRow,
  suggestions: OpenAlexCategorySuggestion[],
): Promise<string[]> {
  if (suggestions.length === 0) return []

  const payload = await getPayloadClient()
  const mappedCategoryNames: string[] = []

  for (const suggestion of suggestions) {
    const doc = await upsertOpenAlexResearchCategoryTerm(payload, row, suggestion)
    const mappedCategoryName = doc ? getMappedCategoryTitle(doc) : null

    if (mappedCategoryName) {
      mappedCategoryNames.push(mappedCategoryName)
    }
  }

  return uniqueNames(mappedCategoryNames)
}
