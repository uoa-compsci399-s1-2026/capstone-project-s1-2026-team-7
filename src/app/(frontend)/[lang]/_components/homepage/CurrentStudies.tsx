'use client'

import Link from 'next/link'
import clsx from 'clsx'
import getLocalizedHref from '@/lib/localizedHref'
import type { CurrentStudiesBlockDTO } from '@/features/homepage/home.schema'
import type { Lang } from '@/types/lang'
import StudySummaryCard from './StudySummaryCard'
import { useInView } from '@/app/(frontend)/[lang]/_components/useInView'
import { ChevronRight } from 'lucide-react'

type CurrentStudiesProps = {
  data: CurrentStudiesBlockDTO
  lang: Lang
  limit?: number
}

const FADE_BASE = 'transition-all duration-700 ease-out will-change-[opacity,transform]'
const FADE_HIDDEN = 'opacity-0 translate-y-6'
const FADE_SHOWN = 'opacity-100 translate-y-0'

const CARD_DELAYS = ['delay-200', 'delay-300', 'delay-[400ms]', 'delay-500', 'delay-700']

export default function CurrentStudies({ data, lang, limit = 3 }: CurrentStudiesProps) {
  const studies = data.studies.slice(0, limit)
  const { ref, inView } = useInView<HTMLElement>()

  if (studies.length === 0) return null

  const linkHref = getLocalizedHref(data.link.href, lang)

  return (
    <section ref={ref} className="w-full bg-white py-16">
      <div className="mx-auto w-[84%] max-w-300">
        <div className="mb-8 flex items-center justify-between gap-6">
          <h2
            className={clsx(
              FADE_BASE,
              inView ? FADE_SHOWN : FADE_HIDDEN,
              'text-lg leading-tight font-extrabold text-[#08084f] sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl',
            )}
          >
            {data.title}
          </h2>

          {data.link.href && (
            <Link
              href={linkHref}
              className={clsx(
                FADE_BASE,
                inView ? FADE_SHOWN : FADE_HIDDEN,
                inView && 'delay-100',
                'text-xs font-bold whitespace-nowrap text-[#08084f] transition hover:opacity-70 sm:text-sm md:text-base lg:text-lg',
              )}
            >
              {data.link.title} <ChevronRight className="h-6 w-6 inline-block" aria-hidden="true" />
            </Link>
          )}
        </div>

        <div
          className={clsx(
            FADE_BASE,
            inView ? FADE_SHOWN : FADE_HIDDEN,
            inView && 'delay-100',
            'mt-4 h-0.75 w-16 rounded-full bg-[#08084f] sm:w-18 md:h-1 md:w-20 lg:w-22 xl:w-24',
          )}
        />

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {studies.map((study, index) => (
            <div
              key={study.id}
              className={clsx(
                FADE_BASE,
                inView ? FADE_SHOWN : FADE_HIDDEN,
                inView && CARD_DELAYS[index % CARD_DELAYS.length],
              )}
            >
              <StudySummaryCard study={study} lang={lang} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
