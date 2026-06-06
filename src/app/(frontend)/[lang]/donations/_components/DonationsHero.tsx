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
}

export default function DonationsHero({
  title,
  blurb,
  donobutton,
  imageUrl,
  imageAlt,
  buttonurl,
}: DonationsHeroProps) {
  return (
    <section className="relative w-full bg-cover bg-center bg-linear-to-b from-[#4671ff] to-[#232375] via-[#3535bb]  xl:h-165 md:h-165">
      <div className="max-w-6xl mx-auto flex flex-col xl:flex-row items-center justify-between gap-8 xl:gap-12 px-6 xl:px-0">
        <div className="max-w-xl mt-16 xl:mt-40 text-center xl:text-left">
          <h1 className="text-3xl md:text-4xl xl:text-5xl font-bold text-white leading-tight">
            {title}
          </h1>

          <p className="mt-6 text-base xl:text-lg text-gray-200 mb-10">{blurb}</p>

          <HrefButton title={donobutton} href={buttonurl} variant="secondary" />
        </div>

        <div className="p-3 rounded-2xl">
          <Image
            src={imageUrl}
            alt={imageAlt}
            width={75}
            height={75}
            className="rounded-xl h-48 md:h-64 xl:h-75 w-auto object-cover"
          />
        </div>
      </div>
    </section>
  )
}
