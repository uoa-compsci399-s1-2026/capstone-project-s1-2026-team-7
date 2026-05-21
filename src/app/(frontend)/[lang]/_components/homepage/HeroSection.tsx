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
    <section className="relative isolate w-full overflow-hidden min-h-130 md:min-h-145 lg:min-h-160 xl:min-h-182">
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
      <div className="relative z-10 mx-auto grid min-h-130 w-full max-w-280 grid-cols-1 items-center px-6.5 py-16 md:min-h-145 md:grid-cols-[55%_45%] md:gap-x-[4%] md:px-8 lg:min-h-160 lg:grid-cols-[45%_55%] lg:gap-x-[6%] lg:px-12 xl:min-h-182 xl:gap-x-[4%] xl:px-0">
        {/* Text column */}
        <div className="flex w-full flex-col items-center text-center md:items-start md:text-left xl:items-center xl:text-start">
          <h1
            className="font-bold leading-tight text-white md:max-w-xs lg:max-w-sm
            text-xl
            sm:text-2xl
            md:text-3xl
            lg:text-3xl
            xl:text-4xl"
          >
            {title}
          </h1>

          <p
            className="mt-4 leading-relaxed text-white md:max-w-xs lg:max-w-sm
            text-sm
            md:text-sm
            lg:text-sm
            xl:text-base"
          >
            {description}
          </p>

          <div className="mt-8 flex flex-row items-center justify-center gap-3 md:justify-start md:gap-6 xl:justify-center">
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

        {/* Portrait image — hidden below md */}
        <div className="hidden md:flex md:items-center md:justify-center md:self-stretch">
          <div className="relative w-full max-w-85 lg:max-w-100 xl:max-w-118 aspect-[474/519]">
            {/* Blue offset block */}
            <div className="absolute -top-3 -left-3 h-full w-full rounded-3xl bg-[#1F2BD4]" />

            <div className="relative overflow-hidden rounded-3xl shadow-2xl h-full">
              <Image
                src="/hero-portrait-image.png"
                alt="Hero portrait image"
                fill
                priority
                quality={100}
                sizes="(max-width: 767px) 0px, (max-width: 1279px) 40vw, 474px"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
