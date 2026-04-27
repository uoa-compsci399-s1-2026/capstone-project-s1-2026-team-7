import Image from 'next/image'
import type { AboutSectionDTO } from '@/validation'

type AboutSectionProps = {
  data: AboutSectionDTO
}

export default function AboutSection({ data }: AboutSectionProps) {
  const { heading, body, image } = data

  return (
    <section className="bg-[#eef1ff] px-6 py-16 md:px-12 md:py-20">
      <div className="mx-auto max-w-6xl">
        {/* Mobile title - sits above image */}
        <div className="mb-6 flex items-start gap-4 text-[#08084f] md:hidden">
          <div className="h-[28px] w-[3px] shrink-0 rounded-full bg-[#08084f]" />

          <h2 className="text-2xl font-bold leading-tight">{heading}</h2>
        </div>

        {/* Image + text */}
        <div className="grid gap-8 md:grid-cols-2 md:items-start md:gap-8 lg:gap-14">
          {/* Image */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem]">
            <Image
              src={image.url}
              alt={image.alt || heading}
              fill
              sizes="(max-width: 767px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Text */}
          <div className="text-[#08084f]">
            {/* Tablet/Desktop title */}
            <div className="mb-5 hidden items-start gap-4 md:flex">
              <div className="h-[34px] w-[3px] shrink-0 rounded-full bg-[#08084f] lg:h-[58px]" />

              <h2 className="text-[28.9px] font-bold leading-tight lg:text-[48.23px]">{heading}</h2>
            </div>

            <p className="whitespace-pre-line text-[14px] font-normal leading-snug md:text-[14.38px] lg:text-2xl lg:leading-snug">
              {body}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-24 grid grid-cols-3 text-center">
          <div className="flex flex-col items-center border-r border-dotted border-gray-400 px-1">
            <h2 className="text-3xl font-semibold text-black md:text-4xl">25</h2>
            <p className="mt-2 max-w-[80px] text-center text-[11px] leading-snug text-black md:max-w-[120px] md:text-sm">
              Postgraduate Students
            </p>
          </div>

          <div className="flex flex-col items-center border-r border-dotted border-gray-400 px-1">
            <h2 className="text-3xl font-semibold text-black md:text-4xl">70</h2>
            <p className="mt-2 max-w-[80px] text-center text-[11px] leading-snug text-black md:max-w-[120px] md:text-sm">
              Publications
            </p>
          </div>

          <div className="flex flex-col items-center px-1">
            <h2 className="text-3xl font-semibold text-black md:text-4xl">14</h2>
            <p className="mx-auto mt-2 max-w-[75px] text-center text-[11px] leading-snug text-black md:max-w-[120px] md:text-sm">
              F&amp;B Industry Partners
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
