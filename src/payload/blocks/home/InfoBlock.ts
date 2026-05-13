import type { Block } from 'payload'

export const InfoBlock: Block = {
  slug: 'info',
  interfaceName: 'InfoBlock',
  labels: {
    singular: 'Info Section',
    plural: 'Info Sections',
  },
  admin: {
    group: 'Static Components',
    disableBlockName: true,
  },
  fields: [],
}
