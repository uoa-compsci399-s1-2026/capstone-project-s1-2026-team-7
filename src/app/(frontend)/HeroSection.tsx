import React from 'react'
import { Media } from '../../payload-types'
import { HeroData } from './page'

type HeroSectionProp = {
  prop: HeroData
}

export default function HeroSection(props: HeroSectionProp) {
  const data: HeroData = props.prop

  const heroImage =
    data.illustration && typeof data.illustration === 'object' ? (data.illustration as Media) : null

  return (
    <section
      className="relative flex flex-row items-start bg-cover bg-center h-[769px]"
      style={heroImage?.url ? { backgroundImage: `url(${heroImage.url})` } : undefined}
    >
      <div className="absolute bottom-40 left-28 w-[800px]">
        <p className="text-white text-5xl font-semibold leading-tight">
          The Human
          <br />
          Nutrition Unit Research Centre
        </p>

        <p className="text-white text-xl font-normal leading-tight">
          We specialise in short and long-term studies, focusing on nutritional intervention, the
          health benefits of food components, metabolic health, and innovative trial designs.
        </p>

        <div className="flex items-center gap-4">
          <button className="px-4 py-1 rounded-full border-2 border-transparent text-white bg-blue-950">
            Our Studies
          </button>
          <button className="px-4 py-1 rounded-full border-2 border-white text-white">
            About the HNU
          </button>
        </div>
      </div>
    </section>
  )
}
