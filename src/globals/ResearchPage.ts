import type { GlobalConfig } from 'payload'

export const ResearchPage: GlobalConfig = {
  slug: 'research-page',
  label: 'Research Page',

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },

    //Content will be fetched by a separate API

    {
      name: 'researchCatagoriesDisplay',
      type: 'relationship',
      relationTo: 'research-categories',
      hasMany: true,
      admin: {
        allowCreate: true,
        allowEdit: true,
      },
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
        },
        {
          name: 'metaDescription',
          type: 'textarea',
        },
      ],
    },
  ],
}
