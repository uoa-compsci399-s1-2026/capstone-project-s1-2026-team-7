import Image from 'next/image'
import { heroDTO } from '@/dto/homepagedto'
import mobile_hero from '../../../public/mobile_hero.png'
import MainButton from './MainButton'
type HeroSectionProp = {
  prop: heroDTO
}

export default function HeroSection({ prop }: HeroSectionProp) {
  const { title, description, illustration, button1, button2 } = prop

  return (
    <section className="relative w-full overflow-hidden h-128.5 md:h-126.75 xl:h-175">
      {/* Mobile image — below 450px */}
      <div className="absolute inset-0 block min-[450px]:hidden">
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
      <div className="absolute inset-0 hidden min-[450px]:block">
        {illustration?.url && (
          <Image
            src={illustration.url}
            alt={illustration.alt || 'Hero image'}
            fill
            priority
            quality={100}
            sizes="(min-width: 449px) 100vw, 0vw"
            className="object-cover object-top"
          />
        )}
      </div>

      {/* Overlay */}
      <div className=" absolute inset-0 flex items-end justify-center px-4 pb-15 min-[450px]:pb-30 text-center sm:pb-20 lg:pb-18 xl:pb-30 text-pretty">
        <div className="flex flex-col items-center gap-3 md:gap-3 lg:gap-4">
          <h1 className="text-xl font-medium lg:font-semi-bold xl:font-bold text-white sm:text-3xl lg:text-5xl">
            {title}
          </h1>

          <p className=" max-w-md text-xs text-white sm:max-w-xl md:max-w-xl sm:text-lg md:text-xl xl:text-2xl lg:max-w-2xl ">
            {description}
          </p>

          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            <MainButton title={button1.label} variant={button1.variant} />

            <MainButton title={button2.label} variant={button2.variant} />
          </div>
        </div>
      </div>
    </section>
  )
}
