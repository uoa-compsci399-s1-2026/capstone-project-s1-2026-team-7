import { HomepageBlockDTO } from '@/validation/homepage/home.schema'
import HeroSection from './HeroSection'
import { ResearchSection } from './ResearchSection'
import { PartnersSection } from './PartnersSection'
import CardSection from './CardSection'
import InfoSection from './InfoSection'
import StatsSection from './StatsSection'
import TimelineSection from './TimelineSection'
import WhoWeAreSection from './WhoWeAreSection'
import WhatWeDoSection from './WhatWeDoSection'
import DonationSection from './DonationSection'

export default function RenderHomeBlocks({ blocks }: { blocks: HomepageBlockDTO[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        switch (block.blockType) {
          case 'hero':
            return <HeroSection key={block.id || index} data={block} />

          case 'research':
            return <ResearchSection key={block.id || index} />

          case 'partners':
            return <PartnersSection key={block.id || index} data={block} />

          case 'card':
            return <CardSection key={block.id || index} />

          case 'info':
            return <InfoSection key={block.id || index} />

          case 'stats':
            return <StatsSection key={block.id || index} />

          case 'timeline':
            return <TimelineSection key={block.id || index} />

          case 'who-we-are':
            return <WhoWeAreSection key={block.id || index} />

          case 'what-we-do':
            return <WhatWeDoSection key={block.id || index} />

          case 'donation-section':
            return <DonationSection key={block.id || index} />

          default:
            return null
        }
      })}
    </>
  )
}
