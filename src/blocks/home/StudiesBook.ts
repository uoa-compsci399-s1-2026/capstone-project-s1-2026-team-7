import type { Block } from 'payload'

export const StudiesBlock: Block = {
  slug: 'studies',
  interfaceName: 'StudiesBlock',
  labels: {
    singular: 'Studies Section',
    plural: 'Studies Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Our Studies Section Title',
      localized: true,
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
