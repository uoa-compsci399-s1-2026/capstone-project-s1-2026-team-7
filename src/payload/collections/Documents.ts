import type { CollectionConfig } from 'payload'

export const Documents: CollectionConfig = {
  slug: 'documents',
  timestamps: true,
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description:
          'A short description of the document, e.g. "Ferdinand Study Participant Information Sheet".',
      },
    },
  ],
  upload: {
    staticDir: 'documents',
    mimeTypes: ['application/pdf'],
    // No formatOptions — PDFs are stored as-is, no image conversion.
  },
}
