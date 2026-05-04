import type { Block } from 'payload'

export const ResearchBlock: Block = {
  slug: 'research',
  interfaceName: 'ResearchBlock',
  labels: {
    singular: 'Research Section',
    plural: 'Research Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Research Section Title',
      localized: true,
      required: true,
    },
    {
      name: 'researchDisplay',
      type: 'relationship',
      relationTo: 'research',
      hasMany: true,
      admin: {
        allowCreate: true,
        allowEdit: true,
      },
    },
  ],
}
