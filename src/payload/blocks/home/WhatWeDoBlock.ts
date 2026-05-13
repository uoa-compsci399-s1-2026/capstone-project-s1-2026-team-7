import type { Block } from 'payload'

export const WhatWeDoBlock: Block = {
  slug: 'what-we-do',
  interfaceName: 'WhatWeDoBlock',
  labels: {
    singular: 'What We Do Section',
    plural: 'What We Do Sections',
  },
  admin: {
    group: 'Static Components',
    disableBlockName: true,
  },
  fields: [],
}
