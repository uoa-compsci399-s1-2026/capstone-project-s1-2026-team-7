import type { CollectionConfig } from 'payload'
import {
  getCategoryIds,
  getCategoryKeywords,
  textMatchesKeywords,
} from '@/features/research/keywordCategorisation'
import {
  getRelationshipIds,
  syncResearchCategoryTermsForCategory,
} from '@/features/research/categoryMappings/syncResearchCategoryTermRelations'

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
          'Fallback title matching words/phrases for this real website category. These are used when no mapped OpenAlex term is found.',
      },
      fields: [{ name: 'value', type: 'text', required: true }],
    },
    {
      name: 'mappedTerms',
      label: 'Mapped OpenAlex Terms',
      type: 'relationship',
      relationTo: 'research-category-terms',
      hasMany: true,
      admin: {
        description:
          'Select the OpenAlex terms that should map to this real website category. Saving this category will update those terms automatically.',
      },
      filterOptions: () => ({
        status: { not_equals: 'ignored' },
      }),
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, req, context }) => {
        if (context?.skipCategoryToTermSync) return doc

        const selectedTermIds = getRelationshipIds((doc as { mappedTerms?: unknown }).mappedTerms)

        await syncResearchCategoryTermsForCategory(req, doc.id, selectedTermIds)

        return doc
      },
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
    afterDelete: [
      async ({ doc, req }) => {
        const selectedTermIds = getRelationshipIds((doc as { mappedTerms?: unknown }).mappedTerms)

        for (const termId of selectedTermIds) {
          await req.payload.update({
            collection: 'research-category-terms' as any,
            id: termId,
            data: {
              mappedCategory: null,
              status: 'unmapped',
            },
            depth: 0,
            overrideAccess: true,
            req,
            context: {
              skipTermToCategorySync: true,
            },
          })
        }

        return doc
      },
    ],
  },
}
