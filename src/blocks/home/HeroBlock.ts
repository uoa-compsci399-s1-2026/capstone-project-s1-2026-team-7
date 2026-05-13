import type { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  labels: {
    singular: 'Hero Section',
    plural: 'Hero Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Hero Title',
      localized: true,
      required: true,
      admin: {
        components: {
          afterInput: ['/components/admin/TranslateFromEnglishButton#TranslateFromEnglishButton'],
        },
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Hero Description',
      localized: true,
      required: true,
      admin: {
        components: {
          afterInput: ['/components/admin/TranslateFromEnglishButton#TranslateFromEnglishButton'],
        },
      },
    },
    {
      name: 'portraitHeroImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Portrait Hero Image',
      required: true,
    },
    {
      name: 'mobileHeroImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Mobile Hero Image',
      required: true,
    },
    {
      name: 'buttons',
      type: 'array',
      label: 'Hero Buttons',
      minRows: 0,
      maxRows: 2,
      fields: [
        {
          name: 'label',
          type: 'text',
          localized: true,
          required: true,
          admin: {
            components: {
              afterInput: [
                '/components/admin/TranslateFromEnglishButton#TranslateFromEnglishButton',
              ],
            },
          },
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
        {
          name: 'variant',
          type: 'select',
          defaultValue: 'primary',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
          ],
          required: true,
        },
      ],
    },
  ],
}
