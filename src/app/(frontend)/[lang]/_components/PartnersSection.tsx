'use client'

import Image from 'next/image'
import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import AutoScroll from 'embla-carousel-auto-scroll'
import type { PartnersSectionDTO } from '@/validation'

type PartnersSectionProps = {
  partnersSection: PartnersSectionDTO
}

export const PartnersSection = ({ partnersSection }: PartnersSectionProps) => {
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

  return (
    <section className="bg-white px-6 py-20 md:px-12 xl:px-20">
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl  font-bold text-[#05083f] ">
          Industry Partners
        </h2>

        <p className="mx-auto mt-4 max-w-5xl text-sm leading-relaxed text-black md:text-lg lg:text-xl xl:text-2xl">
          For 25 years, we have successfully partnered with food, pharmaceutical, and pharmaceutical
          industries, spearheading studies on new therapeutics, cardiovascular and metabolic health,
          and the impact of diverse food components.
        </p>

        <div className="mt-12 overflow-hidden" ref={emblaRef}>
          <div className="flex items-center">
            {partnersSection.partners.map((partner, index) => (
              <div
                key={`${partner.alt}-${index}`}
                className="flex h-32 min-w-0 shrink-0 basis-1/2 items-center justify-center px-2 sm:basis-1/3 md:basis-1/3 lg:basis-1/4"
              >
                <Image
                  src={partner.logo.url}
                  alt={partner.alt}
                  width={300}
                  height={150}
                  className="max-h-34 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
