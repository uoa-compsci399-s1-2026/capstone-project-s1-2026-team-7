import { Block } from 'payload'

export const ResearchEnquiriesBlock: Block = {
  slug: 'researchEnquiries',
  labels: {
    singular: 'Research Enquiry Section',
    plural: 'Research Enquiry Sections',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Research Enquiries',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      defaultValue:
        'For enquiries related to research collaborations or partnership opportunities, please contact our team.',
    },
    {
      name: 'buttonLabel',
      type: 'text',
      required: true,
      defaultValue: 'Contact',
    },
    {
      name: 'buttonUrl',
      type: 'text',
      required: true,
      defaultValue: '/contact',
    },
  ],
}
