'use client'

import Image from 'next/image'
import clsx from 'clsx'
import useEmblaCarousel from 'embla-carousel-react'
import AutoScroll from 'embla-carousel-auto-scroll'
import type { PartnersBlockDTO } from '@/features/homepage/home.schema'
import { useInView } from '@/app/(frontend)/[lang]/_components/useInView'

type PartnersSectionProps = {
  data: PartnersBlockDTO
}

const FADE_BASE = 'transition-all duration-700 ease-out will-change-[opacity,transform]'
const FADE_HIDDEN = 'opacity-0 translate-y-6'
const FADE_SHOWN = 'opacity-100 translate-y-0'

export const PartnersSection = ({ data }: PartnersSectionProps) => {
  const partners = data.partners.filter((partner) => partner.logo.url)
  const scrollingPartners = [...partners, ...partners]

  const { ref, inView } = useInView<HTMLElement>()

  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      dragFree: true,
    },
    [
      AutoScroll({
        speed: 1,
        stopOnInteraction: false,
        stopOnMouseEnter: false,
      }),
    ],
  )

  if (partners.length === 0) return null

  return (
    <section ref={ref} className="w-full bg-white py-16">
      <div className="mx-auto w-[84%] max-w-300 text-center">
        <h2
          className={clsx(
            FADE_BASE,
            inView ? FADE_SHOWN : FADE_HIDDEN,
            'text-lg leading-tight font-extrabold text-[#05083f] sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl',
          )}
        >
          Industry Partners
        </h2>

        <div
          className={clsx(
            FADE_BASE,
            inView ? FADE_SHOWN : FADE_HIDDEN,
            inView && 'delay-100',
            'mx-auto mt-3 h-0.75 w-16 rounded-full bg-[#08084f] sm:w-18 md:mt-4 md:h-1 md:w-20 lg:w-22 xl:w-24',
          )}
        />

        <p
          className={clsx(
            FADE_BASE,
            inView ? FADE_SHOWN : FADE_HIDDEN,
            inView && 'delay-200',
            'mx-auto mt-5 max-w-5xl text-xs leading-relaxed font-normal text-[#08084f]/70 sm:text-xs md:mt-6 md:text-sm lg:text-base xl:text-lg',
          )}
        >
          For 25 years, we have successfully partnered with food, pharmaceutical, and pharmaceutical
          industries, spearheading studies on new therapeutics, cardiovascular and metabolic health,
          and the impact of diverse food components.
        </p>

        <div
          className={clsx(
            FADE_BASE,
            inView ? FADE_SHOWN : FADE_HIDDEN,
            inView && 'delay-300',
            'mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] sm:mt-12',
          )}
          ref={emblaRef}
        >
          <div className="flex items-center">
            {scrollingPartners.map((partner, index) => (
              <div
                key={`${partner.id || partner.alt}-${index}`}
                className="flex h-20 min-w-0 shrink-0 basis-1/2 items-center justify-center px-4 sm:h-24 sm:basis-1/3 md:h-28 md:basis-1/4 lg:h-32 lg:basis-1/5 xl:h-36"
              >
                <Image
                  src={partner.logo.url}
                  alt={partner.alt || 'Partner logo'}
                  width={300}
                  height={150}
                  className="h-auto max-h-14 w-auto max-w-full object-contain sm:max-h-16 md:max-h-18 lg:max-h-20 xl:max-h-24"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
