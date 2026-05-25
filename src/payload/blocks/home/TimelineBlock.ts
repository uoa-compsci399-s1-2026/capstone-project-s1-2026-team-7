import type { Block } from 'payload'

const translateButton =
  '/payload/components/admin/TranslateFromEnglishButton#TranslateFromEnglishButton'

export const TimelineBlock: Block = {
  slug: 'timeline',
  interfaceName: 'TimelineBlock',
  labels: {
    singular: 'Timeline Section',
    plural: 'Timeline Sections',
  },
  admin: {
    group: 'Static Components',
    disableBlockName: true,
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Small Heading',
      required: true,
      localized: true,
      defaultValue: 'About the HNU',
      admin: {
        components: {
          afterInput: [translateButton],
        },
      },
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      localized: true,
      defaultValue: 'Our History',
      admin: {
        components: {
          afterInput: [translateButton],
        },
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      required: true,
      localized: true,
      defaultValue:
        'Our journey, marked by self-sustaining growth, reflects our enduring commitment to defining the gold standard in human nutrition research.',
      admin: {
        components: {
          afterInput: [translateButton],
        },
      },
    },
    {
      name: 'items',
      type: 'array',
      label: 'Timeline Items',
      required: true,
      minRows: 1,
      labels: {
        singular: 'Timeline Item',
        plural: 'Timeline Items',
      },
      fields: [
        {
          name: 'year',
          type: 'text',
          label: 'Year',
          required: true,
          localized: true,
          admin: {
            components: {
              afterInput: [translateButton],
            },
          },
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          required: true,
          localized: true,
          admin: {
            components: {
              afterInput: [translateButton],
            },
          },
        },
      ],
    },
  ],
}
