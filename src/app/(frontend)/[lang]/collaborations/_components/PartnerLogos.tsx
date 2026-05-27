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
  // Split logos evenly into two rows
  const midpoint = Math.ceil(logos.length / 2)
  const row1 = logos.slice(0, midpoint)
  const row2 = logos.slice(midpoint)

  // Duplicate logos for seamless marquee
  const doubledRow1 = [...row1, ...row1]
  const doubledRow2 = [...row2, ...row2]

  const [emblaRef1] = useEmblaCarousel({ loop: true, align: 'start', dragFree: true }, [
    AutoScroll({ speed: 1, stopOnInteraction: false, stopOnMouseEnter: false }),
  ])

  const [emblaRef2] = useEmblaCarousel({ loop: true, align: 'start', dragFree: true }, [
    AutoScroll({ speed: -1, stopOnInteraction: false, stopOnMouseEnter: false }),
  ])

  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-semibold text-[#003366] text-center">Our Partners</h2>

        {/* Row 1 */}
        <div className="mt-10 overflow-hidden" ref={emblaRef1}>
          <div className="flex items-center gap-12">
            {doubledRow1.map((logo, index) => (
              <div key={index} className="relative h-16 w-40 flex-shrink-0">
                <Image
                  src={logo.url}
                  alt={logo.alt || 'Partner logo'}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 — opposite direction */}
        <div className="mt-10 overflow-hidden" ref={emblaRef2}>
          <div className="flex items-center gap-12">
            {doubledRow2.map((logo, index) => (
              <div key={index} className="relative h-16 w-40 flex-shrink-0">
                <Image
                  src={logo.url}
                  alt={logo.alt || 'Partner logo'}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
