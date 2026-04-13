import type { GlobalConfig } from 'payload'

export const NavigationBar: GlobalConfig = {
  slug: 'navigation-bar',
  label: 'Navigation Bar',
  fields: [
    {
      name: 'Logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo',
      required: true,
    },
    {
      name: 'navbarLinks',
      type: 'group',
      label: 'Navigation Links',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Navigation Title',
        },
      ],
    },
  ],
}
