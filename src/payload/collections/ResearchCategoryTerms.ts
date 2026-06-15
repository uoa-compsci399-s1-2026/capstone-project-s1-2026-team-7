import type { CollectionConfig } from 'payload'
import { normaliseResearchCategoryTerm } from '@/features/research/categoryMappings/normaliseResearchCategoryTerm'
import {
  getRelationshipId,
  syncResearchCategoryTermBackToCategories,
} from '@/features/research/categoryMappings/syncResearchCategoryTermRelations'

export const ResearchCategoryTerms: CollectionConfig = {
  slug: 'research-category-terms',
  labels: {
    singular: 'Research Category Term',
    plural: 'Research Category Terms',
  },
  admin: {
    useAsTitle: 'term',
    group: 'Research',
    defaultColumns: ['term', 'source', 'status', 'mappedCategory', 'timesSeen', 'lastSeenAt'],
    description:
      'OpenAlex terms discovered during research CSV exports. Map these terms to real Research Categories before importing/exporting approved categories.',
  },
  fields: [
    {
      name: 'term',
      type: 'text',
      required: true,
      admin: {
        description:
          'The raw topic or keyword found from OpenAlex. This is not shown as a website category unless it is mapped below.',
      },
    },
    {
      name: 'normalizedTerm',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        readOnly: true,
        position: 'sidebar',
        description: 'Lowercase value used to avoid duplicate terms.',
      },
    },
    {
      name: 'source',
      type: 'select',
      required: true,
      defaultValue: 'openalex-topic',
      options: [
        { label: 'OpenAlex primary topic', value: 'openalex-primary-topic' },
        { label: 'OpenAlex topic', value: 'openalex-topic' },
        { label: 'OpenAlex keyword', value: 'openalex-keyword' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Where this suggested term came from.',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'unmapped',
      options: [
        { label: 'Unmapped', value: 'unmapped' },
        { label: 'Mapped', value: 'mapped' },
        { label: 'Ignored', value: 'ignored' },
      ],
      admin: {
        position: 'sidebar',
        description:
          'Unmapped terms are waiting for review. Ignored terms are never used for category suggestions.',
      },
    },
    {
      name: 'mappedCategory',
      label: 'Mapped research category',
      type: 'relationship',
      relationTo: 'research-categories',
      admin: {
        description:
          'Choose the real website Research Category this OpenAlex term should point to. You can also manage this from the Research Category edit screen.',
      },
    },
    {
      name: 'sourceScore',
      label: 'OpenAlex score',
      type: 'number',
      admin: {
        readOnly: true,
        position: 'sidebar',
        description: 'The latest relevance score returned by OpenAlex, where available.',
      },
    },
    {
      name: 'timesSeen',
      type: 'number',
      defaultValue: 0,
      admin: {
        readOnly: true,
        position: 'sidebar',
        description: 'How many exported publications have returned this term.',
      },
    },
    {
      name: 'lastSeenAt',
      type: 'date',
      admin: {
        readOnly: true,
        position: 'sidebar',
        description: 'Last time this term appeared during a research CSV export.',
      },
    },
    {
      name: 'exampleResearch',
      label: 'Example research records',
      type: 'array',
      admin: {
        description:
          'Examples where this term appeared. These are added automatically during CSV export to help admins decide the mapping.',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: { readOnly: true },
        },
        {
          name: 'doi',
          label: 'DOI',
          type: 'text',
          admin: { readOnly: true },
        },
        {
          name: 'url',
          label: 'URL',
          type: 'text',
          admin: { readOnly: true },
        },
      ],
    },
    {
      name: 'adminNotes',
      label: 'Admin notes',
      type: 'textarea',
      admin: {
        description: 'Optional notes for why this term is mapped or ignored.',
      },
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (!data) return data

        const term = typeof data.term === 'string' ? data.term : ''
        data.normalizedTerm = normaliseResearchCategoryTerm(term)

        return data
      },
    ],
    beforeChange: [
      ({ data }) => {
        if (!data) return data

        if (data.status === 'ignored') {
          data.mappedCategory = null
          return data
        }

        data.status = data.mappedCategory ? 'mapped' : 'unmapped'

        return data
      },
    ],
    afterChange: [
      async ({ doc, previousDoc, req, context }) => {
        if (context?.skipTermToCategorySync) return doc

        const previousCategoryId = getRelationshipId(previousDoc?.mappedCategory)
        const nextCategoryId =
          doc.status === 'ignored' ? null : getRelationshipId(doc.mappedCategory)

        await syncResearchCategoryTermBackToCategories(
          req,
          doc.id,
          previousCategoryId,
          nextCategoryId,
        )

        return doc
      },
    ],
    afterDelete: [
      async ({ doc, req }) => {
        const previousCategoryId = getRelationshipId(doc.mappedCategory)

        await syncResearchCategoryTermBackToCategories(req, doc.id, previousCategoryId, null)

        return doc
      },
    ],
  },
}
