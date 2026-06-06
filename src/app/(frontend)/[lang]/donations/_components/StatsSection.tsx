'use client'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { BookOpen, GraduationCap, Handshake, UsersRound } from 'lucide-react'

import type { LucideIcon } from 'lucide-react'

type StatData = {
  key: string
  value: number
  label: string
}

type StatsSectionProps = {
  title: string
  description: string
  stats: StatData[]
}

const iconMap: Record<string, LucideIcon> = {
  graduates: GraduationCap,
  publications: BookOpen,
  partners: Handshake,
  participants: UsersRound,
}

function CountUpNumber({ end, duration = 800 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)
  const numberRef = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    const el = numberRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return

        hasAnimated.current = true

        let startTime: number | null = null

        const animate = (t: number) => {
          if (startTime === null) startTime = t

          const progress = Math.min((t - startTime) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 5)

          setCount(Math.floor(eased * end))

          if (progress < 1) requestAnimationFrame(animate)
          else setCount(end)
        }

        requestAnimationFrame(animate)
      },
      { threshold: 0.4 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [end, duration])

  return <span ref={numberRef}>{count}</span>
}

export default function StatsSection({ title, description, stats }: StatsSectionProps) {
  return (
    <section className="bg-white px-4 py-8 md:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-287.5">
        <div className="relative  w-full overflow-hidden rounded-xl bg-[linear-gradient(180deg,#3636B7_0%,#3434B0_0.01%,#272785_13.16%,#181851_74.52%)] h-140 md:h-150 xl:h-135 xl:min-h-0 xl:aspect-1150/330 xl:rounded-3xl">
          <Image
            src="/stats-bg.png"
            alt="Microscope cell background"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1150px"
            className="object-cover opacity-[0.35] mix-blend-screen"
          />

          <div className="absolute inset-0 bg-[#05083f]/25" />

          {/* Mobile dividers */}
          <div className="absolute top-1/4 left-1/2 z-10 h-12 -translate-x-1/2 -translate-y-1/2 border-l border-dotted border-white/60 xl:hidden" />
          <div className="absolute top-3/4 left-1/2 z-10 h-12 -translate-x-1/2 -translate-y-1/2 border-l border-dotted border-white/60 xl:hidden" />

          {/* Title */}
          <div className="mt-6 text-center text-3xl font-bold text-white md:text-4xl xl:mt-7.5 xl:text-5xl">
            {title}
          </div>

          <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-white xl:w-24" />

          {/* Description */}
          <div className="mx-auto mt-5 max-w-xl px-6 text-center text-wrap text-base text-white md:text-lg xl:w-216 xl:max-w-none xl:px-0 xl:text-xl">
            {description}
          </div>

          {/* Stats */}
          <div className="relative z-20 mt-10 grid grid-cols-2 grid-rows-2 gap-6 px-6 py-6 text-white md:mt-12 md:px-8 xl:mt-14 xl:grid-cols-4 xl:grid-rows-1 xl:gap-0 xl:px-10 xl:py-8">
            {stats.map((stat, index) => {
              const Icon = iconMap[stat.key] ?? BookOpen

              return (
                <div
                  key={stat.key}
                  className="relative flex flex-col items-center justify-center text-center"
                >
                  {/* Desktop divider */}
                  {index !== 0 && (
                    <div className="absolute top-1/2 left-0 hidden h-25 -translate-y-1/2 border-l border-dotted border-white/60 xl:block" />
                  )}

                  <Icon className="mb-2 h-7 w-7 md:h-9 md:w-9 xl:h-10 xl:w-10" />

                  <h2 className="text-2xl font-medium md:text-4xl xl:text-5xl">
                    <CountUpNumber end={stat.value} />+
                  </h2>

                  <p className="text-xs font-light md:text-sm xl:text-base">{stat.label}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
