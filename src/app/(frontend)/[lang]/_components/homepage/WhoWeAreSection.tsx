'use client'

import Image from 'next/image'
import clsx from 'clsx'
import { WhoWeAreBlockDTO } from '@/features/homepage'
import { useInView } from '@/app/(frontend)/[lang]/_components/useInView'

type WhoWeAreBlockProps = {
  data: WhoWeAreBlockDTO
}

const FADE_BASE = 'transition-all duration-700 ease-out will-change-[opacity,transform]'
const FADE_HIDDEN = 'opacity-0 translate-y-6'
const FADE_SHOWN = 'opacity-100 translate-y-0'

export default function WhoWeAreSection({ data }: WhoWeAreBlockProps) {
  const { title, description, image } = data
  const { ref, inView } = useInView<HTMLElement>()

  return (
    <section ref={ref} id="who-we-are" className="w-full bg-white py-16">
      <div className="mx-auto w-[84%] max-w-300">
        {/* Whole blue section fades in as one unit */}
        <div
          className={clsx(
            FADE_BASE,
            inView ? FADE_SHOWN : FADE_HIDDEN,
            'w-full rounded-2xl bg-[#0a0a3d] px-7 py-11 md:px-10 md:py-14 lg:px-14 lg:py-16',
          )}
        >
          {/* items-center: image and text each sized independently, vertically centered.
              Single column (image below text) until md, side-by-side at md+. */}
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-10 lg:gap-12 xl:gap-14">
            {/* Image — below md: second (under text), same width as text box.
                md+: left column, capped, independent of text length. */}
            <div className="order-2 flex justify-center md:order-1 md:justify-start">
              <div className="mx-auto w-full max-w-md md:mx-0 md:max-w-lg lg:max-w-xl">
                <div className="relative aspect-4/3 h-full w-full overflow-hidden rounded-2xl md:max-h-96">
                  <Image
                    src={image.url}
                    alt="Researchers working with a participant in the Human Nutrition Unit"
                    fill
                    sizes="(max-width: 639px) 84vw, (max-width: 1023px) 42vw, 520px"
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </div>

            {/* Text — below md: first, md+: right */}
            <div className="order-1 flex flex-col justify-start text-left md:order-2">
              <div className="mx-auto w-full max-w-md md:max-w-lg lg:max-w-xl">
                <h2 className="text-base leading-tight font-extrabold text-white sm:text-lg md:text-xl lg:text-2xl xl:text-[32px]">
                  {title}
                </h2>

                <div className="mt-4 h-1 w-16 rounded-full bg-white sm:w-18 md:mt-5 md:w-20 lg:w-22 xl:w-24" />

                <div className="mt-5 space-y-4 text-xs leading-relaxed font-normal text-white/90 md:mt-6 md:space-y-5 lg:text-sm xl:text-base">
                  <p>{description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
