import type { GlobalConfig } from 'payload'

import { HeroBlock } from '../blocks/home/HeroBlock'
import { ResearchBlock } from '../blocks/home/ResearchBlock'
import { PartnersBlock } from '../blocks/home/PartnersBlock'

import { CardBlock } from '../blocks/home/CardBlock'
import { InfoBlock } from '../blocks/home/InfoBlock'
import { StatsBlock } from '../blocks/home/StatsBlock'
import { TimelineBlock } from '../blocks/home/TimelineBlock'

import { WhoWeAreBlock } from '../blocks/home/WhoWeAreBlock'
import { WhatWeDoBlock } from '../blocks/home/WhatWeDoBlock'
import { DonationSectionBlock } from '../blocks/home/DonationSectionBlock'
import { CurrentStudiesBlock } from '../blocks/home/CurrentStudiesBlock'
import { VideoBlock } from '../blocks/home/VideoBlock'

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
        WhoWeAreBlock,
        WhatWeDoBlock,
        DonationSectionBlock,
        CurrentStudiesBlock,
        VideoBlock,
      ],
    },
  ],
}
