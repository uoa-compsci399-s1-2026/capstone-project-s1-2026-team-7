import React from 'react'

type ResearchHeroProps = {
  title: string
  backgroundImage: string
}

export default function ResearchHero({ title, backgroundImage }: ResearchHeroProps) {
  return (
    <section
      className="relative w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white">{title}</h1>
      </div>
    </section>
  )
}
