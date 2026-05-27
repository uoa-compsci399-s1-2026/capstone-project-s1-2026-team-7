import type { CollectionConfig } from 'payload'
export const Research: CollectionConfig = {
  slug: 'research',
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    {
      name: 'doi',
      type: 'text',
      admin: { description: 'Optional. Used as the preferred stable identifier for CSV imports.' },
    },
    {
      name: 'link',
      label: 'link',
      type: 'text',
      admin: { description: 'Optional. Used with title and date as a fallback CSV import match.' },
    },
    { name: 'image', label: 'image', type: 'upload', relationTo: 'media' },
    { name: 'date', label: 'Date Uploaded', type: 'text' },
    {
      name: 'staff',
      type: 'relationship',
      relationTo: 'staff',
      hasMany: true,
      required: false,
      admin: { description: 'Select related staff members' },
    },
    { name: 'categories', type: 'relationship', relationTo: 'research-categories', hasMany: true },
    {
      name: 'csvDeleted',
      label: 'Deleted from CSV',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description:
          'Keeps CSV deletions persistent by hiding this record and excluding it from future ORCID CSV exports.',
      },
    },
    {
      name: 'csvDeletedAt',
      label: 'CSV deleted at',
      type: 'date',
      admin: {
        position: 'sidebar',
        readOnly: true,
        condition: (_, siblingData) => Boolean(siblingData?.csvDeleted),
      },
    },
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
