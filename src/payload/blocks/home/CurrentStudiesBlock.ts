import type { Block } from 'payload'

const translateButton = [
  '/payload/components/admin/TranslateFromEnglishButton#TranslateFromEnglishButton',
]

export const CurrentStudiesBlock: Block = {
  slug: 'current-studies',
  interfaceName: 'CurrentStudiesBlock',
  labels: {
    singular: 'Current Studies Section',
    plural: 'Current Studies Sections',
  },
  admin: {
    group: 'Static Components',
    disableBlockName: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
      defaultValue: 'Current studies',
      admin: {
        description: 'Main title shown for the current studies section.',
        components: {
          afterInput: translateButton,
        },
      },
    },
    {
      name: 'link',
      type: 'group',
      label: 'Link',
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
          required: true,
          defaultValue: 'View all studies',
          admin: {
            description: 'Text shown on the button/link.',
            components: {
              afterInput: translateButton,
            },
          },
        },
        {
          name: 'href',
          type: 'text',
          required: true,
          defaultValue: '/studies',
          admin: {
            description: 'Link URL, e.g. /studies or https://example.com',
          },
        },
      ],
    },
    {
      name: 'studies',
      type: 'relationship',
      relationTo: 'studies',
      hasMany: true,
      label: 'Studies to display',
      admin: {
        allowCreate: true,
        allowEdit: true,
        description: 'Choose which studies appear in this homepage section.',
      },
    },
  ],
}
