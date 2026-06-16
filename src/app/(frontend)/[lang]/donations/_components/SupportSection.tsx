import React from 'react'
import { Microscope, Bed, Building2, Heart } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type SupportItem = {
  icon: string
  title: string
  description: string
}

type SupportSectionProps = {
  heading: string
  items: SupportItem[]
}

const iconMap: Record<string, LucideIcon> = {
  microscope: Microscope,
  bed: Bed,
  building: Building2,
  heart: Heart,
}

export default function SupportSection({ heading, items }: SupportSectionProps) {
  return (
    <div>
      <section className="w-full py-10 sm:py-12 md:py-16 lg:py-20">
        <div className="mx-auto w-[84%] max-w-300 text-center">
          <h2 className="text-2xl font-bold text-[#14144B] sm:text-3xl md:text-4xl">{heading}</h2>

          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[#14144B]" />

          <div className="relative mt-10 grid grid-cols-1 gap-y-8 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-0">
            {/* Dotted vertical dividers — no outer box, matching the stats card */}
            <div className="absolute inset-y-6 left-1/2 hidden border-l border-dotted border-gray-300 sm:block lg:hidden" />
            <div className="absolute inset-y-6 left-1/4 hidden border-l border-dotted border-gray-300 lg:block" />
            <div className="absolute inset-y-6 left-1/2 hidden border-l border-dotted border-gray-300 lg:block" />
            <div className="absolute inset-y-6 left-3/4 hidden border-l border-dotted border-gray-300 lg:block" />

            {items.map((item, index) => {
              const Icon = iconMap[item.icon] ?? Microscope

              return (
                <div
                  key={index}
                  className="flex flex-col items-center px-6 py-4 text-center md:px-8"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gray-300 sm:h-16 sm:w-16 md:mb-6 md:h-18 md:w-18 lg:h-20 lg:w-20">
                    <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                  </div>

                  <h3 className="text-base font-semibold text-black md:text-lg">{item.title}</h3>

                  <p className="mt-3 text-sm leading-relaxed text-black md:text-base">
                    {item.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
