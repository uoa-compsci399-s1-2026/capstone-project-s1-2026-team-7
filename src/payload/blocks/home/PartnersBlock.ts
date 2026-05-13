import type { Block } from 'payload'

export const PartnersBlock: Block = {
  slug: 'partners',
  interfaceName: 'PartnersBlock',
  labels: {
    singular: 'Industry Partners Section',
    plural: 'Industry Partners Sections',
  },
  fields: [
    {
      name: 'partners',
      type: 'array',
      label: 'Partner Logos',
      minRows: 1,
      fields: [
        {
          name: 'logo',
          type: 'upload',
          label: 'Partner Logo',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'alt',
          type: 'text',
          label: 'Alt Text',
          required: true,
        },
      ],
    },
  ],
}
