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
    <section className="bg-white px-6.5 py-8 md:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-287.5">
        <div className="relative aspect-292/229 w-full h-135 overflow-hidden rounded-lg bg-[linear-gradient(180deg,#3636B7_0%,#3434B0_0.01%,#272785_13.16%,#181851_74.52%)] md:aspect-1150/330 md:rounded-3xl">
          <Image
            src="/stats-bg.png"
            alt="Microscope cell background"
            fill
            priority
            sizes="(max-width: 768px) calc(100vw - 52px), 1150px"
            className="object-cover opacity-[0.35] mix-blend-screen"
          />

          <div className="absolute inset-0 bg-[#05083f]/25" />

          {/* Mobile dividers */}
          <div className="absolute top-1/4 left-1/2 z-10 h-12 -translate-x-1/2 -translate-y-1/2 border-l border-dotted border-white/60 md:hidden" />
          <div className="absolute top-3/4 left-1/2 z-10 h-12 -translate-x-1/2 -translate-y-1/2 border-l border-dotted border-white/60 md:hidden" />

          {/* Title */}
          <div className="mt-7.5 text-center text-white font-bold text-5xl">{title}</div>

          <div className="mt-5 w-24 h-1 bg-white mx-auto rounded-full" />

          {/* Description */}
          <div className="mx-auto mt-5 w-216 text-center text-white text-xl">{description}</div>

          {/* Stats */}
          <div className="relative z-20 mt-14 grid grid-cols-2 grid-rows-2 gap-4 px-8 py-3 text-white md:grid-cols-4 md:grid-rows-1 md:gap-0 md:px-10 md:py-8">
            {stats.map((stat, index) => {
              const Icon = iconMap[stat.key] ?? BookOpen

              return (
                <div
                  key={stat.key}
                  className="relative grid h-full place-items-center text-center md:flex md:flex-col md:justify-center"
                >
                  {/* desktop divider */}
                  {index !== 0 && (
                    <div className="absolute top-1/2 left-0 hidden h-25 -translate-y-1/2 border-l border-dotted border-white/60 md:block" />
                  )}

                  <Icon className="h-5 w-5 md:h-10 md:w-10" />

                  <h2 className="text-2xl font-medium md:text-5xl">
                    <CountUpNumber end={stat.value} />+
                  </h2>

                  <p className="text-[10px] font-light md:text-base">{stat.label}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
