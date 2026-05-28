'use client'

import Image from 'next/image'
import clsx from 'clsx'
import { WhatWeDoBlockDTO } from '@/features/homepage'
import { useInView } from '@/app/(frontend)/[lang]/_components/useInView'

type WhatWeDoSectionProps = {
  data: WhatWeDoBlockDTO
}

const FADE_BASE = 'transition-all duration-700 ease-out will-change-[opacity,transform]'
const FADE_HIDDEN = 'opacity-0 translate-y-6'
const FADE_SHOWN = 'opacity-100 translate-y-0'

const SECTION_DELAYS = ['delay-200', 'delay-300', 'delay-[400ms]', 'delay-500', 'delay-700']

function WhatWeDoSection({ data }: WhatWeDoSectionProps) {
  const { title, sections } = data
  const { ref, inView } = useInView<HTMLElement>()

  return (
    <section ref={ref} className="w-full bg-white py-16">
      <div className="mx-auto w-[84%] max-w-300">
        <div className="mb-6 sm:mb-7 md:mb-8 lg:mb-9 xl:mb-10">
          <h2
            className={clsx(
              FADE_BASE,
              inView ? FADE_SHOWN : FADE_HIDDEN,
              'text-lg leading-tight font-extrabold text-[#08084f] sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl',
            )}
          >
            {title}
          </h2>

          <div
            className={clsx(
              FADE_BASE,
              inView ? FADE_SHOWN : FADE_HIDDEN,
              inView && 'delay-100',
              'mt-3 h-0.75 w-16 rounded-full bg-[#08084f] sm:w-18 md:mt-4 md:h-1 md:w-20 lg:w-22 xl:w-24',
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-[57fr_43fr] md:items-stretch md:gap-8 lg:grid-cols-[63fr_37fr] lg:gap-10 xl:gap-12">
          <div className="divide-y divide-gray-200 border-b border-gray-200">
            {sections.map((section, idx) => (
              <div
                key={section.heading}
                className={clsx(
                  FADE_BASE,
                  inView ? FADE_SHOWN : FADE_HIDDEN,
                  inView && SECTION_DELAYS[idx % SECTION_DELAYS.length],
                  'grid grid-cols-1 gap-3 py-7 sm:grid-cols-3 sm:gap-4 md:gap-5 lg:gap-6',
                )}
              >
                <h3 className="text-sm leading-tight font-bold text-[#1f2bd4] sm:text-base md:text-lg lg:text-xl xl:text-2xl">
                  {section.heading}
                </h3>

                <ul className="list-disc space-y-1 pl-4 text-xs leading-relaxed font-normal text-[#08084f] sm:col-span-2 sm:text-xs md:text-sm lg:text-base xl:text-lg">
                  {section.items.map((point) => (
                    <li key={point.id}>{point.text}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex justify-center md:h-full md:justify-end">
            <div
              className={clsx(
                FADE_BASE,
                inView ? FADE_SHOWN : FADE_HIDDEN,
                inView && 'delay-200',
                'relative aspect-video w-full overflow-hidden rounded-2xl sm:max-w-xl md:mx-0 md:aspect-auto md:h-full md:max-w-none',
              )}
            >
              <Image
                src="/what-we-do.png"
                alt="Nutrition researcher working with a participant"
                fill
                sizes="(max-width: 767px) 84vw, (max-width: 1023px) 45vw, 36vw"
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
