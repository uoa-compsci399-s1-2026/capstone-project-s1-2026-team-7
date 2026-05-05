import type { CollectionConfig } from 'payload'
export const Research: CollectionConfig = {
  slug: 'research',
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'doi', type: 'text', required: true },
    { name: 'link', label: 'Research Link', type: 'text', required: true },
    /*{ name: 'image', label: 'image', type: 'upload', relationTo: 'media' },*/
    { name: 'date', label: 'Date Uploaded', type: 'text' },
    /*{
      name: 'staff',
      type: 'relationship',
      relationTo: 'staff',
      hasMany: true,
      required: false,
      admin: { description: 'Select related staff members' },
    },
    { name: 'categories', type: 'relationship', relationTo: 'research-categories', hasMany: true },*/
    {
      name: 'order',
      type: 'number',
      required: false,
      admin: { position: 'sidebar', description: 'Used for manual sorting (lower comes first)' },
    },
  ],
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'order'] },
  defaultSort: '-createdAt',
}
