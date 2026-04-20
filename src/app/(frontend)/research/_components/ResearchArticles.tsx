'use client'

import { ResearchEntry } from '../_types/types'

type Props = {
  research: ResearchEntry[]
}

export default function ResearchArticles({ research }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {research.map((item) => (
        <div key={item.id} className=" p-4 rounded-md">
          <img src={item.image} alt={item.title} className="w-full h-50 object-cover rounded-2xl" />
          <h3 className="mt-3 font-semibold">{item.title}</h3>
          <p className="text-lg text-gray-400 mt-2">{item.date}</p>
        </div>
      ))}
    </div>
  )
}
