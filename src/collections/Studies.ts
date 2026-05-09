import type { CollectionConfig } from 'payload'

export const Studies: CollectionConfig = {
  slug: 'studies',
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },

    {
      name: 'subtitle',
      type: 'text',
      localized: true,
      required: false,
    },

    {
      name: 'studyCode',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Public study identifier, e.g. HNU-2025-014. Must be unique.',
      },
    },

    {
      name: 'duration',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'Short label, e.g. "6 weeks · 4 visits".',
      },
    },

    {
      name: 'eligibility',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'Short label, e.g. "Adults 25–55, BMI 22–32".',
      },
    },

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
