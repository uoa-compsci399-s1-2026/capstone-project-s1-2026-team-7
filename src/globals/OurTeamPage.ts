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

    // Optional: if editors should choose/order staff manually
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
