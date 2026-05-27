import type { GlobalConfig } from 'payload'

import {
  CollaborationHeroBlock,
  PartnerLogosBlock,
  CollaborationAreasBlock,
  CollaborativeApproachBlock,
  ResearchEnquiriesBlock,
} from '../blocks/collaboration'
import { StatsSectionBlock } from '../blocks/collaboration/StatsSectionBlock'

export const CollaborationsPage: GlobalConfig = {
  slug: 'collaborations-page',
  label: 'Collaborations Page',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'layout',
      type: 'blocks',
      required: true,
      blocks: [
        CollaborationHeroBlock,
        PartnerLogosBlock,
        CollaborationAreasBlock,
        CollaborativeApproachBlock,
        ResearchEnquiriesBlock,
        StatsSectionBlock,
      ],
    },
  ],
}
