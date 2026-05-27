import { Block } from 'payload'

export const CollaborativeApproachBlock: Block = {
  slug: 'collaborativeApproach',
  labels: {
    singular: 'Collaborative Approach',
    plural: 'Collaborative Approaches',
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
