'use client'

import { Microscope, Handshake, UsersRound, type LucideIcon } from 'lucide-react'

export type CollaborativeApproachProps = {
  items: {
    title: string
    description: string
  }[]
}

function getIcon(title: string): LucideIcon {
  const t = title.toLowerCase()
  if (t.includes('community')) return UsersRound
  if (t.includes('research')) return Microscope
  if (t.includes('community')) return UsersRound
  return Handshake
}

export default function CollaborativeApproach({ items }: CollaborativeApproachProps) {
  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-[#003366] text-center">
          Our Collaborative Approach
        </h2>

        <div className="mt-12 grid md:grid-cols-3 gap-10">
          {items.map((item, index) => {
            const Icon = getIcon(item.title)
            return (
              <div
                key={index}
                className="bg-[#F5F9FF] p-8 rounded-xl shadow-sm border border-gray-100"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-6 mx-auto">
                  <Icon className="w-6 h-6 text-[#003366]" />
                </div>

                <h3 className="text-xl font-semibold text-[#003366] text-center">{item.title}</h3>

                <p className="mt-4 text-gray-700 text-center leading-relaxed">{item.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
