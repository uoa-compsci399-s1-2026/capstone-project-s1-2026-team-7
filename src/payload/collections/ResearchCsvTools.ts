import type { CollectionConfig } from 'payload'

export const ResearchCsvTools: CollectionConfig = {
  slug: 'research-csv-tools',
  labels: {
    singular: 'Research CSV Tools',
    plural: 'Research CSV Tools',
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => false,
    update: () => false,
    delete: () => false,
  },
  lockDocuments: false,
  admin: {
    description: 'Export ORCID research to CSV and import research CSV files into the CMS.',
    useAsTitle: 'title',
    components: {
      views: {
        list: {
          Component: '/payload/components/admin/ResearchCsvManager#ResearchCsvManager',
        },
      },
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Research CSV Tools',
      admin: {
        hidden: true,
      },
    },
  ],
}
