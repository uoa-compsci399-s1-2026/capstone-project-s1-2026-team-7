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
  ],
}
