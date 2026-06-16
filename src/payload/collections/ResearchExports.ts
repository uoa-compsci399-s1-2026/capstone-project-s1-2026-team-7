import type { CollectionConfig } from 'payload'

export const ResearchExports: CollectionConfig = {
  slug: 'research-exports',
  admin: {
    useAsTitle: 'filename',
    group: 'Research',
    defaultColumns: ['filename', 'status', 'rowCount', 'requestedAt', 'completedAt'],
    description:
      'Background research CSV export jobs. Created when an admin clicks Export and processed by the cron worker.',
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  hooks: {
    beforeChange: [
      ({ data, req, operation }) => {
        if (operation === 'create') {
          if (!data.requestedAt) {
            data.requestedAt = new Date().toISOString()
          }
          if (!data.requestedBy && req.user) {
            data.requestedBy = req.user.id
          }
          if (!data.status) {
            data.status = 'pending'
          }
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Processing', value: 'processing' },
        { label: 'Done', value: 'done' },
        { label: 'Failed', value: 'failed' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'requestedBy',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'The CMS user who clicked Export. Auto-filled on create.',
      },
    },
    {
      name: 'requestedAt',
      type: 'date',
      required: true,
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Auto-filled on create.',
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
    {
      name: 'startedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        readOnly: true,
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
    {
      name: 'completedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        readOnly: true,
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
    {
      name: 'filename',
      type: 'text',
      admin: { readOnly: true },
    },
    {
      name: 'rowCount',
      type: 'number',
      admin: { readOnly: true },
    },
    {
      name: 's3Bucket',
      type: 'text',
      admin: { readOnly: true },
    },
    {
      name: 's3Key',
      type: 'text',
      admin: { readOnly: true },
    },
    {
      name: 'errorMessage',
      type: 'textarea',
      admin: {
        readOnly: true,
        description: 'Populated only if the export failed.',
        condition: (_, siblingData) => siblingData?.status === 'failed',
      },
    },
  ],
}
