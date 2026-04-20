'use client'

import { ResearchEntry } from '../_types/types'

type Props = {
  research: ResearchEntry[]
}

export default function ResearchArticles({ research }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
      {research.map((item) => (
        <a key={item.id} href={item.link} target="_blank">
          <div className=" p-4 rounded-md cursor-pointer transition-transform duration-200 hover:scale-102">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-50 object-cover rounded-2xl"
            />
            <h3 className="mt-3 font-semibold">{item.title}</h3>
            <p className="text-lg text-gray-400 mt-2">{item.date}</p>
          </div>
        </a>
      ))}
    </div>
  )
}
