import type { CollectionConfig } from 'payload'

export const Staff: CollectionConfig = {
  slug: 'staff',

  admin: {
    useAsTitle: 'firstname',
  },

  fields: [
    { name: 'firstname', type: 'text', required: true },
    { name: 'lastname', type: 'text', required: true },
    { name: 'orcid', type: 'text' },
    { name: 'jobTitle', type: 'text', required: true },
    { name: 'intro', type: 'textarea' },
    { name: 'manager', type: 'checkbox', defaultValue: false, required: true },
    { name: 'uoaProfileLink', type: 'text' },
    { name: 'email', type: 'text' },
    { name: 'photo', type: 'upload', relationTo: 'media' },
    { name: 'sortOrder', type: 'number' },
  ],
}
