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
    <section className="bg-white py-16">
      <div className="mx-auto w-[84%] max-w-300">
        <div className="relative overflow-hidden rounded-2xl bg-[linear-gradient(180deg,#3636B7_0%,#3434B0_0.01%,#272785_13.16%,#181851_74.52%)]">
          <div className="absolute inset-0 bg-[#05083f]/25" />

          <div className="relative z-20 px-6 py-10 text-white md:py-12">
            {/* Header */}
            <div className="text-center">
              <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">{title}</h2>

              <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-white sm:w-20" />

              <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed sm:text-base md:max-w-2xl md:text-lg">
                {description}
              </p>
            </div>

            {/* Stats */}
            <div className="relative mt-10 grid grid-cols-2 grid-rows-2 gap-y-10 md:mt-12 md:grid-cols-4 md:grid-rows-1 md:gap-y-0">
              <div className="absolute top-1/4 left-1/2 h-10 -translate-x-1/2 -translate-y-1/2 border-l border-dotted border-white/60 md:hidden" />
              <div className="absolute top-3/4 left-1/2 h-10 -translate-x-1/2 -translate-y-1/2 border-l border-dotted border-white/60 md:hidden" />

              {stats.map((stat, index) => {
                const Icon = iconMap[stat.key] ?? BookOpen

                return (
                  <div
                    key={stat.key}
                    className="relative flex flex-col items-center justify-center text-center"
                  >
                    {index !== 0 && (
                      <div className="absolute top-1/2 left-0 hidden h-20 -translate-y-1/2 border-l border-dotted border-white/60 md:block lg:h-22.5 xl:h-25" />
                    )}

                    <Icon className="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12" />

                    <h3 className="mt-2 text-2xl leading-none font-bold tracking-tight sm:text-3xl md:text-2xl lg:text-3xl xl:text-4xl">
                      <CountUpNumber end={stat.value} />+
                    </h3>

                    <p className="mt-1 max-w-35 text-xs leading-tight sm:max-w-40 md:max-w-42.5 md:text-sm lg:max-w-52.5 lg:text-base">
                      {stat.label}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
