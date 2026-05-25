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

      {/* Content — text left, image right, sized to fill the width */}
      <div className="relative z-10 mx-auto flex min-h-140 w-full max-w-6xl flex-col items-center justify-center gap-12 px-5 py-16 md:min-h-130 md:flex-row md:justify-center md:gap-16 md:px-8 lg:min-h-135 lg:gap-24 lg:px-12">
        {' '}
        {/* Text */}
        <div className="w-full max-w-md text-center md:max-w-sm md:text-left">
          <h1 className="text-2xl leading-tight font-bold text-white md:text-3xl xl:text-4xl">
            {title}
          </h1>

          <p className="mt-5 text-xs leading-relaxed font-normal sm:text-sm text-white md:text-base lg:text-lg">
            {description}
          </p>

          <div className="mt-8 flex  justify-center gap-3 md:justify-start *:border-3">
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
        {/* Portrait — bigger, hugs the right, hidden below md */}
        <div className="relative hidden w-[360px] shrink-0 md:block lg:w-110 xl:w-120">
          {/* Blue offset block */}
          <div className="absolute -top-2 -left-2 h-full w-full rounded-3xl bg-[#1F2BD4]" />

          <div className="relative aspect-6/7 overflow-hidden rounded-3xl shadow-2xl">
            <Image
              src="/hero-portrait-image.png"
              alt="Hero portrait image"
              fill
              priority
              quality={100}
              sizes="(max-width: 767px) 0px, 480px"
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
