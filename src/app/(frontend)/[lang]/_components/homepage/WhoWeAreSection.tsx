import Image from 'next/image'
import { WhoWeAreBlockDTO } from '@/features/homepage'

type WhoWeAreBlockProps = {
  data: WhoWeAreBlockDTO
}

export default function WhoWeAreSection({ data }: WhoWeAreBlockProps) {
  const { title, description, image } = data
  return (
    <section className="w-full bg-white px-6.5 py-8 md:px-8 md:py-12 lg:px-12">
      <div className="mx-auto w-full max-w-287.5">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[42%_52%] md:gap-[6%]">
          {/* Text - first on mobile, right on desktop */}
          <div className="order-1 text-left md:order-2">
            <div className="w-full md:max-w-none">
              <h2 className="text-[22px] leading-tight font-extrabold text-[#08084f] sm:text-2xl md:text-[28px] lg:text-[32px] xl:text-4xl">
                {title}
              </h2>

              <div className="mt-4 h-0.75 w-16 rounded-full bg-[#08084f] md:h-1 sm:w-18 md:w-20 lg:w-22 xl:w-24" />

              <div className="mt-5 space-y-4 text-xs leading-snug font-normal text-[#08084f] sm:text-sm md:mt-6 md:space-y-5 md:text-base lg:text-lg xl:text-xl">
                <p>{description}</p>
              </div>
            </div>
          </div>

          {/* Image - second on mobile, left on desktop */}
          <div className="order-2 md:order-1">
            <div className="relative mx-auto aspect-296/192 w-full overflow-hidden rounded-[10px] min-[500px]:max-w-120 sm:max-w-130 md:mx-0 md:aspect-481/386 md:max-w-none md:rounded-2xl">
              <Image
                src={image.url}
                alt="Researchers working with a participant in the Human Nutrition Unit"
                fill
                sizes="(max-width: 499px) calc(100vw - 52px), (max-width: 767px) 520px, 42vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
