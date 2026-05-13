import type { Block } from 'payload'

export const CurrentStudiesBlock: Block = {
  slug: 'current-studies',
  interfaceName: 'CurrentStudiesBlock',
  labels: {
    singular: 'Current Studies Section',
    plural: 'Current Studies Sections',
  },
  admin: {
    group: 'Static Components',
    disableBlockName: true,
  },
  fields: [],
}
