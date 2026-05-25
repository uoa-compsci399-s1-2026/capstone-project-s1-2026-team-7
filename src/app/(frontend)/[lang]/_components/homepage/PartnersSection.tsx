'use client'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import AutoScroll from 'embla-carousel-auto-scroll'
import type { PartnersBlockDTO } from '@/features/homepage/home.schema'

type PartnersSectionProps = {
  data: PartnersBlockDTO
}

export const PartnersSection = ({ data }: PartnersSectionProps) => {
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
        <h2 className="text-2xl font-bold text-[#05083f] sm:text-3xl md:text-4xl lg:text-5xl">
          Industry Partners
        </h2>

        <p className="mx-auto mt-4 max-w-5xl text-sm leading-relaxed text-black md:text-lg lg:text-xl xl:text-2xl">
          For 25 years, we have successfully partnered with food, pharmaceutical, and pharmaceutical
          industries, spearheading studies on new therapeutics, cardiovascular and metabolic health,
          and the impact of diverse food components.
        </p>

        {data.partners.length > 0 && (
          <div className="mt-12 overflow-hidden" ref={emblaRef}>
            <div className="flex items-center">
              {data.partners.map((partner, index) => {
                if (!partner.logo.url) return null

                return (
                  <div
                    key={partner.id || `${partner.alt}-${index}`}
                    className="flex h-32 min-w-0 shrink-0 basis-1/2 items-center justify-center px-2 sm:basis-1/3 md:basis-1/3 lg:basis-1/4"
                  >
                    <Image
                      src={partner.logo.url}
                      alt={partner.alt || 'Partner logo'}
                      width={300}
                      height={150}
                      className="max-h-34 w-auto object-contain"
                    />
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
