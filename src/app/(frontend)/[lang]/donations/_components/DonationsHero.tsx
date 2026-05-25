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
    <section className="relative w-full bg-cover bg-center bg-linear-to-b from-[#4671ff] to-[#232375] via-[#3535bb] h-165.25 ">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-12">
        <div className="max-w-xl mt-40">
          <h1 className="text-5xl font-bold text-white leading-tight">{title}</h1>

          <p className="mt-6 text-lg text-gray-200 mb-10">{blurb}</p>

          <HrefButton title={donobutton} href={buttonurl} variant="secondary" />
        </div>

        <div className="bg-blue-[#1F2BD4] p-3 rounded-2xl">
          <Image
            src={imageUrl}
            alt={imageAlt}
            width={75}
            height={75}
            className="rounded-xl w-auto h-75 object-cover"
          />
        </div>
      </div>
    </section>
  )
}
