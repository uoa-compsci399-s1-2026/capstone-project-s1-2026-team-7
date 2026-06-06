import type { CollectionConfig } from 'payload'
import { getMergedCategoryIdsForResearch } from '@/features/research/keywordCategorisation'
import { fetchPubMedEnrichment } from '@/features/research/pubmed'

export const Research: CollectionConfig = {
  slug: 'research',
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    {
      name: 'doi',
      type: 'text',
      admin: { description: 'Optional. Used as the preferred stable identifier for CSV imports.' },
    },
    {
      name: 'link',
      label: 'link',
      type: 'text',
      admin: { description: 'Optional. Used with title and date as a fallback CSV import match.' },
    },
    { name: 'date', label: 'Date Uploaded', type: 'text' },
    {
      name: 'staff',
      type: 'relationship',
      relationTo: 'staff',
      hasMany: true,
      required: false,
      admin: { description: 'Select related staff members' },
    },
    { name: 'categories', type: 'relationship', relationTo: 'research-categories', hasMany: true },
    {
      name: 'searchText',
      type: 'textarea',
      admin: {
        readOnly: true,
        position: 'sidebar',
        description:
          'Auto-filled from PubMed (abstract, author keywords, MeSH terms) and used for keyword-based auto-categorisation. Clear it and save to re-fetch.',
      },
    },
    {
      name: 'csvDeleted',
      label: 'Deleted from CSV',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description:
          'Keeps CSV deletions persistent by hiding this record and excluding it from future ORCID CSV exports.',
      },
    },
    {
      name: 'csvDeletedAt',
      label: 'CSV deleted at',
      type: 'date',
      admin: {
        position: 'sidebar',
        readOnly: true,
        condition: (_, siblingData) => Boolean(siblingData?.csvDeleted),
      },
    },
    {
      name: 'order',
      type: 'number',
      required: false,
      admin: { position: 'sidebar', description: 'Used for manual sorting (lower comes first)' },
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, req, context }) => {
        if (context?.skipKeywordSync) return doc

        let searchText = typeof doc.searchText === 'string' ? doc.searchText : ''

        // Enrich once: only call PubMed when we have a DOI and no cached text yet.
        if (doc.doi && !searchText) {
          searchText = await fetchPubMedEnrichment(doc.doi)
        }

        const merged = await getMergedCategoryIdsForResearch(
          req.payload,
          { title: doc.title, searchText, categories: doc.categories },
          req,
        )

        const data: Record<string, unknown> = {}
        if (searchText && searchText !== doc.searchText) data.searchText = searchText
        if (merged) data.categories = merged

        if (Object.keys(data).length === 0) return doc

        await req.payload.update({
          collection: 'research',
          id: doc.id,
          data,
          depth: 0,
          req,
          context: { skipKeywordSync: true },
        })

        return doc
      },
    ],
  },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'order'] },
  defaultSort: '-createdAt',
}
