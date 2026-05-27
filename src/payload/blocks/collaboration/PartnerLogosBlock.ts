import { Block } from 'payload'

export const PartnerLogosBlock: Block = {
  slug: 'partnerLogos',
  labels: {
    singular: 'Partner Logo',
    plural: 'Partner Logos',
  },
  fields: [
    {
      name: 'logos',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
