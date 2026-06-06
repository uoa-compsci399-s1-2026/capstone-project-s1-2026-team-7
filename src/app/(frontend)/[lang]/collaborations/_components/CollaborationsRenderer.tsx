'use client'

import CollabHeroProps from '@/app/(frontend)/[lang]/collaborations/_components/CollabHeroProps'
// CollabHeroProps may export a component with differing TS props shape; cast to any to avoid JSX prop type errors here
const CollabHero = CollabHeroProps
import PartnerLogos from '@/app/(frontend)/[lang]/collaborations/_components/PartnerLogos'
import CollaborationAreas from '@/app/(frontend)/[lang]/collaborations/_components/CollaborationAreas'
import CollaborativeApproach from '@/app/(frontend)/[lang]/collaborations/_components/CollaborativeApproach'
import ResearchEnquiries from '@/app/(frontend)/[lang]/collaborations/_components/ResearchEnquiries'
import { CollaborationsPageBlockDTO } from '@/features/collaboration/collaboration.schema'
import StatsSectionWrapper from './StatsSectionWrapper'

type Props = {
  blocks: CollaborationsPageBlockDTO[]
}

export default function CollaborationsRenderer({ blocks }: Props) {
  return (
    <>
      {blocks?.map((block, index) => {
        switch (block.blockType) {
          case 'collaborationHero':
            return (
              <CollabHero
                key={index}
                title={block.title}
                description={block.description}
                imageUrl={block.image?.url}
                imageAlt={block.image?.alt}
              />
            )

          case 'partnerLogos':
            return <PartnerLogos key={index} logos={block.logos?.map((item) => item.logo)} />

          case 'collaborationAreas':
            return <CollaborationAreas key={index} items={block.items} />

          case 'collaborativeApproach':
            return <CollaborativeApproach key={index} items={block.items} />

          case 'researchEnquiries':
            return (
              <ResearchEnquiries
                key={index}
                heading={block.heading}
                description={block.description}
                buttonLabel={block.buttonLabel}
                buttonUrl={block.buttonUrl}
              />
            )
          case 'statsSection':
            return <StatsSectionWrapper key={index} title={block.title} stats={block.stats} />

          default:
            return null
        }
      })}
    </>
  )
}
