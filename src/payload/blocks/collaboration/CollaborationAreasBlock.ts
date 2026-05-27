import { Block } from 'payload'

export const CollaborationAreasBlock: Block = {
  slug: 'collaborationAreas',
  labels: {
    singular: 'Collaboration Area',
    plural: 'Collaboration Areas',
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      required: true,
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
      ],
    },
  ],
}
