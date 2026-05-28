import type { Block } from 'payload'

export const StatsSectionBlock: Block = {
  slug: 'statsSection',
  interfaceName: 'StatsSectionBlock',
  labels: {
    singular: 'Stats Section',
    plural: 'Stats Sections',
  },
  admin: {
    group: 'Static Components',
    disableBlockName: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: false,
    },
    {
      name: 'stats',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'value',
          type: 'number',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'icon',
          type: 'select',
          required: true,
          options: [
            { label: 'Graduation Cap', value: 'GraduationCap' },
            { label: 'Book Open', value: 'BookOpen' },
            { label: 'Handshake', value: 'Handshake' },
            { label: 'Users Round', value: 'UsersRound' },
          ],
        },
      ],
    },
  ],
}
