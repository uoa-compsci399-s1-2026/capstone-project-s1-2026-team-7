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
    <section ref={ref} id="who-we-are" className="w-full bg-white py-16 md:py-24">
      <div className="mx-auto w-full max-w-300 px-6.5 md:px-8 lg:px-12 xl:px-0">
        <div className="w-full rounded-2xl bg-[#0a0a3d] px-7 py-11">
          <div className="grid grid-cols-1 items-center gap-7 md:grid-cols-2 md:gap-x-[4%] xl:gap-x-7">
            {/* Image — single column until md, then left on md+ */}
            <div className="order-2 md:order-1">
              <div
                className={clsx(
                  FADE_BASE,
                  inView ? FADE_SHOWN : FADE_HIDDEN,
                  'relative mx-auto aspect-296/192 w-full overflow-hidden rounded-[10px] min-[500px]:max-w-120 sm:max-w-130 md:mx-0 md:aspect-481/386 md:rounded-2xl',
                )}
                style={{ transitionDelay: inView ? '200ms' : '0ms' }}
              >
                <Image
                  src={image.url}
                  alt="Researchers working with a participant in the Human Nutrition Unit"
                  fill
                  sizes="(max-width: 767px) 520px, 42vw"
                  className="object-cover object-center"
                />
              </div>
            </div>

            {/* Text — single column until md (on top), then right on md+ */}
            <div className="order-1 md:order-2 flex flex-col justify-center text-left">
              <div className="mx-auto w-full max-w-sm">
                <h2
                  className={clsx(
                    FADE_BASE,
                    inView ? FADE_SHOWN : FADE_HIDDEN,
                    'text-xl font-extrabold leading-tight text-white sm:text-2xl md:text-2xl lg:text-3xl xl:text-4xl',
                  )}
                >
                  {title}
                </h2>

                <div
                  className={clsx(
                    FADE_BASE,
                    inView ? FADE_SHOWN : FADE_HIDDEN,
                    'mt-4 h-1 w-16 rounded-full bg-white md:w-20 lg:w-24',
                  )}
                  style={{ transitionDelay: inView ? '100ms' : '0ms' }}
                />

                <div
                  className={clsx(
                    FADE_BASE,
                    inView ? FADE_SHOWN : FADE_HIDDEN,
                    'mt-5 space-y-4 text-xs font-normal leading-relaxed text-white/90 sm:text-xs md:mt-6 md:space-y-5 md:text-sm lg:text-base xl:text-lg',
                  )}
                  style={{ transitionDelay: inView ? '200ms' : '0ms' }}
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
