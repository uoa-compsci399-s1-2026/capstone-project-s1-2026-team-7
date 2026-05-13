import type { Block } from 'payload'

export const TimelineBlock: Block = {
  slug: 'timeline',
  interfaceName: 'TimelineBlock',
  labels: {
    singular: 'Timeline Section',
    plural: 'Timeline Sections',
  },
  admin: {
    group: 'Static Components',
    disableBlockName: true,
  },
  fields: [],
}
