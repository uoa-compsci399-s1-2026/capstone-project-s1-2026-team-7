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

function CountUpNumber({
  end,
  duration = 800,
}: {
  end: number

  duration?: number
}) {
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

          // Fast at the start, slows near the end
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
    <section className="px-4 py-12 md:px-8">
      <div className="relative mx-auto min-h-[295px] max-w-7xl overflow-hidden rounded-[24px]">
        <Image
          src="/stats-bg.png"
          alt="Microscope cell background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-[#05083f]/80" />

        <div className="relative z-10 grid min-h-[295px] grid-cols-1 gap-y-10 px-6 py-10 text-white sm:grid-cols-2 md:grid-cols-4 md:gap-y-0 md:px-10 md:py-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon

            return (
              <div
                key={stat.label}
                className="relative grid grid-rows-[56px_72px_72px] place-items-center text-center"
              >
                {index !== 0 && (
                  <div className="absolute left-0 top-1/2 hidden h-[65px] -translate-y-1/2 border-l border-dotted border-white/60 md:block" />
                )}

                <div className="flex h-14 items-center justify-center">
                  <Icon className="h-10 w-10 stroke-[1.8] md:h-12 md:w-12" />
                </div>

                <h2 className="flex h-[72px] items-center justify-center text-5xl font-semibold leading-none tracking-tight md:text-6xl">
                  <CountUpNumber end={stat.value} />
                </h2>

                <p className="flex h-[72px] max-w-[230px] items-start justify-center text-lg font-medium leading-snug md:text-xl">
                  {stat.label}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default StatsSection
