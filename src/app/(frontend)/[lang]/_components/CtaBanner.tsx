import Link from 'next/link'

type CtaBannerProps = {
  title: string
  description: string
  buttonLabel: string
  href: string
}

export default function CtaBanner({ title, description, buttonLabel, href }: CtaBannerProps) {
  return (
    <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl bg-[#ECECFA] p-6 md:flex-row md:items-center md:gap-6 md:p-8">
      <div>
        <h2 className="text-xl font-bold text-[#0C0C48] md:text-2xl">{title}</h2>
        <p className="mt-1 text-sm text-[#0C0C48]/80 md:text-base">{description}</p>
      </div>
      <Link
        href={href}
        className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#0C0C48] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1F2BD4] md:text-base"
      >
        {buttonLabel}
      </Link>
    </div>
  )
}
