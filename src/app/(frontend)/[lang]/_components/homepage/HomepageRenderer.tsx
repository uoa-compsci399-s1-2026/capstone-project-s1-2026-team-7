import { HomepageBlockDTO } from '@/features/homepage/home.schema'
import HeroSection from './HeroSection'
import { PartnersSection } from './PartnersSection'
import CardSection from './CardSection'
import InfoSection from './InfoSection'
import StatsSection from './StatsSection'
import TimelineSection from './TimelineSection'
import WhoWeAreSection from './WhoWeAreSection'
import WhatWeDoSection from './WhatWeDoSection'
import DonationSection from './DonationSection'
import CurrentStudies from './CurrentStudies'

export default function RenderHomeBlocks({ blocks }: { blocks: HomepageBlockDTO[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        switch (block.blockType) {
          case 'hero':
            return <HeroSection key={block.id || index} data={block} />

          case 'partners':
            return <PartnersSection key={block.id || index} data={block} />

          case 'card':
            return <CardSection key={block.id || index} />

          case 'info':
            return <InfoSection key={block.id || index} />

          case 'stats':
            return <StatsSection key={block.id || index} />

          case 'timeline':
            return <TimelineSection key={block.id || index} data={block} />

          case 'who-we-are':
            return <WhoWeAreSection key={block.id || index} data={block} />

          case 'current-studies':
            return <CurrentStudies key={block.id || index} />

          case 'what-we-do':
            return <WhatWeDoSection key={block.id || index} data={block} />

          case 'donation-section':
            return <DonationSection key={block.id || index} />

          default:
            return null
        }
      })}
    </>
  )
}
