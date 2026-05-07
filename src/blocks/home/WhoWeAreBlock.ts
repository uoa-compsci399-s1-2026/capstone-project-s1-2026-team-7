import type { Block } from 'payload'

export const WhoWeAreBlock: Block = {
  slug: 'who-we-are',
  interfaceName: 'WhoWeAreBlock',
  labels: {
    singular: 'Who We Are Section',
    plural: 'Who We Are Sections',
  },
  admin: {
    group: 'Static Components',
    disableBlockName: true,
  },
  fields: [],
}
