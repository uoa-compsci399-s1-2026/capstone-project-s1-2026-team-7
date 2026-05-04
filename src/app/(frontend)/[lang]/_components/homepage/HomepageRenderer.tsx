import { HomepageBlockDTO } from '@/validation/homepage/home.schema'
import HeroSection from './HeroSection'
import { ResearchSection } from './ResearchSection'
import { PartnersSection } from './PartnersSection'
import CardSection from './CardSection'
import InfoSection from './InfoSection'
import StatsSection from './StatsSection'
import TimelineSection from './TimelineSection'
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

          default:
            return null
        }
      })}
    </>
  )
}
