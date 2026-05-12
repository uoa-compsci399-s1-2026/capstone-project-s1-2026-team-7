import Image from 'next/image'
import React from 'react'

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

function WhatWeDoSection() {
  return (
    <section className="w-full bg-white px-[26px] py-10 md:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-[1150px]">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-[22px] leading-tight font-extrabold text-[#08084f] sm:text-2xl md:text-[28px] lg:text-[32px] xl:text-4xl">
            What We Do
          </h2>

          <div className="mt-3 h-[3px] w-14 rounded-full bg-[#08084f] sm:w-18 md:h-1 md:w-20" />
        </div>

        <div className="grid grid-cols-1 gap-[10px] sm:grid-cols-[2fr_1fr] sm:items-start sm:gap-6 md:gap-8 lg:gap-10">
          <div className="divide-y divide-gray-200">
            {whatWeDoItems.map((item) => (
              <div
                key={item.title}
                className="grid grid-cols-[95px_1fr] gap-3 py-8 sm:grid-cols-[105px_1fr] sm:gap-4 sm:py-9 md:grid-cols-[140px_1fr] md:gap-5 lg:grid-cols-[170px_1fr] lg:gap-6 lg:py-11"
              >
                <h3 className="text-[15px] leading-tight font-bold text-[#1f2bd4] sm:text-base md:text-lg lg:text-xl xl:text-2xl">
                  {item.title}
                </h3>

                <ul className="list-disc space-y-1 pl-4 text-[9px] leading-snug text-[#08084f] sm:text-[9.5px] md:text-[10.5px] lg:text-xs xl:text-[13px]">
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex justify-center sm:justify-end">
            <div className="relative aspect-[292/162] w-full overflow-hidden rounded-[20px] sm:aspect-[393/571]">
              <Image
                src="/what-we-do.png"
                alt="Nutrition researcher working with a participant"
                fill
                sizes="(max-width: 640px) calc(100vw - 52px), 33vw"
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
