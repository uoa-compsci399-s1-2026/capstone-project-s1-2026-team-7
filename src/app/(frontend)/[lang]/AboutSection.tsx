import Image from 'next/image'
import type { AboutSectionDTO } from '@/validation'

type AboutSectionProps = {
  data: AboutSectionDTO
}

export default function AboutSection({ data }: AboutSectionProps) {
  const { eyebrow, heading, body, image } = data

  return (
    <section className="bg-[#eef1ff] px-6 py-16 md:px-12 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem]">
            <Image
              src={image.url}
              alt={image.alt || heading}
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              className="object-cover"
            />
          </div>

          <div className="text-[#08084f]">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide">{eyebrow}</p>

            <h2 className="mb-5 text-3xl font-bold leading-tight md:text-4xl">{heading}</h2>

            <p className="whitespace-pre-line text-base leading-relaxed md:text-lg">{body}</p>
          </div>
        </div>

        <div className="mt-16 grid gap-8 text-center sm:grid-cols-3">
          <div>
            <p className="text-5xl font-medium text-black">25</p>
            <p className="mt-3 text-base text-black">Postgraduate students</p>
          </div>

          <div className="sm:border-l sm:border-black/30">
            <p className="text-5xl font-medium text-black">70</p>
            <p className="mt-3 text-base text-black">Publications</p>
          </div>

          <div className="sm:border-l sm:border-black/30">
            <p className="text-5xl font-medium text-black">14</p>
            <p className="mt-3 text-base text-black">F&amp;B Industry partners</p>
          </div>
        </div>
      </div>
    </section>
  )
}
