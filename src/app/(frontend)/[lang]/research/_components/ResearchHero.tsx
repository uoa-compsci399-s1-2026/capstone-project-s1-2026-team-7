import Banner from '../../_components/Banner'

type ResearchHeroProps = {
  title: string
  imageUrl: string
  alt: string
}

export default function ResearchHero({ title, imageUrl, alt }: ResearchHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-[#090936] text-white">
      <Banner title={title} imageUrl={imageUrl} imageAlt={alt} />
    </section>
  )
}
