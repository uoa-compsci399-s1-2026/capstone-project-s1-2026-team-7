import type { LucideIcon } from 'lucide-react'

export type InformationComponentProps = {
  Icon?: LucideIcon
  title: string
  description: string
  link?: string
}

export default function InformationComponent({
  Icon,
  title,
  description,
  link,
}: InformationComponentProps) {
  return (
    <div className="flex min-h-80 w-full flex-col justify-between rounded-[42px] bg-[#D0D6E7] px-9 py-10">
      <div>
        <div className="mb-7 flex items-center gap-3">
          {Icon && <Icon className="h-8 w-8 text-black" strokeWidth={2.2} />}

          <h3 className="text-2xl font-bold text-[#05083D]">{title}</h3>
        </div>

        <p className="max-w-107.5 text-base leading-relaxed text-black md:text-lg">{description}</p>
      </div>

      {link && (
        <a
          href={link}
          className="mt-6 text-base font-bold text-[#355CFF] underline underline-offset-2"
        >
          Learn more
        </a>
      )}
    </div>
  )
}
