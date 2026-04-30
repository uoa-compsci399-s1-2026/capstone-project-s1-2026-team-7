import Image from 'next/image'
import mobile_hero from '@/../public/mobile_hero.png'
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

          <div className="flex flex-wrap justify-center gap-3 max-[449px]:mb-4 md:gap-4 xl:mt-4 [&_button]:border-2 lg:[&_button]:w-45">
            <MainButton title={button1.label} variant={button1.variant} />
            <MainButton title={button2.label} variant={button2.variant} />
          </div>
        </div>
      </div>
    </section>
  )
}
