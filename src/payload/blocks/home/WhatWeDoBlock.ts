import type { Block } from 'payload'

const translateButton =
  '/payload/components/admin/TranslateFromEnglishButton#TranslateFromEnglishButton'

export const WhatWeDoBlock: Block = {
  slug: 'what-we-do',
  interfaceName: 'WhatWeDoBlock',
  labels: {
    singular: 'What We Do Section',
    plural: 'What We Do Sections',
  },
  admin: {
    group: 'Static Components',
    disableBlockName: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      localized: true,
      defaultValue: 'What We Do',
      admin: {
        components: {
          afterInput: [translateButton],
        },
      },
    },
    {
      name: 'sections',
      type: 'array',
      label: 'Sections',
      required: true,
      minRows: 1,
      labels: {
        singular: 'Section',
        plural: 'Sections',
      },
      fields: [
        {
          name: 'heading',
          type: 'text',
          label: 'Heading',
          required: true,
          localized: true,
          admin: {
            components: {
              afterInput: [translateButton],
            },
          },
        },
        {
          name: 'items',
          type: 'array',
          label: 'Bullet Points',
          required: true,
          minRows: 1,
          labels: {
            singular: 'Bullet Point',
            plural: 'Bullet Points',
          },
          fields: [
            {
              name: 'text',
              type: 'text',
              label: 'Text',
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
    },
    {
      name: 'image',
      type: 'upload',
      label: 'Image',
      relationTo: 'media',
      required: true,
    },
  ],
}
