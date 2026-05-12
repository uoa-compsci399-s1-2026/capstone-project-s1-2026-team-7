import type { CollectionConfig } from 'payload'

export const EnquiryTags: CollectionConfig = {
  slug: 'enquiry-tags',
  labels: {
    singular: 'Enquiry Tag',
    plural: 'Enquiry Tags',
  },
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['label', 'recipientEmail'],
    description:
      'Tags shown in the contact form dropdown. Each tag routes submissions to its recipient email.',
  },
  fields: [
    {
      name: 'label',
      label: 'Label (shown to users)',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'recipientEmail',
      label: 'Recipient Email',
      type: 'email',
      required: true,
    },
  ],
}
