import React from 'react'
import Image from 'next/image'
type DonationsHeroProps = {
  title: string
  blurb: string
  donobutton: string
  imageUrl: string
  imageAlt: string
}

export default function DonationsHero({
  title,
  blurb,
  donobutton,
  imageUrl,
  imageAlt,
}: DonationsHeroProps) {
  return (
    <section className="relative w-full bg-cover bg-center bg-linear-to-b from-[#4671ff] to-[#232375] via-[#3535bb] h-165.25 ">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-12">
        <div className="max-w-xl mt-40">
          <h1 className="text-5xl font-bold text-white leading-tight">{title}</h1>

          <p className="mt-6 text-lg text-gray-200">{blurb}</p>

          <button
            className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-medium
          href={button.url}"
          >
            {donobutton}
          </button>
        </div>

        <div className="bg-blue-[#1F2BD4] p-3 rounded-2xl">
          <Image src={imageUrl} alt={imageAlt} className="rounded-xl w-75 h-75 object-cover" />
        </div>
      </div>
    </section>
  )
}
