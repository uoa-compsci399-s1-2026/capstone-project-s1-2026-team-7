import type { GlobalConfig } from 'payload'

export const OurTeamPage: GlobalConfig = {
  slug: 'our-team-page',
  label: 'Our Team Page',
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
      required: false,
    },

    {
      name: 'boardTabLabel',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'Board Of Directors',
    },
    {
      name: 'staffTabLabel',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'Research Team',
    },

    {
      name: 'staffMembers',
      type: 'relationship',
      relationTo: 'staff',
      hasMany: true,
      admin: {
        isSortable: true,
        allowCreate: true,
        allowEdit: true,
      },
    },
  ],
}
