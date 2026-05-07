import Image from 'next/image'
import MainButton from '../MainButton'
import type { HeroBlockDTO } from '@/validation/homepage/home.schema'

type HeroSectionProps = {
  data: HeroBlockDTO
}

export default function HeroSection({ data }: HeroSectionProps) {
  const { title, description, heroHorizontal } = data

  return (
    <section className="relative isolate min-h-[560px] w-full overflow-hidden bg-[linear-gradient(180deg,#3636B7_0%,#3434B0_0.01%,#272785_13.16%,#181851_74.52%)] md:min-h-[520px] lg:min-h-[540px]">
      {/* Background image from CMS */}
      {heroHorizontal.url && (
        <Image
          src={heroHorizontal.url}
          alt={heroHorizontal.alt || 'Hero background image'}
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover object-center opacity-[0.75] mix-blend-multiply"
        />
      )}

      {/* Content */}
      <div className="relative z-10 mx-auto grid min-h-[560px] max-w-7xl grid-cols-1 items-center justify-items-center gap-10 px-6 py-16 md:min-h-[520px] md:grid-cols-2 md:justify-items-stretch md:px-12 lg:min-h-[692px] lg:gap-12 lg:px-16 xl:px-20">
        {/* Text */}
        <div className="w-full max-w-xl text-center md:text-left">
          <h1 className="text-xl leading-tight font-bold text-white sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl px-6">
            {title}
          </h1>

          <p className="mt-5 text-base leading-relaxed text-white sm:text-lg md:text-lg lg:text-xl px-6">
            {description}
          </p>

          <div className="mt-8 flex flex-wrap  justify-center gap-3 md:justify-start [&_button]:border-3 [&_button]:px-4 [&_button]:py-2 px-6">
            <MainButton title="Read more" variant="primary" />
            <MainButton title="Participate in a Study" variant="secondary" />
          </div>
        </div>

        {/* Portrait image - hidden below md */}
        <div className="hidden w-full md:flex md:justify-center">
          <div className="relative w-full max-w-[320px] lg:max-w-[360px] xl:max-w-[400px]">
            {/* Blue offset block */}
            <div className="absolute -top-2 -left-2 h-full w-full rounded-3xl bg-[#1F2BD4]" />

            <div className="relative aspect-[6/7] overflow-hidden rounded-3xl shadow-2xl">
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
