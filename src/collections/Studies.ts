import type { CollectionConfig } from 'payload'

export const Studies: CollectionConfig = {
  slug: 'studies',
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'URL-friendly version of the title, e.g. nutrition-study-2026',
      },
    },
    { name: 'banner', type: 'upload', relationTo: 'media' },
    { name: 'description', type: 'richText', required: true, localized: true },
    { name: 'sortOrder', type: 'number' },
  ],
}
