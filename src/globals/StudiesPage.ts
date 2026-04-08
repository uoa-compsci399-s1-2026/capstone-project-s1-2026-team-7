import type { GlobalConfig } from 'payload'

export const StudiesPage: GlobalConfig = {
  slug: 'studies-page',
  label: 'Studies Page',
  fields: [
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
