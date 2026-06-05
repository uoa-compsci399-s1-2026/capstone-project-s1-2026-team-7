import React from 'react'
import { Microscope, Bed, Building2, Heart } from 'lucide-react'

type SupportSectionProps = {
  heading: string
}

export default function SupportSection({ heading }: SupportSectionProps) {
  const items = [
    {
      title: 'Advancing Research',
      description:
        'Fund innovative studies that explore how food and nutrition impact metabolism, health, and disease',
      icon: <Microscope size={28} />,
    },
    {
      title: 'Training Future Leaders',
      description:
        'Support postgraduate students and early career researchers to become tomorrow’s experts in nutrition science',
      icon: <Bed size={28} />,
    },
    {
      title: 'Maintaining Facilities',
      description:
        'Ensure our unique residential trial facility and specialist labs remain at the forefront of global standards',
      icon: <Building2 size={28} />,
    },
    {
      title: 'Improving Health Outcomes',
      description:
        'Drive discoveries that translate into better dietary guidelines, health policies, and wellbeing for communities',
      icon: <Heart size={28} />,
    },
  ]

  return (
    <div>
      <section className="w-full px-6 py-12 md:py-16 xl:py-20">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold text-[#14144B] md:text-4xl xl:text-4xl">{heading}</h2>

          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[#14144B]" />

          <div className="mt-10 grid grid-cols-1 overflow-hidden rounded-lg border border-gray-300 md:grid-cols-2 xl:mt-16 xl:grid-cols-4 xl:border-0">
            {items.map((item, index) => (
              <div
                key={index}
                className="
            flex flex-col items-center
            p-6 md:p-8
            text-center
            border-b border-gray-300
            md:border-r md:border-b
            xl:border-r xl:border-b-0
            last:border-b-0
            xl:last:border-r-0
          "
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gray-300 md:h-18 md:w-18 xl:h-20 xl:w-20">
                  {item.icon}
                </div>

                <h3 className="text-base font-semibold text-black md:text-lg">{item.title}</h3>

                <p className="mt-3 text-sm leading-relaxed text-black">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
