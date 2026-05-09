import type { GlobalConfig } from 'payload'

export const StudiesPage: GlobalConfig = {
  slug: 'studies-page',
  label: 'Studies Page',
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'banner',
      type: 'upload',
      relationTo: 'media',
      label: 'banner',
      required: true,
    },
    {
      name: 'studiesDisplay',
      type: 'relationship',
      relationTo: 'studies',
      hasMany: true,
      admin: {
        allowCreate: true,
        allowEdit: true,
      },
    },
    {
      name: 'contact',
      type: 'group',
      label: 'Contact info (shown in the sidebar of every study detail page)',
      fields: [
        {
          name: 'email',
          type: 'email',
          required: true,
          admin: {
            description: 'e.g. info@aucklandunit.ac.nz',
          },
        },
        {
          name: 'address',
          type: 'textarea',
          required: true,
          localized: true,
          admin: {
            description:
              'Multi-line postal address. Localized so place names can be transliterated.',
          },
        },
        {
          name: 'phone',
          type: 'text',
          required: true,
          admin: {
            description: 'e.g. 021 1234 5678',
          },
        },
      ],
    },
  ],
}
