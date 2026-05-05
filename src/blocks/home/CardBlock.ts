import type { Block } from 'payload'

export const CardBlock: Block = {
  slug: 'card',
  interfaceName: 'CardBlock',
  labels: {
    singular: 'Card Section',
    plural: 'Card Sections',
  },
  admin: {
    group: 'Static Components',
    disableBlockName: true,
  },
  fields: [],
}
