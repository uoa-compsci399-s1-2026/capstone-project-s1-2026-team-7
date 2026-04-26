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
    <section className="relative w-full h-128.5 md:h-126.75 xl:h-175">
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
            sizes="(min-width: 449px) 100vw, 0vw"
            className="object-cover object-top"
          />
        )}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 flex items-end justify-center px-4 pb-15 min-[450px]:pb-30 text-center sm:pb-20 lg:pb-18 xl:pb-30 text-pretty">
        <div className="flex flex-col items-center gap-3 md:gap-3 lg:gap-4">
          <h1 className="text-xl font-medium text-white sm:text-3xl lg:text-5xl lg:font-semibold xl:font-bold">
            {title}
          </h1>

          <p className="max-w-md text-xs text-white sm:max-w-xl sm:text-lg md:max-w-xl md:text-xl lg:max-w-2xl xl:text-2xl">
            {description}
          </p>

          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            <MainButton title={button1.label} variant={button1.variant} />
            <MainButton title={button2.label} variant={button2.variant} />
          </div>
        </div>
      </div>

      {/* Search bar between Hero and next section */}
      <div className="absolute bottom-0 left-1/2 z-30 w-[85%] max-w-4xl -translate-x-1/2 translate-y-1/2">
        <div className="rounded-md bg-[#e5e5e5] px-5 py-4 shadow-md">
          <label className="mb-2 block text-xs font-medium text-black">Search for a study:</label>

          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search..."
              className="h-10 flex-1 rounded-full border border-gray-300 bg-white px-4 text-sm outline-none"
            />

            <button className="flex h-10 w-12 items-center justify-center rounded-xl bg-[#4f5bff] text-white">
              <svg
                className="h-5 w-5"
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
