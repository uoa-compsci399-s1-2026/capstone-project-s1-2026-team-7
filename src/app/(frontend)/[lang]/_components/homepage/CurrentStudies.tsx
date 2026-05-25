import Image from 'next/image'
import HrefButton from '../HrefButton'
import type { HeroBlockDTO } from '@/features/homepage/home.schema'
import { withLang } from '@/lib/withLang'
import type { Lang } from '@/types/lang'

type HeroSectionProps = {
  data: HeroBlockDTO
  lang: Lang
}

export default function HeroSection({ data, lang }: HeroSectionProps) {
  const { title, description, heroHorizontal, buttons } = data

  return (
    <section className="relative isolate min-h-140 w-full overflow-hidden md:min-h-130 lg:min-h-135">
      {/* Background image from CMS */}
      {heroHorizontal.url && (
        <Image
          src={heroHorizontal.url}
          alt={heroHorizontal.alt || 'Hero background image'}
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover object-center"
        />
      )}

      {/* Content */}
      <div className="relative z-10 mx-auto grid min-h-140 w-full max-w-5xl grid-cols-1 items-center justify-items-center gap-10 px-5 py-16 md:min-h-130 md:grid-cols-2 md:justify-items-stretch md:px-8 lg:min-h-173 lg:gap-12 lg:px-12">
        {/* Text */}
        <div className="w-full max-w-xl text-center md:text-left">
          <h1 className="text-xl leading-tight font-bold text-white sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
            {title}
          </h1>

          <p className="mt-5 text-base leading-relaxed font-normal text-white md:text-md lg:text-lg">
            {description}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start [&_button]:border-3 [&_button]:px-4 [&_button]:py-2">
            {buttons.map((button) => (
              <HrefButton
                key={button.id || button.label}
                title={button.label}
                variant={button.variant}
                href={withLang(button.url, lang)}
              />
            ))}
          </div>
        </div>

        {/* Portrait image - hidden below md */}
        <div className="hidden w-full md:flex md:justify-center">
          <div className="relative w-full max-w-[320px] lg:max-w-90 xl:max-w-100">
            {/* Blue offset block */}
            <div className="absolute -top-2 -left-2 h-full w-full rounded-3xl bg-[#1F2BD4]" />

            <div className="relative aspect-6/7 overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src="/hero-portrait-image.png"
                alt="Hero portrait image"
                fill
                priority
                quality={100}
                sizes="(max-width: 767px) 0px, 35vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
