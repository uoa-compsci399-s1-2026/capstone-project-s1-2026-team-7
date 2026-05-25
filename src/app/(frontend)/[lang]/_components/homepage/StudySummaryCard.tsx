import Image from 'next/image'
import Link from 'next/link'
import type { StudyDTO } from '@/features'

type StudySummaryCardProps = {
  study: Pick<StudyDTO, 'title' | 'subtitle' | 'duration' | 'eligibility' | 'slug' | 'banner'>
  lang?: string
}

export default function StudySummaryCard({ study, lang = 'en' }: StudySummaryCardProps) {
  return (
    <Link
      href={`/${lang}/studies/${study.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
    >
      <div className="relative h-40 w-full overflow-hidden bg-[#dbe1f0] sm:h-44">
        <Image
          src={study.banner?.url}
          alt={study.banner?.alt ?? study.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <div className="flex flex-col gap-0.5">
          <h3 className="text-base font-bold text-[#08084f] sm:text-lg">{study.title}</h3>
          {study.subtitle && (
            <p className="text-xs italic text-[#08084f]/70 sm:text-sm">{study.subtitle}</p>
          )}
        </div>

        <dl className="mt-auto grid grid-cols-2 gap-3 border-t border-black/5 pt-3">
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-wider text-[#08084f]/60">
              Duration
            </dt>
            <dd className="mt-0.5 text-xs text-[#08084f] sm:text-sm">{study.duration}</dd>
          </div>
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-wider text-[#08084f]/60">
              Eligibility
            </dt>
            <dd className="mt-0.5 text-xs text-[#08084f] sm:text-sm">{study.eligibility}</dd>
          </div>
        </dl>
      </div>
    </Link>
  )
}
