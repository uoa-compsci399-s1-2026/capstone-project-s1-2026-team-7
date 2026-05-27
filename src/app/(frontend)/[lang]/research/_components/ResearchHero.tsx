type ResearchHeroProps = {
  title: string
}

export default function ResearchHero({ title }: ResearchHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-[#090936] text-white">
      <div className="absolute -left-24 top-16 -z-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute right-0 top-0 -z-10 h-96 w-96 rounded-full bg-indigo-400/20 blur-3xl" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-slate-50 to-transparent" />

      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="max-w-4xl">
          <h1 className="text-balance text-4xl font-black leading-tight tracking-tight md:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/80 md:text-lg">
            Browse publications by category, staff member, title, or DOI, and quickly access the
            full publication record.
          </p>
        </div>
      </div>
    </section>
  )
}
