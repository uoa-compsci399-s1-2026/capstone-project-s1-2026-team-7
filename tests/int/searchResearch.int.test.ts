// tests/integration/searchResearch.int.test.ts
import { describe, it, expect, beforeAll, afterEach } from 'vitest'
import type { Payload } from 'payload'

import { getPayloadClient } from '@/lib/payload'
import { searchResearch } from '@/queries/searchResearch'
import { researchDTOSchema } from '@/validation'

let payload: Payload

const createdResearchIds: Array<string | number> = []
const createdCategoryIds: Array<string | number> = []

describe('searchResearch', () => {
  beforeAll(async () => {
    payload = await getPayloadClient()
  })

  afterEach(async () => {
    for (const id of createdResearchIds) {
      await payload.delete({
        collection: 'research',
        id,
        overrideAccess: true,
      })
    }

    for (const id of createdCategoryIds) {
      await payload.delete({
        collection: 'research-categories',
        id,
        overrideAccess: true,
      })
    }

    createdResearchIds.length = 0
    createdCategoryIds.length = 0
  })

  it('returns research DTOs matching the search term and category', async () => {
    const category = await payload.create({
      collection: 'research-categories',
      data: {
        title: 'Artificial Intelligence',
        slug: `ai-${crypto.randomUUID()}`,
      },
      overrideAccess: true,
    })

    createdCategoryIds.push(category.id)

    const research = await payload.create({
      collection: 'research',
      data: {
        title: 'AI Safety Research',
        description: 'Research about AI safety.',
        researchLink: 'https://example.com/ai-safety',
        order: 1,
        categories: [category.id],
      },
      overrideAccess: true,
    })

    createdResearchIds.push(research.id)

    const results = await searchResearch('AI Safety', category.id)

    expect(results).toHaveLength(1)

    expect(results[0]).toMatchObject({
      title: 'AI Safety Research',
      description: 'Research about AI safety.',
      researchLink: 'https://example.com/ai-safety',
    })

    expect(() => researchDTOSchema.parse(results[0])).not.toThrow()
  })

  it('does not return research from another category', async () => {
    const targetCategory = await payload.create({
      collection: 'research-categories',
      data: {
        title: 'Artificial Intelligence',
        slug: `ai-${crypto.randomUUID()}`,
      },
      overrideAccess: true,
    })

    const otherCategory = await payload.create({
      collection: 'research-categories',
      data: {
        title: 'Climate',
        slug: `climate-${crypto.randomUUID()}`,
      },
      overrideAccess: true,
    })

    createdCategoryIds.push(targetCategory.id, otherCategory.id)

    const research = await payload.create({
      collection: 'research',
      data: {
        title: 'AI Safety Research',
        description: 'Title matches, category does not.',
        researchLink: 'https://example.com/wrong-category',
        order: 1,
        categories: [otherCategory.id],
      },
      overrideAccess: true,
    })

    createdResearchIds.push(research.id)

    const results = await searchResearch('AI Safety', targetCategory.id)

    expect(results).toEqual([])
  })

  it('does not return research with a different title', async () => {
    const category = await payload.create({
      collection: 'research-categories',
      data: {
        title: 'Artificial Intelligence',
        slug: `ai-${crypto.randomUUID()}`,
      },
      overrideAccess: true,
    })

    createdCategoryIds.push(category.id)

    const research = await payload.create({
      collection: 'research',
      data: {
        title: 'Completely Different Topic',
        description: 'Category matches, title does not.',
        researchLink: 'https://example.com/different-topic',
        order: 1,
        categories: [category.id],
      },
      overrideAccess: true,
    })

    createdResearchIds.push(research.id)

    const results = await searchResearch('AI Safety', category.id)

    expect(results).toEqual([])
  })

  it('returns an empty array when nothing matches', async () => {
    const category = await payload.create({
      collection: 'research-categories',
      data: {
        title: 'Artificial Intelligence',
        slug: `ai-${crypto.randomUUID()}`,
      },
      overrideAccess: true,
    })

    createdCategoryIds.push(category.id)

    const results = await searchResearch('not a real search term', category.id)

    expect(results).toEqual([])
  })
})
