import type { Block } from 'payload'

export const DonationSectionBlock: Block = {
  slug: 'donation-section',
  interfaceName: 'DonationSectionBlock',
  labels: {
    singular: 'Donation Section',
    plural: 'Donation Sections',
  },
  admin: {
    group: 'Static Components',
    disableBlockName: true,
  },
  fields: [],
}
