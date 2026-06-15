import { getPayloadClient } from '@/lib/payload'
import type { ParsedResearchRow } from './types'

export function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export async function buildCategoryResolver(
  rows: ParsedResearchRow[],
  dryRun: boolean,
): Promise<(names: string[]) => number[]> {
  if (dryRun) {
    return () => []
  }

  const uniqueNames = Array.from(new Set(rows.flatMap((row) => row.categoryNames).filter(Boolean)))

  if (uniqueNames.length === 0) {
    return () => []
  }

  const payload = await getPayloadClient()
  const uniqueSlugs = uniqueNames.map(slugify)

  const existing = await payload.find({
    collection: 'research-categories',
    where: {
      or: [{ title: { in: uniqueNames } }, { slug: { in: uniqueSlugs } }],
    },
    limit: uniqueNames.length * 2,
  })

  const titleToId = new Map<string, number>()
  const slugToId = new Map<string, number>()

  for (const category of existing.docs) {
    if (category.title) titleToId.set(category.title, category.id)
    if (category.slug) slugToId.set(category.slug, category.id)
  }

  const nameToId = new Map<string, number>()

  for (const name of uniqueNames) {
    const slug = slugify(name)
    const existingId = titleToId.get(name) ?? slugToId.get(slug)

    if (existingId !== undefined) {
      nameToId.set(name, existingId)
      continue
    }

    const created = await payload.create({
      collection: 'research-categories',
      data: { title: name, slug },
    })

    nameToId.set(name, created.id)
  }

  return (names) => {
    const ids: number[] = []
    const seen = new Set<number>()

    for (const name of names) {
      const id = nameToId.get(name)

      if (id !== undefined && !seen.has(id)) {
        ids.push(id)
        seen.add(id)
      }
    }

    return ids
  }
}
