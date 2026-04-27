import Image from 'next/image'

type ContactHeroProps = {
  title: string
  imageUrl: string
  imageAlt: string
}

export default function ContactHero({ title, imageUrl, imageAlt }: ContactHeroProps) {
  return (
    <section className="relative h-56 w-full overflow-hidden">
      <Image src={imageUrl} alt={imageAlt} fill priority className="object-cover" />

      <div className="absolute inset-0 bg-[#0C0C48]/45" />

      <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
        <h1 className="text-4xl font-bold text-white md:text-5xl">{title}</h1>
      </div>
    </section>
  )
}
