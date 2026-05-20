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
  return (
    <section className="bg-white px-[26px] py-16 md:px-8 md:py-24 lg:px-12">
      <div className="mx-auto w-full max-w-[1150px] min-[500px]:max-w-[480px] sm:max-w-[520px] md:max-w-[1150px]">
        <div className="relative aspect-[292/229] w-full overflow-hidden rounded-[8px] bg-[linear-gradient(180deg,#3636B7_0%,#3434B0_0.01%,#272785_13.16%,#181851_74.52%)] md:aspect-[1150/295] md:rounded-[24px]">
          <Image
            src="/stats-bg.png"
            alt="Microscope cell background"
            fill
            priority
            sizes="(max-width: 499px) calc(100vw - 52px), (max-width: 767px) 520px, 1150px"
            className="object-cover opacity-[0.35] mix-blend-screen"
          />

          <div className="absolute inset-0 bg-[#05083f]/25" />

          {/* Mobile middle divider lines only */}
          <div className="absolute top-1/4 left-1/2 z-10 h-10 -translate-x-1/2 -translate-y-1/2 border-l border-dotted border-white/60 min-[500px]:h-12 md:hidden" />
          <div className="absolute top-3/4 left-1/2 z-10 h-10 -translate-x-1/2 -translate-y-1/2 border-l border-dotted border-white/60 min-[500px]:h-12 md:hidden" />

          <div className="relative z-20 grid h-full grid-cols-2 grid-rows-2 gap-4 text-white md:grid-cols-4 md:grid-rows-1 md:gap-0 md:px-8 md:py-4 lg:px-10 lg:py-5 xl:py-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              const mobileXPosition = index % 2 === 0 ? 'translate-x-5' : '-translate-x-5'

              return (
                <div
                  key={stat.label}
                  className={`relative grid h-full content-center grid-rows-[24px_34px_40px] place-items-center text-center min-[500px]:grid-rows-[30px_44px_46px] sm:grid-rows-[32px_46px_48px] md:translate-x-0 md:grid-rows-[42px_54px_52px] lg:grid-rows-[50px_64px_56px] xl:grid-rows-[60px_82px_78px] ${mobileXPosition}`}
                >
                  {/* Desktop dividers only */}
                  {index !== 0 && (
                    <div className="absolute top-1/2 left-0 hidden h-[80px] -translate-y-1/2 border-l border-dotted border-white/60 md:block lg:h-[90px] xl:h-[100px]" />
                  )}

                  {/* Icon row */}
                  <div className="flex items-center justify-center">
                    <Icon className="h-5 w-5 min-[500px]:h-6 min-[500px]:w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-10 lg:w-10 xl:h-12 xl:w-12" />
                  </div>

                  {/* Number row */}
                  <h2 className="flex items-center justify-center text-2xl leading-none font-medium tracking-tight min-[500px]:text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                    <CountUpNumber end={stat.value} />+
                  </h2>

                  {/* Label row */}
                  <p className="flex max-w-[92px] items-start justify-center text-[9px] leading-tight font-light min-[500px]:max-w-[115px] min-[500px]:text-[10px] sm:max-w-[125px] sm:text-[10px] md:max-w-[170px] md:text-sm lg:max-w-[210px] lg:text-base xl:max-w-[250px] xl:text-xl">
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
