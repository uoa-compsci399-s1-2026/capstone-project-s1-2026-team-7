import type { GlobalConfig } from 'payload'

export const NavigationBar: GlobalConfig = {
  slug: 'navigation-bar',
  label: 'Navigation Bar',
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
      name: 'navbarLinks',
      type: 'array',
      label: 'Navigation Links',
      labels: {
        singular: 'Navigation Link',
        plural: 'Navigation Links',
      },
      fields: [
        {
          name: 'navTitle',
          type: 'text',
          label: 'Navigation Title',
          required: true,
          localized: true,
        },
        {
          name: 'navURL',
          type: 'text',
          label: 'Navigation URL',
          required: true,
        },
      ],
    },
  ],
}
