'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { BookOpen, GraduationCap, Handshake, UsersRound } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

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

function CountUpNumber({ end, duration = 800 }: { end: number; duration?: number }) {
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
  return (
    <section className="bg-white px-6.5 py-8 md:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-287.5">
        <div className="relative aspect-292/229 text-center w-full h-135 overflow-hidden rounded-lg bg-[linear-gradient(180deg,#3636B7_0%,#3434B0_0.01%,#272785_13.16%,#181851_74.52%)] md:aspect-1150/330 md:rounded-3xl">
          <Image
            src="/stats-bg.png"
            alt="Microscope cell background"
            fill
            priority
            sizes="(max-width: 768px) calc(100vw - 52px), 1150px"
            className="object-cover opacity-[0.35] mix-blend-screen"
          />

          <div className="absolute inset-0 bg-[#05083f]/25" />

          {/* Mobile middle divider lines only */}
          <div className="absolute top-1/4 left-1/2 z-10 h-12 -translate-x-1/2 -translate-y-1/2 border-l border-dotted border-white/60 md:hidden" />
          <div className="absolute top-3/4 left-1/2 z-10 h-12 -translate-x-1/2 -translate-y-1/2 border-l border-dotted border-white/60 md:hidden" />
          <div className="mt-7.5 text-center text-white font-bold text-5xl">{'Your Impact'}</div>
          <div className="mt-5 w-24 h-1 bg-white mx-auto rounded-full"></div>
          <div className="mx-auto mt-5 w-216 text-center  text-white text-xl">
            {
              'Every contribution, big or small, fuels breakthroughs that benefit society today and for generations to come'
            }
          </div>
          <div className="relative z-20 mt-14 grid grid-cols-2 grid-rows-2 gap-4 px-8 py-3 text-white md:grid-cols-4 md:grid-rows-1 md:gap-0 md:px-10 md:py-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon

              return (
                <div
                  key={stat.label}
                  className="relative grid h-full content-center grid-rows-[24px_34px_38px] place-items-center px-1 text-center md:flex md:flex-col md:items-center md:justify-center md:px-3"
                >
                  {/* Desktop dividers only */}
                  {index !== 0 && (
                    <div className="absolute top-1/2 left-0 hidden h-25 -translate-y-1/2 border-l border-dotted border-white/60 md:block" />
                  )}

                  {/* Icon row */}
                  <div className="flex items-center justify-center md:h-auto md:-translate-y-7">
                    <Icon className="h-5 w-5 stroke-[1.8] sm:h-6 sm:w-6 md:h-10 md:w-10 lg:h-12 lg:w-12 xl:h-12 xl:w-12" />
                  </div>

                  {/* Number row */}
                  <h2 className="flex items-center justify-center text-2xl leading-none font-medium tracking-tight sm:text-3xl md:h-16 md:-translate-y-7 md:text-5xl lg:h-18 lg:text-6xl xl:h-20 xl:text-6xl sm:mb-2">
                    <CountUpNumber end={stat.value} />+
                  </h2>

                  {/* Label row */}
                  <p className="flex max-w-23 items-start justify-center text-[9px] leading-tight font-light sm:max-w-27.5 sm:text-[10px] md:h-16 md:max-w-47.5 md:translate-y-2 md:text-base lg:h-18 lg:max-w-57.5 lg:text-lg xl:h-20 xl:max-w-62.5 xl:text-xl">
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
