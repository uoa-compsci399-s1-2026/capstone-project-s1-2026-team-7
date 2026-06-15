import type { CollectionConfig } from 'payload'
import {
  getCategoryIds,
  getCategoryKeywords,
  textMatchesKeywords,
} from '@/features/research/keywordCategorisation'

export const ResearchCategories: CollectionConfig = {
  slug: 'research-categories',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'keywords',
      type: 'array',
      label: 'Keywords',
      admin: {
        description:
          'Publications whose title contains any of these words/phrases are automatically added to this category. Case-insensitive.',
      },
      fields: [{ name: 'value', type: 'text', required: true }],
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, req, context }) => {
        if (context?.skipKeywordSync) return doc

        const keywords = getCategoryKeywords(doc)
        if (keywords.length === 0) return doc

        const research = await req.payload.find({
          collection: 'research',
          limit: 0,
          depth: 0,
          req,
        })

        for (const item of research.docs) {
          const haystack = item.title ?? ''
          if (!textMatchesKeywords(haystack, keywords)) continue

          const existing = getCategoryIds(item.categories)
          if (existing.some((id) => String(id) === String(doc.id))) continue

          await req.payload.update({
            collection: 'research',
            id: item.id,
            data: { categories: [...existing, doc.id] },
            depth: 0,
            req,
            context: { skipKeywordSync: true },
          })
        }

        return doc
      },
    ],
  },
}
