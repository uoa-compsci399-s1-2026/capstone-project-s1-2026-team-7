'use client'

import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import AutoScroll from 'embla-carousel-auto-scroll'

export type PartnerLogosProps = {
  logos: {
    url: string
    alt?: string
  }[]
}

export default function PartnerLogos({ logos }: PartnerLogosProps) {
  const scrollingLogos = [...logos, ...logos]

  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start', dragFree: true }, [
    AutoScroll({ speed: 1, stopOnInteraction: false, stopOnMouseEnter: false }),
  ])

  if (logos.length === 0) return null

  return (
    <section className="w-full bg-white py-16">
      <div className="mx-auto w-[84%] max-w-300 text-center">
        <h2 className="text-2xl font-semibold text-[#003366] text-center">
          Current Collaborating Partners
        </h2>

        <div
          className="mt-10 overflow-hidden mask-[linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] sm:mt-12"
          ref={emblaRef}
        >
          <div className="flex items-center">
            {scrollingLogos.map((logo, index) => (
              <div
                key={`${logo.url}-${index}`}
                className="flex h-20 min-w-0 shrink-0 basis-1/2 items-center justify-center px-4 sm:h-24 sm:basis-1/3 md:h-28 md:basis-1/4 lg:h-32 lg:basis-1/5 xl:h-36"
              >
                <Image
                  src={logo.url}
                  alt={logo.alt || 'Partner logo'}
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
