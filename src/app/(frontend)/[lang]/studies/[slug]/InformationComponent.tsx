import type { LucideIcon } from 'lucide-react'

export type InformationComponentProps = {
  Icon: LucideIcon
  title: string
  description: string
  link: string
}

export default function InformationComponent({
  Icon,
  title,
  description,
  link,
}: InformationComponentProps) {
  return (
    <div className="flex h-52.5 w-full max-w-73.75 flex-col justify-between rounded-[28px] bg-[#D0D6E7] px-5 py-7 md:h-[337px] md:max-w-none md:w-[525.79px] md:rounded-[42px] md:px-9 md:py-10">
      <div>
        <div className="mb-7 flex items-center gap-3 md:mb-10 md:gap-4">
          <Icon className="h-5 w-5 text-black md:h-8 md:w-8" strokeWidth={2.2} />

          <h3 className="text-base font-bold text-[#05083D] md:text-2xl">{title}</h3>
        </div>

        <p className="max-w-107.5 text-xs leading-snug text-black md:text-base md:leading-relaxed">
          {description}
        </p>
      </div>

      <a
        href={link}
        className="text-xs font-bold text-[#355CFF] underline underline-offset-2 md:text-base"
      >
        Learn more
      </a>
    </div>
  )
}
