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
    <section
      ref={ref}
      id="who-we-are"
      className="w-full bg-white px-6.5 py-16 md:px-8 md:py-24 lg:px-12"
    >
      <div className="mx-auto w-full max-w-287.5">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[42%_52%] md:gap-[6%]">
          {/* Text - first on mobile, right on desktop */}
          <div className="order-1 text-left md:order-2">
            <div className="w-full md:max-w-none">
              <h2
                className={clsx(
                  FADE_BASE,
                  inView ? FADE_SHOWN : FADE_HIDDEN,
                  'text-[22px] leading-tight font-extrabold text-[#08084f] sm:text-2xl md:text-[28px] lg:text-[32px] xl:text-4xl',
                )}
              >
                {title}
              </h2>

              <div
                className={clsx(
                  FADE_BASE,
                  inView ? FADE_SHOWN : FADE_HIDDEN,
                  'mt-4 h-0.75 w-16 rounded-full bg-[#08084f] sm:w-18 md:h-1 md:w-20 lg:w-22 xl:w-24',
                )}
                style={{ transitionDelay: inView ? '100ms' : '0ms' }}
              />

              <div
                className={clsx(
                  FADE_BASE,
                  inView ? FADE_SHOWN : FADE_HIDDEN,
                  'mt-5 space-y-4 text-xs leading-snug font-normal text-[#08084f] sm:text-sm md:mt-6 md:space-y-5 md:text-base lg:text-lg xl:text-xl',
                )}
                style={{ transitionDelay: inView ? '200ms' : '0ms' }}
              >
                <p>{description}</p>
              </div>
            </div>
          </div>
          <div className="order-2 md:order-1">
            <div
              className={clsx(
                FADE_BASE,
                inView ? FADE_SHOWN : FADE_HIDDEN,
                'relative mx-auto aspect-296/192 w-full overflow-hidden rounded-[10px] min-[500px]:max-w-120 sm:max-w-130 md:mx-0 md:aspect-481/386 md:max-w-none md:rounded-2xl',
              )}
              style={{ transitionDelay: inView ? '200ms' : '0ms' }}
            >
              <Image
                src={image.url}
                alt="Researchers working with a participant in the Human Nutrition Unit"
                fill
                sizes="(max-width: 499px) calc(100vw - 52px), (max-width: 767px) 520px, 42vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
