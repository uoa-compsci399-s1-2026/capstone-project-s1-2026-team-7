import type { GlobalConfig } from 'payload'

export const ResearchPage: GlobalConfig = {
  slug: 'research-page',
  label: 'Research Page',

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        components: {
          afterInput: [
            '/payload/components/admin/TranslateFromEnglishButton#TranslateFromEnglishButton',
          ],
        },
      },
    },
    {
      name: 'portrait image',
      type: 'upload',
      relationTo: 'media',
      label: 'Portrait Image',
      required: true,
    },

    {
      name: 'mobile image',
      type: 'upload',
      relationTo: 'media',
      label: 'Mobile Image',
      required: true,
    },

    //Content will be fetched by a separate API

    {
      name: 'researchCategoriesDisplay',
      type: 'relationship',
      relationTo: 'research-categories',
      hasMany: true,
      admin: {
        allowCreate: true,
        allowEdit: true,
      },
    },

    {
      name: 'researchStaffDisplay',
      type: 'relationship',
      relationTo: 'staff',
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
