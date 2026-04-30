'use client'

import { useState } from 'react'
import ExploreButton from './ExploreButton'
import { exploreContent, type Tab } from './exploreData'

export default function ExploreOur() {
  const [active, setActive] = useState<Tab>('Academic')

  const items: Tab[] = ['Academic', 'Industry', 'Funding']

  return (
    <section className="max-w-screen-lg mx-auto px-4 sm:px-6 md:px-8 py-10">
      <h3 className="text-2xl font-bold mb-6 text-[#0C0C48]">Explore our:</h3>

      <div className="flex flex-row gap-10 bg-[#1f2bd4]/[0.02] p-4 rounded-2xl">
        <div className="flex flex-col gap-4 w-1/3">
          {items.map((item) => (
            <ExploreButton
              key={item}
              label={item}
              active={active === item}
              onClick={() => setActive(item)}
            />
          ))}
        </div>

        <div
          key={active}
          className="
            w-2/3 rounded-2xl p-6
            overflow-hidden transition-all duration-500 ease-in-out
            animate-slideDown
          "
        >
          {exploreContent[active]}
        </div>
      </div>
    </section>
  )
}
