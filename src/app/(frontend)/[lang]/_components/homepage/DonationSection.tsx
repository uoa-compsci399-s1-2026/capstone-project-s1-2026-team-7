'use client'

import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import clsx from 'clsx'
import { useInView } from '@/app/(frontend)/[lang]/_components/useInView'

const FADE_BASE = 'transition-all duration-700 ease-out will-change-[opacity,transform]'
const FADE_HIDDEN = 'opacity-0 translate-y-6'
const FADE_SHOWN = 'opacity-100 translate-y-0'

function DonationSection() {
  const { ref, inView } = useInView<HTMLElement>()

  return (
    <section ref={ref} className="w-full bg-white py-16">
      <div className="mx-auto w-[84%] max-w-300">
        <div
          className={clsx(
            FADE_BASE,
            inView ? FADE_SHOWN : FADE_HIDDEN,
            'relative aspect-292/250 w-full overflow-hidden rounded-lg bg-[#08084f] px-5 py-5 sm:aspect-800/350 sm:rounded-2xl md:aspect-1150/150 md:px-8 lg:px-16',
          )}
        >
          <Image
            src="/donation-section.png"
            alt="Donation background"
            fill
            priority
            sizes="(max-width: 767px) 84vw, 1200px"
            className="object-cover object-center opacity-[0.45]"
          />

          <div className="absolute inset-0 bg-[#08084f]/45" />

          <div className="relative z-10 flex h-full w-full min-w-0 flex-col items-center justify-center gap-2.5 text-center text-white min-[350px]:gap-5 md:flex-row md:justify-between md:gap-6 md:text-left lg:gap-10">
            <h2
              className={clsx(
                FADE_BASE,
                inView ? FADE_SHOWN : FADE_HIDDEN,
                inView && 'delay-100',
                'min-w-0 max-w-64 text-sm leading-tight font-bold min-[500px]:max-w-72 min-[500px]:text-base md:max-w-64 lg:max-w-80 lg:text-lg xl:text-xl',
              )}
            >
              Support Nutrition Research
            </h2>

            <p
              className={clsx(
                FADE_BASE,
                inView ? FADE_SHOWN : FADE_HIDDEN,
                inView && 'delay-200',
                'min-w-0 max-w-72 text-[9px] leading-snug font-light min-[500px]:max-w-84 min-[500px]:text-xs md:max-w-96 lg:max-w-120 lg:text-sm xl:text-base',
              )}
            >
              Help us advance research and train future nutrition scientists.
            </p>

            <button
              className={clsx(
                FADE_BASE,
                inView ? FADE_SHOWN : FADE_HIDDEN,
                inView && 'delay-300',
                'inline-flex max-w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-[#1F2BD4] px-3 py-1.5 text-[8px] font-medium text-white transition hover:bg-[#1720b8] min-[500px]:px-4 min-[500px]:py-2 min-[500px]:text-[9px] md:px-5 md:text-xs lg:gap-2 lg:px-6 lg:py-2.5 lg:text-sm',
              )}
            >
              Make a Donation
              <ArrowRight className="h-2.5 w-2.5 min-[500px]:h-3 min-[500px]:w-3 md:h-3.5 md:w-3.5 lg:h-4 lg:w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DonationSection
