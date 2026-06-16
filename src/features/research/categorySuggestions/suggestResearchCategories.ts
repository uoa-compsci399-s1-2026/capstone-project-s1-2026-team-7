import { getPayloadClient } from '@/lib/payload'
import {
  getCategoryKeywords,
  textMatchesKeywords,
  type KeywordCategory,
} from '@/features/research/keywordCategorisation'
import { fetchOpenAlexWorkByDoi } from '@/features/research/openalex/fetchOpenAlexWork'
import { getOpenAlexCategorySuggestions } from '@/features/research/openalex/getOpenAlexCategorySuggestions'
import { saveOpenAlexTermsAndGetMappedCategoryNames } from '@/features/research/categoryMappings/researchCategoryTerms'
import type { CsvResearchRow } from '@/features/research/orcid/types'
import { throwIfAborted } from '@/features/research/orcid/utils'

type CategorySuggestionOptions = {
  signal?: AbortSignal
  onProgress?: (event: {
    index: number
    total: number
    title: string
    categories: string[]
  }) => void
}

async function processRowsWithConcurrency<T, R>(
  items: T[],
  concurrency: number,
  fn: (item: T, index: number) => Promise<R>,
): Promise<R[]> {
  const results = new Array<R>(items.length)
  let nextIndex = 0

  async function worker(): Promise<void> {
    while (true) {
      const index = nextIndex++
      if (index >= items.length) return

      results[index] = await fn(items[index], index)
    }
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, () => worker()))

  return results
}

function normaliseName(value: string): string {
  return value.replace(/\s+/g, ' ').trim()
}

function uniqueNames(names: string[]): string[] {
  const seen = new Set<string>()
  const unique: string[] = []

  for (const name of names.map(normaliseName).filter(Boolean)) {
    const key = name.toLowerCase()

    if (seen.has(key)) continue

    seen.add(key)
    unique.push(name)
  }

  return unique
}

async function getKeywordFallbackCategories(): Promise<KeywordCategory[]> {
  const payload = await getPayloadClient()

  const categories = await payload.find({
    collection: 'research-categories',
    limit: 0,
    depth: 0,
    overrideAccess: true,
  })

  return categories.docs as KeywordCategory[]
}

function getTitleKeywordCategoryNames(title: string, categories: KeywordCategory[]): string[] {
  return uniqueNames(
    categories
      .filter((category) => textMatchesKeywords(title, getCategoryKeywords(category)))
      .map((category) => category.title ?? '')
      .filter(Boolean),
  )
}

async function getMappedCategoryNamesFromOpenAlexTerms(
  row: CsvResearchRow,
  signal?: AbortSignal,
): Promise<string[]> {
  if (!row.doi) {
    return []
  }

  try {
    const work = await fetchOpenAlexWorkByDoi(row.doi, { signal })
    const suggestions = getOpenAlexCategorySuggestions(work)

    if (suggestions.length === 0) {
      return []
    }

    return saveOpenAlexTermsAndGetMappedCategoryNames(row, suggestions)
  } catch (error) {
    console.warn(
      `OpenAlex term lookup failed for ${row.doi || row.title}. Falling back to title keywords.`,
      error,
    )
    return []
  }
}

export async function suggestCategoryNamesForResearchRow(
  row: CsvResearchRow,
  titleKeywordCategories: KeywordCategory[],
  signal?: AbortSignal,
): Promise<string[]> {
  throwIfAborted(signal)

  const existingCategoryNames = row.categories
    .split(/[;,]/)
    .map((category) => category.trim())
    .filter(Boolean)

  if (existingCategoryNames.length > 0) {
    return uniqueNames(existingCategoryNames)
  }

  const mappedCategoryNames = await getMappedCategoryNamesFromOpenAlexTerms(row, signal)

  if (mappedCategoryNames.length > 0) {
    return mappedCategoryNames
  }

  return getTitleKeywordCategoryNames(row.title, titleKeywordCategories)
}

export async function addSuggestedCategoriesToResearchRows(
  rows: CsvResearchRow[],
  options?: CategorySuggestionOptions,
): Promise<CsvResearchRow[]> {
  if (rows.length === 0) {
    return rows
  }

  const titleKeywordCategories = await getKeywordFallbackCategories()

  return processRowsWithConcurrency(rows, 3, async (row, index) => {
    throwIfAborted(options?.signal)

    const categoryNames = await suggestCategoryNamesForResearchRow(
      row,
      titleKeywordCategories,
      options?.signal,
    )

    options?.onProgress?.({
      index: index + 1,
      total: rows.length,
      title: row.title,
      categories: categoryNames,
    })

    return {
      ...row,
      categories: categoryNames.join('; '),
    }
  })
}
