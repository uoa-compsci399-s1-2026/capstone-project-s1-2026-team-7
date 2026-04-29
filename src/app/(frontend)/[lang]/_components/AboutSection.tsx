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

            <p className="whitespace-pre-line text-md font-normal leading-snug  lg:text-xl xl:text-2xl lg:leading-snug">
              {body}
            </p>
          </div>
        </div>
        {/* Stats */}
        <div className="mt-14 grid grid-cols-3 text-center sm:mt-16 md:mt-18 lg:mt-20 xl:mt-24">
          <div className="flex flex-col items-center border-r border-dotted border-gray-400 px-1 sm:px-3 md:px-5 lg:px-8">
            <h2 className="text-3xl font-semibold text-black sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
              25
            </h2>
            <p className="mt-2 max-w-50 text-center text-xs leading-snug text-black sm:text-sm md:mt-4 md:text-base lg:text-lg xl:text-xl">
              Postgraduate Students
            </p>
          </div>

          <div className="flex flex-col items-center border-r border-dotted border-gray-400 px-1 sm:px-3 md:px-5 lg:px-8">
            <h2 className="text-3xl font-semibold text-black sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
              70
            </h2>
            <p className="mt-2 max-w-50 text-center text-xs leading-snug text-black sm:text-sm md:mt-4 md:text-base lg:text-lg xl:text-xl">
              Publications
            </p>
          </div>

          <div className="flex flex-col items-center px-1 sm:px-3 md:px-5 lg:px-8">
            <h2 className="text-3xl font-semibold text-black sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
              14
            </h2>
            <p className="mx-auto mt-2 max-w-50 text-center text-xs leading-snug text-black sm:text-sm md:mt-4 md:text-base lg:text-lg xl:text-xl">
              F&amp;B Industry Partners
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
