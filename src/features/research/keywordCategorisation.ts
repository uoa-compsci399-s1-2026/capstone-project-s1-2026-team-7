import type { Payload, PayloadRequest } from 'payload'

type KeywordRow = { value?: string | null }

export type KeywordCategory = {
  id: number
  title?: string | null
  keywords?: KeywordRow[] | null
}

/** Normalise a category's keyword rows into a clean, lower-cased list. */
export function getCategoryKeywords(category: KeywordCategory): string[] {
  return (category.keywords ?? [])
    .map((row) => (row?.value ?? '').trim().toLowerCase())
    .filter((value) => value.length > 0)
}

/** True if the text contains any of the keywords (case-insensitive substring). */
export function textMatchesKeywords(text: string | null | undefined, keywords: string[]): boolean {
  if (!text) return false
  const haystack = text.toLowerCase()
  return keywords.some((keyword) => haystack.includes(keyword))
}

function toId(relation: unknown): number | null {
  if (relation == null) return null
  const raw =
    typeof relation === 'object'
      ? (relation as { id?: number | string }).id
      : (relation as number | string)
  const numeric = Number(raw)
  return Number.isNaN(numeric) ? null : numeric
}

/** Pull plain numeric ids out of a relationship value (handles ids or populated docs). */
export function getCategoryIds(categories: unknown): number[] {
  if (!Array.isArray(categories)) return []
  return categories.map(toId).filter((id): id is number => id != null)
}

export async function getMergedCategoryIdsForResearch(
  payload: Payload,
  research: { title?: string | null; categories?: unknown },
  req?: PayloadRequest,
): Promise<number[] | null> {
  const existing = getCategoryIds(research.categories)
  const haystack = research.title ?? ''

  const categories = await payload.find({
    collection: 'research-categories',
    limit: 0,
    depth: 0,
    req,
  })

  const matched = categories.docs
    .filter((cat) => textMatchesKeywords(haystack, getCategoryKeywords(cat as KeywordCategory)))
    .map((cat) => cat.id)

  const merged = Array.from(new Set<number>([...existing, ...matched]))

  const unchanged = merged.length === existing.length && merged.every((id) => existing.includes(id))

  return unchanged ? null : merged
}
