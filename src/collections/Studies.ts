import type { CollectionConfig } from 'payload'

export const Studies: CollectionConfig = {
  slug: 'studies',
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'description', type: 'richText', required: true },
    { name: 'sortOrder', type: 'number' },
  ],
}
