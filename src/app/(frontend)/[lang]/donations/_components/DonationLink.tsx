import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

type DonationLinkProps = {
  title: string
  description: string

  backgroundImage: {
    url: string
    alt: string
  }

  button: {
    label: string
    url: string
  }
}

export default function DonationLink({
  title,
  description,
  backgroundImage,
  button,
}: DonationLinkProps) {
  return (
    <section className="w-full bg-[#F3F3F3] px-4 py-10 md:px-8 lg:px-12">
      <div className="relative mx-auto flex max-w-6xl flex-col items-center justify-between overflow-hidden rounded-3xl bg-[#242B73] px-8 py-8 md:flex-row md:px-12 md:py-10">
        {/* Background image */}
        <Image
          src={backgroundImage.url}
          alt={backgroundImage.alt}
          fill
          className="object-cover opacity-20 mix-blend-screen"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-[#242B73]/80" />

        {/* Heading */}
        <div className="relative z-10 max-w-sm">
          <h2 className="text-3xl font-bold leading-tight text-white">{title}</h2>
        </div>

        {/* Description */}
        <div className="relative z-10 mt-6 max-w-md md:mt-0">
          <p className="text-sm leading-relaxed text-white/90 md:text-base">{description}</p>
        </div>

        {/* CTA */}
        <div className="relative z-10 mt-8 md:mt-0">
          <a
            href={button.url}
            className="ml-5 flex h-10 w-60 items-center justify-center gap-3 rounded-full bg-[#2F46FF] text-lg font-medium text-white transition hover:bg-[#3D52FF]"
          >
            {button.label}
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  )
}
