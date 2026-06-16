import React from 'react'
import Image from 'next/image'
import HrefButton from '../../_components/HrefButton'

type DonationsHeroProps = {
  title: string
  blurb: string
  donobutton: string
  imageUrl: string
  imageAlt: string
  buttonurl: string
  backgroundImageUrl?: string | null
  backgroundImageAlt?: string | null
}

export default function DonationsHero({
  title,
  blurb,
  donobutton,
  imageUrl,
  imageAlt,
  buttonurl,
  backgroundImageUrl,
  backgroundImageAlt,
}: DonationsHeroProps) {
  return (
    <section className="relative isolate min-h-130 w-full overflow-hidden bg-[linear-gradient(180deg,#3636B7_0%,#232375_47.81%,#181851_73.13%,#181851_100%)] md:min-h-145 lg:min-h-160 xl:min-h-182">
      {backgroundImageUrl && (
        <Image
          src={backgroundImageUrl}
          alt={backgroundImageAlt || 'Hero background image'}
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover object-center"
        />
      )}

      <div className="relative z-10 mx-auto flex min-h-130 w-[84%] max-w-300 items-center py-16 md:min-h-145 lg:min-h-160 xl:min-h-182">
        <div className="grid w-full grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-10 lg:gap-12 xl:gap-14">
          <div className="text-center md:text-left">
            <h1 className="text-2xl leading-tight font-bold text-white md:text-3xl lg:text-4xl xl:text-5xl">
              {title}
            </h1>

            <p className="mt-5 text-sm leading-relaxed font-normal text-white md:text-base lg:text-lg xl:text-xl">
              {blurb}
            </p>

            <div className="mt-8 flex justify-center gap-3 md:justify-start">
              <HrefButton title={donobutton} href={buttonurl} variant="secondary" />
            </div>
          </div>

          <div className="hidden md:flex md:justify-end">
            <div className="relative w-full max-w-90 lg:max-w-115 xl:max-w-130">
              <div className="absolute -top-2 -left-2 h-full w-full rounded-3xl bg-[#1F2BD4]" />

              <div className="relative aspect-6/7 overflow-hidden rounded-3xl shadow-2xl">
                <Image
                  src={imageUrl}
                  alt={imageAlt}
                  fill
                  priority
                  quality={100}
                  sizes="(max-width: 767px) 0px, 520px"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
