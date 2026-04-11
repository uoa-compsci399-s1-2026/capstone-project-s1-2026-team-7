import Image from 'next/image'
import { heroDTO } from '@/dto/homepagedto'
import mobile_hero from '../../../public/mobile_hero.png'

type HeroSectionProp = {
  prop: heroDTO
}

export default function HeroSection({ prop }: HeroSectionProp) {
  const { title, description, illustration, button1, button2 } = prop

  return (
    <section className="relative w-full text-[clamp(8px,1.2vw,16px)]">
      {/* Mobile image — drives height on mobile */}
      <div className="block md:hidden">
        <Image
          src={mobile_hero}
          alt="Mobile hero"
          width={314}
          height={514}
          className="w-full h-auto object-cover"
          priority
        />
      </div>

      {/* Tablet + desktop image — drives height on md+ */}
      <div className="hidden md:block">
        {illustration?.url && (
          <Image
            src={illustration.url}
            alt={illustration.alt || 'Hero image'}
            width={1280}
            height={700}
            className="w-full h-auto object-cover object-top"
            priority
          />
        )}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 flex items-end justify-center px-4 pb-[3em] text-center">
        <div className="flex flex-col items-center gap-[0.5em] w-full max-w-[80rem]">
          <h1 className="font-semibold leading-tight text-white m-0 text-[4em] max-w-[14ch]">
            {title}
          </h1>

          <p className="text-white leading-snug text-[1.25em] max-w-[54ch]">{description}</p>

          <div className="flex flex-wrap justify-center gap-[0.5em] mt-[0.5em]">
            <button className="rounded-full bg-[#23238C] text-white font-medium whitespace-nowrap text-[1em] px-[1.75em] py-[0.65em]">
              {button1.label}
            </button>
            <button className="rounded-full border-[0.15em] border-white text-white font-medium whitespace-nowrap bg-transparent text-[1em] px-[1.75em] py-[0.65em]">
              {button2.label}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
