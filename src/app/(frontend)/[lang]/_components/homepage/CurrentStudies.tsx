import Link from 'next/link'
import StudyPreviewCard from './StudyPreviewCard'

const currentStudies = [
  {
    title: 'NZ Synergy',
    slug: 'nz-synergy-study',
    imageUrl: '/nz-synergy.svg',
    imageAlt: 'Participant in a nutrition study room',
  },
  {
    title: 'Food & Beverage',
    slug: 'food-and-beverage',
    imageUrl: '/food-beverage.svg',
    imageAlt: 'Food and beverage study image',
  },
]

export default function CurrentStudies() {
  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#08084f] md:text-2xl">Current Studies</h2>

        <Link
          href="/en/studies"
          className="text-base font-bold text-[#08084f] transition hover:opacity-70 md:text-xl"
        >
          Browse all studies &gt;
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
        {currentStudies.map((study) => (
          <Link key={study.title} href={`en/studies/${study.slug}`}>
            <StudyPreviewCard
              title={study.title}
              imageUrl={study.imageUrl}
              imageAlt={study.imageAlt}
            />
          </Link>
        ))}
      </div>
    </div>
  )
}
