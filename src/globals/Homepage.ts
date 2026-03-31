import type { GlobalConfig } from 'payload'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Home Page',
  fields: [
    {
      name: 'hero',
      type: 'group',
      label: 'Hero Section',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Hero Title',
          localized: true,
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Hero Description',
          localized: true,
          required: true,
        },
        {
          name: 'illustration',
          type: 'upload',
          relationTo: 'media',
          label: 'Hero Illustration',
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
    },
    {
      name: 'aboutSection',
      type: 'group',
      label: 'About Section',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          label: 'Small Heading',
          localized: true,
        },
        {
          name: 'heading',
          type: 'text',
          label: 'Main Heading',
          localized: true,
          required: true,
        },
        {
          name: 'body',
          type: 'textarea',
          label: 'Body Text',
          localized: true,
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Portrait Image',
          required: true,
        },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          localized: true,
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          localized: true,
        },
      ],
    },
  ],
}
