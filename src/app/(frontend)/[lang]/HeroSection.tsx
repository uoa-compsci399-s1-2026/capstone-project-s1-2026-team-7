import Image from 'next/image'
import mobile_hero from '../../../../public/mobile_hero.png'
import MainButton from './MainButton'
import { HeroDTO } from '@/validation'

type HeroSectionProp = {
  prop: HeroDTO
}

export default function HeroSection({ prop }: HeroSectionProp) {
  const { title, description, heroHorizontal, buttons } = prop
  const button1 = buttons[0]
  const button2 = buttons[1]

  return (
    <section className="relative h-128.5 w-full md:h-126.75 xl:h-175">
      {/* Mobile image — below 450px */}
      <div className="absolute inset-0 block overflow-hidden min-[450px]:hidden">
        <Image
          src={mobile_hero}
          alt="Mobile hero"
          fill
          priority
          sizes="(max-width: 449px) 100vw, 0vw"
          className="object-cover object-top"
        />
      </div>

      {/* Desktop/tablet image — 450px and above */}
      <div className="absolute inset-0 hidden overflow-hidden min-[450px]:block">
        {heroHorizontal.url && (
          <Image
            src={heroHorizontal.url}
            alt={heroHorizontal.alt || 'Hero image'}
            fill
            priority
            quality={100}
            sizes="(min-width: 450px) 100vw, 0vw"
            className="object-cover object-top"
          />
        )}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 flex items-end justify-center px-4 pb-15 text-center text-pretty min-[450px]:pb-30 sm:pb-20 lg:pb-18 xl:pb-30">
        <div className="flex flex-col items-center gap-3 md:gap-3 lg:gap-4">
          <h1 className="text-xl font-medium text-white sm:text-3xl min-[1024px]:text-4xl xl:text-5xl lg:font-semibold xl:font-bold">
            {title}
          </h1>

          <p className="max-w-md text-xs text-white sm:max-w-xl sm:text-lg md:max-w-xl md:text-xl lg:max-w-2xl xl:text-2xl">
            {description}
          </p>

          <div className="flex flex-wrap justify-center gap-3 max-[449px]:mb-4 md:gap-4 xl:mt-4 [&_button]:border-2 lg:[&_button]:w-[180px]">
            <MainButton title={button1.label} variant={button1.variant} />
            <MainButton title={button2.label} variant={button2.variant} />
          </div>
        </div>
      </div>

      {/* Search bar between Hero and next section */}
      <div className="absolute bottom-0 left-1/2 z-30 w-[85%] max-w-4xl -translate-x-1/2 translate-y-1/2">
        <div className="rounded-md bg-[#e5e5e5] px-3 py-3 shadow-md md:px-5 md:py-4">
          <label className="mb-2 hidden text-xs font-medium text-black md:block">
            Search for a study:
          </label>

          <div className="flex min-w-0 items-center gap-2 md:gap-3">
            <input
              type="text"
              placeholder="Search..."
              className="h-9 min-w-0 flex-1 rounded-full border border-gray-300 bg-white px-3 text-xs outline-none transition-all duration-200 placeholder:text-xs hover:border-gray-400 hover:bg-gray-50 focus:border-[#4f5bff] md:h-10 md:px-4 md:text-sm md:placeholder:text-sm"
            />

            <button className="flex h-9 w-10 shrink-0 items-center justify-center rounded-xl bg-[#4f5bff] text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#3f4af0] hover:shadow-md md:h-10 md:w-12">
              <svg
                className="h-4 w-4 md:h-5 md:w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <circle cx="11" cy="11" r="7" />
                <line x1="16" y1="16" x2="21" y2="21" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
