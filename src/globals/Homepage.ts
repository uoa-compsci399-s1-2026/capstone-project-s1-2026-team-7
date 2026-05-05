import type { GlobalConfig } from 'payload'

import { HeroBlock } from '../blocks/home/HeroBlock'
import { ResearchBlock } from '../blocks/home/ResearchBlock'
import { PartnersBlock } from '../blocks/home/PartnersBlock'

import { CardBlock } from '../blocks/home/CardBlock'
import { InfoBlock } from '../blocks/home/InfoBlock'
import { StatsBlock } from '../blocks/home/StatsBlock'
import { TimelineBlock } from '../blocks/home/TimelineBlock'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Home Page',
  fields: [
    {
      name: 'layout',
      type: 'blocks',
      label: 'Homepage Layout',
      required: true,
      admin: {
        initCollapsed: true,
      },
      blocks: [
        HeroBlock,
        ResearchBlock,
        PartnersBlock,
        CardBlock,
        InfoBlock,
        StatsBlock,
        TimelineBlock,
      ],
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          localized: true,
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          localized: true,
        },
      ],
    },
  ],
}
