import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  fields: [
    {
      name: 'uoaLogo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'hnuLogo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'exploreLinks',
      type: 'array',
      label: 'Explore Links',
      labels: {
        singular: 'Explore Link',
        plural: 'Explore Links',
      },
      minRows: 0,
      maxRows: 10,
      fields: [
        {
          name: 'footerTitle',
          type: 'text',
          label: 'Footer Title',
          required: true,
          localized: true,
          admin: {
            components: {
              afterInput: [
                '/payload/components/admin/TranslateFromEnglishButton#TranslateFromEnglishButton',
              ],
            },
          },
        },
        {
          name: 'footerURL',
          type: 'text',
          label: 'Footer URL',
          required: true,
        },
      ],
    },
    {
      name: 'supportLinks',
      type: 'array',
      label: 'Support Links',
      labels: {
        singular: 'Support Link',
        plural: 'Support Links',
      },
      minRows: 0,
      maxRows: 10,
      fields: [
        {
          name: 'footerTitle',
          type: 'text',
          label: 'Footer Title',
          required: true,
          localized: true,
          admin: {
            components: {
              afterInput: [
                '/payload/components/admin/TranslateFromEnglishButton#TranslateFromEnglishButton',
              ],
            },
          },
        },
        {
          name: 'footerURL',
          type: 'text',
          label: 'Footer URL',
          required: true,
        },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Links',
      labels: {
        singular: 'Social Link',
        plural: 'Social Links',
      },
      minRows: 0,
      maxRows: 4,
      fields: [
        {
          name: 'footerLogo',
          type: 'upload',
          label: 'Footer Logo',
          required: true,
          relationTo: 'media',
        },
        {
          name: 'footerURL',
          type: 'text',
          label: 'Footer URL',
          required: true,
        },
      ],
    },
    {
      name: 'legalLinks',
      type: 'array',
      label: 'Legal Links',
      labels: {
        singular: 'Legal Link',
        plural: 'Legal Links',
      },
      minRows: 0,
      maxRows: 10,
      fields: [
        {
          name: 'footerTitle',
          type: 'text',
          label: 'Footer Title',
          required: true,
          localized: true,
          admin: {
            components: {
              afterInput: [
                '/payload/components/admin/TranslateFromEnglishButton#TranslateFromEnglishButton',
              ],
            },
          },
        },
        {
          name: 'footerURL',
          type: 'text',
          label: 'Footer URL',
          required: true,
        },
      ],
    },
    {
      name: 'footerMotif',
      type: 'upload',
      label: 'Footer Motif',
      relationTo: 'media',
      required: true,
    },
  ],
}
