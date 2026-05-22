import React from 'react'
import { Microscope, Bed, Building2, Heart } from 'lucide-react'

type SupportSectionProps = {
  heading: string
}

export default function SupportSection({ heading }: SupportSectionProps) {
  const items = [
    {
      title: 'Advance Research',
      description:
        'Fund innovative studies that explore how food and nutrition impact metabolism, health, and disease',
      icon: <Microscope size={28} />,
    },
    {
      title: 'Train Future Leaders',
      description:
        'Support postgraduate students and early career researchers to become tomorrow’s experts in nutrition science',
      icon: <Bed size={28} />,
    },
    {
      title: 'Maintain Facilities',
      description:
        'Ensure our unique residential trial facility and specialist labs remain at the forefront of global standards',
      icon: <Building2 size={28} />,
    },
    {
      title: 'Improve Health Outcomes',
      description:
        'Drive discoveries that translate into better dietary guidelines, health policies, and wellbeing for communities',
      icon: <Heart size={28} />,
    },
  ]

  return (
    <div>
      <section className="w-full py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-[#14144B]">{heading}</h2>

          <div className="w-16 h-1 bg-[#14144B] mx-auto mt-4 rounded-full"></div>

          <div className="mt-16 grid grid-cols-4 rounded-lg overflow-hidden">
            {items.map((item, index) => (
              <div
                key={index}
                className="p-8 flex flex-col items-center text-center border-r border-gray-300 last:border-r-0 md:border-b lg:border-b-0"
              >
                <div className="w-20 h-20 flex items-center justify-center bg-gray-300 rounded-full mb-6">
                  {item.icon}
                </div>

                <h3 className="text-lg font-semibold text-black">{item.title}</h3>

                <p className="mt-3 text-sm text-black leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
