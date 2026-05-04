import type { Block } from 'payload'

export const AboutBlock: Block = {
  slug: 'about',
  interfaceName: 'AboutBlock',
  labels: {
    singular: 'About Section',
    plural: 'About Sections',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Main Heading',
      localized: true,
      required: true,
    },
    {
      name: 'body',
      type: 'textarea',
      label: 'Body Text',
      localized: true,
      required: true,
    },
    {
      name: 'portraitImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Portrait Image',
      required: true,
    },
    {
      name: 'mobileImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Mobile Image',
      required: true,
    },
  ],
}
