'use client'

import { useEffect, useRef, useState } from 'react'
import { useLenis } from 'lenis/react'
import { TimelineBlockDTO } from '@/features'

type TimelineSectionProps = {
  data: TimelineBlockDTO
}

function TimelineSection({ data }: TimelineSectionProps) {
  const { eyebrow, title, description, items } = data

  const outerRef = useRef<HTMLElement | null>(null)
  const stickyRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [extra, setExtra] = useState(0)

  useEffect(() => {
    const recalc = () => {
      const sticky = stickyRef.current
      const track = trackRef.current
      if (!sticky || !track) return
      setExtra(Math.max(track.scrollWidth - sticky.clientWidth, 0))
    }
    recalc()
    const ro = new ResizeObserver(recalc)
    if (stickyRef.current) ro.observe(stickyRef.current)
    if (trackRef.current) ro.observe(trackRef.current)
    return () => ro.disconnect()
  }, [])

  useLenis(
    (lenis) => {
      const outer = outerRef.current
      const track = trackRef.current
      if (!outer || !track || extra <= 0) return
      const rect = outer.getBoundingClientRect()
      const sectionTop = rect.top + lenis.scroll
      const progress = Math.min(Math.max((lenis.scroll - sectionTop) / extra, 0), 1)
      track.style.transform = `translate3d(${-progress * extra}px, 0, 0)`
    },
    [extra],
  )

  return (
    <section
      ref={outerRef}
      id="our-history"
      className="relative bg-white"
      style={{ height: `calc(100vh + ${extra}px)` }}
    >
      <div ref={stickyRef} className="sticky top-0 h-screen w-full overflow-hidden">
        <div
          ref={trackRef}
          className="flex h-full items-center gap-16 px-6 will-change-transform md:gap-20 md:px-12 lg:gap-24 lg:px-20"
        >
          <div className="w-[85vw] max-w-140 shrink-0">
            <p className="text-base font-semibold text-[#1F2BD4] md:text-lg lg:text-xl">
              {eyebrow}
            </p>
            <h2 className="mt-4 text-4xl leading-tight font-extrabold text-[#08084f] md:text-5xl lg:text-6xl xl:text-7xl">
              {title}
            </h2>
            <div className="mt-6 h-1.5 w-24 rounded-full bg-[#08084f] md:w-32 lg:w-40" />
            <p className="mt-8 max-w-115 text-base leading-snug text-[#08084f] md:text-lg lg:text-xl">
              {description}
            </p>
          </div>

          {items.map((item, index) => (
            <div
              key={`${item.year}-${index}`}
              className="grid w-72 shrink-0 grid-rows-[1fr_80px] gap-6 md:w-96 lg:w-104"
            >
              <div className="pr-8">
                <h3 className="text-2xl font-extrabold text-[#1F2BD4] md:text-3xl lg:text-4xl">
                  {item.year}
                </h3>
                <p className="mt-4 max-w-85 text-base leading-snug text-[#08084f] md:text-lg lg:text-xl">
                  {item.description}
                </p>
              </div>
              <div className="flex items-center">
                <div
                  className={`h-12 w-12 shrink-0 rounded-full md:h-14 md:w-14 lg:h-16 lg:w-16 ${
                    index === 0 ? 'bg-[#1F2BD4]' : 'bg-black'
                  }`}
                />
                {index !== items.length - 1 && <div className="h-px flex-1 bg-[#08084f]/70" />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TimelineSection
