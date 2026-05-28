import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  timestamps: true,
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml'],
    formatOptions: {
      format: 'webp',
    },
  },
}
