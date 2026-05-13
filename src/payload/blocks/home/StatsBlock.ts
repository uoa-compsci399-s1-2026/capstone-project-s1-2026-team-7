import type { Block } from 'payload'

export const StatsBlock: Block = {
  slug: 'stats',
  interfaceName: 'StatsBlock',
  labels: {
    singular: 'Stats Section',
    plural: 'Stats Sections',
  },
  admin: {
    group: 'Static Components',
    disableBlockName: true,
  },
  fields: [],
}
