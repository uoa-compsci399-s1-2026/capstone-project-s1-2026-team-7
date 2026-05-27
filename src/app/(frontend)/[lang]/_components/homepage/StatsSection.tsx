'use client'

import Image from 'next/image'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { BookOpen, GraduationCap, Handshake, UsersRound } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useInView } from '@/app/(frontend)/[lang]/_components/useInView'

type Stat = {
  icon: LucideIcon
  value: number
  label: string
}

const stats: Stat[] = [
  {
    icon: GraduationCap,
    value: 25,
    label: 'Postgraduate students supported since 2020',
  },
  {
    icon: BookOpen,
    value: 70,
    label: 'Peer-reviewed publications',
  },
  {
    icon: Handshake,
    value: 14,
    label: 'F&B industry partners',
  },
  {
    icon: UsersRound,
    value: 1000,
    label: 'Participants involved in HNU studies',
  },
]

const FADE_BASE = 'transition-all duration-700 ease-out will-change-[opacity,transform]'
const FADE_HIDDEN = 'opacity-0 translate-y-6'
const FADE_SHOWN = 'opacity-100 translate-y-0'

const STAT_DELAYS = ['delay-100', 'delay-200', 'delay-300', 'delay-[400ms]']

function CountUpNumber({ end, duration = 1500 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)
  const numberRef = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    const numberElement = numberRef.current
    if (!numberElement) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return

        hasAnimated.current = true

        let startTime: number | null = null

        const animate = (currentTime: number) => {
          if (startTime === null) startTime = currentTime

          const elapsed = currentTime - startTime
          const progress = Math.min(elapsed / duration, 1)
          const easedProgress = 1 - Math.pow(1 - progress, 5)

          setCount(Math.floor(easedProgress * end))

          if (progress < 1) {
            requestAnimationFrame(animate)
          } else {
            setCount(end)
          }
        }

        requestAnimationFrame(animate)
      },
      { threshold: 0.4 },
    )

    observer.observe(numberElement)

    return () => observer.disconnect()
  }, [end, duration])

  return <span ref={numberRef}>{count}</span>
}

function StatsSection() {
  const { ref, inView } = useInView<HTMLElement>()

  return (
    <section ref={ref} className="bg-white py-16">
      <div className="mx-auto w-[84%] max-w-300">
        <div
          className={clsx(
            FADE_BASE,
            inView ? FADE_SHOWN : FADE_HIDDEN,
            'relative aspect-292/250 w-full overflow-hidden rounded-lg bg-[linear-gradient(180deg,#3636B7_0%,#3434B0_0.01%,#272785_13.16%,#181851_74.52%)] sm:aspect-800/350 sm:rounded-2xl md:aspect-1150/295',
          )}
        >
          <Image
            src="/stats-bg.png"
            alt="Microscope cell background"
            fill
            priority
            sizes="(max-width: 767px) 84vw, 1200px"
            className="object-cover opacity-[0.35] mix-blend-screen"
          />

          <div className="absolute inset-0 bg-[#05083f]/25" />

          {/* Mobile middle divider lines only */}
          <div className="absolute top-1/4 left-1/2 z-10 h-8 -translate-x-1/2 -translate-y-1/2 border-l border-dotted border-white/60 sm:h-10 md:hidden" />
          <div className="absolute top-3/4 left-1/2 z-10 h-8 -translate-x-1/2 -translate-y-1/2 border-l border-dotted border-white/60 sm:h-10 md:hidden" />

          <div className="relative z-20 grid h-full grid-cols-2 grid-rows-2 gap-0 px-4 py-4 text-white md:grid-cols-4 md:grid-rows-1">
            {stats.map((stat, index) => {
              const Icon = stat.icon

              return (
                <div
                  key={stat.label}
                  className={clsx(
                    FADE_BASE,
                    inView ? FADE_SHOWN : FADE_HIDDEN,
                    inView && STAT_DELAYS[index % STAT_DELAYS.length],
                    'relative flex h-full flex-col items-center justify-center text-center',
                  )}
                >
                  {/* Desktop dividers only */}
                  {index !== 0 && (
                    <div className="absolute top-1/2 left-0 hidden h-20 -translate-y-1/2 border-l border-dotted border-white/60 md:block lg:h-22.5 xl:h-25" />
                  )}

                  {/* Icon row */}
                  <div className="flex h-5 items-center justify-center sm:h-7 md:h-8 lg:h-10 xl:h-12">
                    <Icon className="min-[500px]:h-8 min-[500px]:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12" />
                  </div>

                  {/* Number row */}
                  <h2 className="mt-2 flex h-7 text-xl items-center justify-center min-[500px]:text-2xl leading-none font-bold tracking-tight sm:h-9 sm:text-3xl md:h-11 md:text-2xl lg:h-14 lg:text-3xl xl:h-16 xl:text-4xl">
                    <CountUpNumber end={stat.value} />+
                  </h2>

                  {/* Label row */}
                  <p className="mt-1 flex h-9 max-w-27.5 items-start justify-center text-[8px] min-[500px]:text-xs leading-tight font-normal sm:h-10 sm:max-w-35 md:h-12 md:max-w-42.5 md:text-sm lg:h-14 lg:max-w-52.5 lg:text-base xl:h-16 xl:max-w-62.5 xl:text-lg">
                    {stat.label}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default StatsSection
