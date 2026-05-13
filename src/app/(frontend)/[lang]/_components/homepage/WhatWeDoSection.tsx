import Image from 'next/image'
import React from 'react'
import { WhatWeDoBlockDTO } from '@/features/homepage'

const whatWeDoItems = [
  {
    title: 'Services',
    points: [
      'Consultancy on nutrition regulatory issues, including health claims',
      'Consultancy, design and development of trial protocols',
      'Recruitment and screening of volunteer participants',
      'Trial management and co-ordination',
      'Data collection, analysis and interpretation',
      'Publication or peer reviewed scientific articles',
    ],
  },
  {
    title: 'Facilities',
    points: [
      'Residential accommodation (5 bedrooms)',
      'Full metabolic kitchens & diet control',
      'Indirect calorimetry suites',
      'Appetite Research Unit & dining facilities',
    ],
  },
  {
    title: 'Capabilities',
    points: [
      'Controlled diet provision and control',
      'Energy expenditure measurement (Indirect Calorimetry)',
      'Anthropometry including assessment of body composition',
      'Phlebotomy (including venous cannulation)',
      'Urine and faecal collection',
    ],
  },
]

type WhatWeDoSectionProps = {
  data: WhatWeDoBlockDTO
}

function WhatWeDoSection({ data }: WhatWeDoSectionProps) {
  const { title, blockType, sections } = data
  return (
    <section className="w-full bg-white px-[26px] py-5 md:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-[1120px]">
        <div className="mb-[17px]">
          <h2 className="text-[22px] leading-tight font-extrabold text-[#08084f] sm:text-2xl md:text-[28px] lg:text-[32px] xl:text-4xl">
            {title}
          </h2>

          <div className="mt-3 h-[3px] w-16 rounded-full bg-[#08084f] sm:w-18 md:h-1 md:w-20 lg:w-22 xl:w-24" />
        </div>

        <div className="grid grid-cols-1 gap-[17px] md:grid-cols-[57fr_43fr] md:items-stretch lg:grid-cols-[63fr_37fr]">
          <div className="divide-y divide-gray-200 border-b border-gray-200">
            {sections.map((section) => (
              <div
                key={section.heading}
                className="grid grid-cols-[95px_1fr] gap-3 py-8 sm:grid-cols-[105px_1fr] sm:gap-4 sm:py-9 md:grid-cols-[110px_1fr] md:gap-5 lg:grid-cols-[160px_1fr] lg:gap-6 lg:py-11 xl:grid-cols-[170px_1fr]"
              >
                <h3 className="text-[15px] leading-tight font-bold text-[#1f2bd4] sm:text-base md:text-lg lg:text-xl xl:text-2xl">
                  {section.heading}
                </h3>

                <ul className="list-disc space-y-1 pl-4 text-[9px] leading-snug font-normal text-[#08084f] sm:text-xs lg:text-[16px]">
                  {section.items.map((point) => (
                    <li key={point.id}>{point.text}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex justify-center md:h-full md:justify-end">
            <div className="relative aspect-[292/162] w-full overflow-hidden rounded-[20px] min-[500px]:mx-auto min-[500px]:max-w-[480px] sm:max-w-[520px] md:mx-0 md:aspect-auto md:h-full md:max-w-none">
              <Image
                src="/what-we-do.png"
                alt="Nutrition researcher working with a participant"
                fill
                sizes="(max-width: 499px) calc(100vw - 52px), (max-width: 767px) 520px, (max-width: 1023px) 45vw, 36vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhatWeDoSection
