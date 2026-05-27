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
        <div className="w-full rounded-2xl bg-[#0a0a3d] px-7 py-11">
          <div className="grid grid-cols-1 items-center gap-8 sm:grid-cols-2 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-14">
            {/* Image — below sm: second, sm+: left */}
            <div className="order-2 flex items-center justify-center sm:order-1">
              <div
                className={clsx(
                  FADE_BASE,
                  inView ? FADE_SHOWN : FADE_HIDDEN,
                  inView && 'delay-200',
                  'relative aspect-4/3 w-full max-w-sm overflow-hidden rounded-2xl sm:max-w-md lg:max-w-lg',
                )}
              >
                <Image
                  src={image.url}
                  alt="Researchers working with a participant in the Human Nutrition Unit"
                  fill
                  sizes="(max-width: 639px) 84vw, (max-width: 1023px) 42vw, 520px"
                  className="object-cover object-center"
                />
              </div>
            </div>

            {/* Text — below sm: first, sm+: right */}
            <div className="order-1 flex flex-col justify-center text-left sm:order-2">
              <div className="mx-auto w-full max-w-sm md:max-w-md lg:max-w-lg">
                <h2
                  className={clsx(
                    FADE_BASE,
                    inView ? FADE_SHOWN : FADE_HIDDEN,
                    'text-lg leading-tight font-extrabold text-white sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl',
                  )}
                >
                  {title}
                </h2>

                <div
                  className={clsx(
                    FADE_BASE,
                    inView ? FADE_SHOWN : FADE_HIDDEN,
                    inView && 'delay-100',
                    'mt-4 h-1 w-16 rounded-full bg-white sm:w-18 md:mt-5 md:w-20 lg:w-22 xl:w-24',
                  )}
                />

                <div
                  className={clsx(
                    FADE_BASE,
                    inView ? FADE_SHOWN : FADE_HIDDEN,
                    inView && 'delay-200',
                    'mt-5 space-y-4 text-xs leading-relaxed font-normal text-white/90 sm:text-xs md:mt-6 md:space-y-5 md:text-sm lg:text-base xl:text-lg',
                  )}
                >
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
