import type {
  OpenAlexCategorySuggestion,
  OpenAlexKeyword,
  OpenAlexTopic,
  OpenAlexWork,
} from './types'

type GetOpenAlexCategorySuggestionsOptions = {
  /** Maximum number of category names to return for a single work. */
  limit?: number
  /** Minimum score for OpenAlex topics. */
  minTopicScore?: number
  /** Minimum score for OpenAlex keywords when topics are unavailable. */
  minKeywordScore?: number
}

const DEFAULT_LIMIT = 3
const DEFAULT_MIN_TOPIC_SCORE = 0.25
const DEFAULT_MIN_KEYWORD_SCORE = 0.35

function cleanCategoryName(value: string | null | undefined): string | null {
  const cleaned = value?.replace(/\s+/g, ' ').trim()

  return cleaned && cleaned.length > 1 ? cleaned : null
}

function scoreOf(item: { score?: number | null }): number {
  return typeof item.score === 'number' ? item.score : 0
}

function addSuggestion(
  suggestions: OpenAlexCategorySuggestion[],
  seen: Set<string>,
  name: string | null,
  source: OpenAlexCategorySuggestion['source'],
  score: number | null | undefined,
): void {
  if (!name) return

  const key = name.toLowerCase()

  if (seen.has(key)) return

  seen.add(key)
  suggestions.push({
    name,
    source,
    score: typeof score === 'number' ? score : null,
  })
}

function getTopicSuggestions(
  work: OpenAlexWork,
  options: Required<GetOpenAlexCategorySuggestionsOptions>,
): OpenAlexCategorySuggestion[] {
  const suggestions: OpenAlexCategorySuggestion[] = []
  const seen = new Set<string>()

  const primaryTopic = work.primary_topic

  if (primaryTopic && scoreOf(primaryTopic) >= options.minTopicScore) {
    addSuggestion(
      suggestions,
      seen,
      cleanCategoryName(primaryTopic.display_name),
      'primary_topic',
      primaryTopic.score,
    )
  }

  const topics = [...(work.topics ?? [])]
    .filter((topic): topic is OpenAlexTopic => Boolean(topic))
    .filter((topic) => scoreOf(topic) >= options.minTopicScore)
    .sort((a, b) => scoreOf(b) - scoreOf(a))

  for (const topic of topics) {
    addSuggestion(suggestions, seen, cleanCategoryName(topic.display_name), 'topic', topic.score)

    if (suggestions.length >= options.limit) break
  }

  return suggestions.slice(0, options.limit)
}

function getKeywordSuggestions(
  work: OpenAlexWork,
  options: Required<GetOpenAlexCategorySuggestionsOptions>,
): OpenAlexCategorySuggestion[] {
  const suggestions: OpenAlexCategorySuggestion[] = []
  const seen = new Set<string>()

  const keywords = [...(work.keywords ?? [])]
    .filter((keyword): keyword is OpenAlexKeyword => Boolean(keyword))
    .filter((keyword) => scoreOf(keyword) >= options.minKeywordScore)
    .sort((a, b) => scoreOf(b) - scoreOf(a))

  for (const keyword of keywords) {
    addSuggestion(
      suggestions,
      seen,
      cleanCategoryName(keyword.display_name),
      'keyword',
      keyword.score,
    )

    if (suggestions.length >= options.limit) break
  }

  return suggestions
}

export function getOpenAlexCategorySuggestions(
  work: OpenAlexWork | null,
  options?: GetOpenAlexCategorySuggestionsOptions,
): OpenAlexCategorySuggestion[] {
  if (!work) {
    return []
  }

  const resolvedOptions: Required<GetOpenAlexCategorySuggestionsOptions> = {
    limit: options?.limit ?? DEFAULT_LIMIT,
    minTopicScore: options?.minTopicScore ?? DEFAULT_MIN_TOPIC_SCORE,
    minKeywordScore: options?.minKeywordScore ?? DEFAULT_MIN_KEYWORD_SCORE,
  }

  const topicSuggestions = getTopicSuggestions(work, resolvedOptions)

  if (topicSuggestions.length > 0) {
    return topicSuggestions
  }

  return getKeywordSuggestions(work, resolvedOptions)
}
