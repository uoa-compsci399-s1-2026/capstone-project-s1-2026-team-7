'use client'

import { useEffect, useRef, useState } from 'react'
import { useLenis } from 'lenis/react'
import clsx from 'clsx'
import type { TimelineBlockDTO } from '@/features/homepage'
import { useInView } from '@/app/(frontend)/[lang]/_components/useInView'

type TimelineSectionProps = {
  data: TimelineBlockDTO
}

const FADE_BASE = 'transition-all duration-700 ease-out will-change-[opacity,transform]'
const FADE_HIDDEN = 'opacity-0 translate-y-6'
const FADE_SHOWN = 'opacity-100 translate-y-0'

export default function TimelineSection({ data }: TimelineSectionProps) {
  const { eyebrow, title, description, items } = data

  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const hasScrolledRef = useRef(false)

  const [extra, setExtra] = useState(0)
  const { ref: inViewRef, inView } = useInView<HTMLDivElement>()

  useEffect(() => {
    const recalc = () => {
      const track = trackRef.current
      const viewport = viewportRef.current

      if (!track || !viewport) return

      setExtra(Math.max(track.scrollWidth - viewport.clientWidth, 0))
    }

    recalc()

    const ro = new ResizeObserver(recalc)

    if (trackRef.current) ro.observe(trackRef.current)
    if (viewportRef.current) ro.observe(viewportRef.current)

    window.addEventListener('resize', recalc)

    return () => {
      ro.disconnect()
      window.removeEventListener('resize', recalc)
    }
  }, [items.length])

  useLenis(
    (lenis) => {
      const section = sectionRef.current
      const track = trackRef.current
      const viewport = viewportRef.current
      const overlay = overlayRef.current

      if (!section || !track || !viewport || !overlay || extra <= 0) return

      const clamp = (value: number) => Math.max(0, Math.min(1, value))

      const sectionRect = section.getBoundingClientRect()
      const sectionTop = sectionRect.top + lenis.scroll
      const sectionScroll = lenis.scroll - sectionTop

      const progress = clamp(sectionScroll / extra)

      track.style.transform = `translate3d(${-progress * extra}px, 0, 0)`

      const activeIndex = Math.min(items.length - 1, Math.floor(progress * items.length))

      const dots = track.querySelectorAll('[data-dot]')
      dots.forEach((dot, idx) => {
        const el = dot as HTMLElement

        if (idx === activeIndex) {
          el.style.backgroundColor = '#1F2BD4'
          el.style.transform = 'scale(1.4)'
          el.style.borderColor = '#1F2BD4'
        } else {
          el.style.backgroundColor = 'white'
          el.style.transform = 'scale(1)'
          el.style.borderColor = '#08084F'
        }
      })

      const fadeIn = clamp(sectionScroll / (window.innerHeight * 0.25))
      const fadeOut = clamp(
        (sectionScroll - (extra - window.innerHeight * 0.25)) / (window.innerHeight * 0.25),
      )

      overlay.style.opacity = `${Math.max(0, fadeIn - fadeOut)}`

      if (progress > 0) {
        hasScrolledRef.current = true
      }

      if (hasScrolledRef.current) {
        ;(viewport.style as any).WebkitMaskImage =
          'linear-gradient(to right, transparent 0, black 4rem, black calc(100% - 4rem), transparent 100%)'
        viewport.style.maskImage =
          'linear-gradient(to right, transparent 0, black 4rem, black calc(100% - 4rem), transparent 100%)'
      }

      if (progress === 0) {
        hasScrolledRef.current = false
        ;(viewport.style as any).WebkitMaskImage = 'none'
        viewport.style.maskImage = 'none'
      }
    },
    [extra, items.length],
  )

  return (
    <section
      ref={sectionRef}
      className="relative overflow-x-clip bg-white"
      style={{ height: `calc(100vh + ${extra}px)` }}
    >
      <div
        ref={overlayRef}
        className="pointer-events-none absolute inset-0 z-0 bg-white"
        style={{ opacity: 0 }}
      />

      <div className="sticky top-0 z-10 flex h-screen w-full items-center">
        <div
          ref={inViewRef}
          className={clsx(
            FADE_BASE,
            inView ? FADE_SHOWN : FADE_HIDDEN,
            'mx-auto w-full max-w-280 px-6.5 md:px-8 lg:px-12 xl:px-0',
          )}
        >
          <div className="mb-2 md:hidden">
            {eyebrow && (
              <p className="text-[10px] font-semibold tracking-widest text-[#1F2BD4] uppercase">
                {eyebrow}
              </p>
            )}

            <h2 className="mt-1 text-xl leading-tight font-bold text-black">{title}</h2>

            <div className="mt-1 h-0.5 w-6 bg-[#08084F]" />

            {description && (
              <p className="mt-1 text-[10px] leading-relaxed text-black/70">{description}</p>
            )}
          </div>

          <div ref={viewportRef} className="relative w-full overflow-hidden pt-2 pb-10">
            <div ref={trackRef} className="relative flex w-max items-end will-change-transform">
              <div className="absolute bottom-6 left-0 h-0.5 w-full bg-[#08084F]/20" />

              <div
                className="relative flex h-0 w-0 shrink-0 flex-col justify-start overflow-hidden pr-0
                md:h-60 md:w-105 md:pr-16
                lg:h-64 lg:w-115"
              >
                {eyebrow && (
                  <p className="text-xs font-semibold tracking-widest text-[#1F2BD4] uppercase">
                    {eyebrow}
                  </p>
                )}

                <h2 className="mt-2 text-3xl leading-tight font-bold text-black lg:text-5xl">
                  {title}
                </h2>

                <div className="mt-3 h-0.5 w-10 bg-[#08084F]" />

                {description && (
                  <p className="mt-3 text-xs leading-relaxed text-black/70 lg:text-base">
                    {description}
                  </p>
                )}
              </div>

              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="relative flex h-48 w-[140px] shrink-0 flex-col justify-start pr-4
                    sm:h-52 sm:w-[180px] sm:pr-6
                    md:h-60 md:w-80 md:pr-12
                    lg:h-64 lg:w-96 lg:pr-16"
                >
                  <h3
                    className="truncate text-base font-extrabold text-[#1F2BD4]
                    sm:text-lg md:text-3xl lg:text-4xl"
                  >
                    {item.year}
                  </h3>

                  <p
                    className="mt-1 w-full break-words text-[10px] leading-snug text-[#08084F]
                    sm:text-xs md:text-base lg:text-lg"
                  >
                    {item.description}
                  </p>

                  <div
                    data-dot
                    className="absolute bottom-4 left-0 z-10 h-3 w-3 rounded-full border-2 border-[#08084F] bg-white
                      sm:h-4 sm:w-4 md:h-5 md:w-5 lg:h-6 lg:w-6"
                    style={{
                      transition: 'background-color 0.3s, transform 0.3s, border-color 0.3s',
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
