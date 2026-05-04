import type { GlobalConfig } from 'payload'

import { HeroBlock } from '../blocks/home/HeroBlock'
import { StudiesBlock } from '../blocks/home/StudiesBook'
import { AboutBlock } from '../blocks/home/AboutBlock'
import { PartnersBlock } from '../blocks/home/PartnersBlock'

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
      blocks: [HeroBlock, StudiesBlock, AboutBlock, PartnersBlock],
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
