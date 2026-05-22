import type { GlobalConfig } from 'payload'

export const DonationsPage: GlobalConfig = {
  slug: 'donations-page',
  label: 'Donations Page',
  fields: [
    {
      name: 'title',
      label: 'title',
      type: 'text',
      localized: true,
      required: true,
      defaultValue: 'Donate Here',
    },
    {
      name: 'heroImage',
      label: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    /*{
      name: 'industries',
      label: 'industries',
      type: 'media',
      relationTo: 'staff',
      hasMany: true,
      admin: {
        isSortable: true,
        allowCreate: true,
        allowEdit: true,
      },
    },*/
  ],
}
