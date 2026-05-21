import Link from 'next/link'
import getLocalizedHref from '@/lib/localizedHref'
import type { CurrentStudiesBlockDTO } from '@/features/homepage/home.schema'
import type { Lang } from '@/types/lang'
import StudySummaryCard from './StudySummaryCard'

type CurrentStudiesProps = {
  data: CurrentStudiesBlockDTO
  lang: Lang
  limit?: number
}

export default function CurrentStudies({ data, lang, limit = 3 }: CurrentStudiesProps) {
  const studies = data.studies.slice(0, limit)

  if (studies.length === 0) return null

  const linkHref = getLocalizedHref(data.link.href, lang)

  return (
    <section className="bg-white px-6.5 py-10 md:px-8 md:py-20 lg:px-12">
      <div className="mx-auto w-full max-w-287.5">
        <div className="mb-8 flex items-center justify-between gap-6">
          <h2 className="text-[16px] leading-tight font-extrabold text-[#08084f] sm:text-xl md:text-3xl lg:text-4xl">
            {data.title}
          </h2>

          {data.link.href && (
            <Link
              href={linkHref}
              className="text-sm font-bold text-[#08084f] transition hover:opacity-70 md:text-lg"
            >
              {data.link.title} &gt;
            </Link>
          )}
        </div>

        <div className="mt-4 h-0.75 w-16 rounded-full bg-[#08084f] md:h-1" />

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {studies.map((study) => (
            <StudySummaryCard key={study.id} study={study} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  )
}
