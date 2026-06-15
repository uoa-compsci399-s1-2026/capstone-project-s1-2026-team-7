import type { CollectionConfig } from 'payload'

export const ResearchExclusions: CollectionConfig = {
  slug: 'research-exclusions',
  labels: {
    singular: 'Excluded Research',
    plural: 'Excluded Research',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Research',
    defaultColumns: ['title', 'doi', 'source', 'active', 'excludedAt', 'restoredAt'],
    description:
      'ORCID/CSV research records that should be excluded from future automated exports/imports. Use Restore to Research to add an item back into the active Research collection.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description:
          'Title of the removed research record. Used for fallback matching when no DOI is available.',
      },
    },
    {
      name: 'doi',
      label: 'DOI',
      type: 'text',
      admin: {
        description: 'Display DOI from the removed research record.',
      },
    },
    {
      name: 'normalizedDoi',
      label: 'Normalized DOI',
      type: 'text',
      index: true,
      admin: {
        readOnly: true,
        description: 'Lowercase DOI used by the ORCID/CSV sync to recognise excluded records.',
      },
    },
    {
      name: 'link',
      label: 'URL',
      type: 'text',
    },
    {
      name: 'publicationDate',
      label: 'Publication Date',
      type: 'text',
    },
    {
      name: 'fallbackKey',
      label: 'Fallback Key',
      type: 'text',
      index: true,
      admin: {
        readOnly: true,
        description:
          'Generated from title, URL, and publication date. Used only when there is no DOI.',
      },
    },
    {
      name: 'source',
      type: 'select',
      defaultValue: 'manual-exclusion',
      options: [
        { label: 'Manual exclusion button', value: 'manual-exclusion' },
        { label: 'Missing from imported CSV', value: 'missing-from-csv' },
        { label: 'Migrated legacy CSV deletion', value: 'legacy-csv-deleted' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description:
          'When active, matching ORCID/CSV records are skipped. Restoring the record turns this off automatically.',
      },
    },
    {
      name: 'restoreToResearchAction',
      label: 'Restore to Research',
      type: 'ui',
      admin: {
        position: 'sidebar',
        components: {
          Field:
            '/payload/components/admin/RestoreExcludedResearchButton#RestoreExcludedResearchButton',
        },
      },
    },
    {
      name: 'excludedAt',
      type: 'date',
      defaultValue: () => new Date().toISOString(),
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'removedResearchId',
      label: 'Removed Research ID',
      type: 'text',
      admin: {
        readOnly: true,
        description:
          'The old Research collection ID. This is stored as text because the active research record may have been deleted.',
      },
    },
    {
      name: 'restoredResearchId',
      label: 'Restored Research ID',
      type: 'text',
      admin: {
        readOnly: true,
        description:
          'The active Research record ID created or found when this exclusion was restored.',
      },
    },
    {
      name: 'restoredAt',
      label: 'Restored At',
      type: 'date',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'timesSeen',
      label: 'Times Seen During Sync',
      type: 'number',
      defaultValue: 1,
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'reason',
      type: 'textarea',
      admin: {
        description: 'Optional admin note explaining why this research record was excluded.',
      },
    },
  ],
}
