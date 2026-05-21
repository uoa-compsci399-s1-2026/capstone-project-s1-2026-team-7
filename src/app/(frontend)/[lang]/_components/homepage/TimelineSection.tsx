'use client'

import { useEffect, useLayoutEffect, useRef } from 'react'
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
  const { ref: inViewRef, inView } = useInView<HTMLDivElement>()

  const getStickyHeight = () => (window.innerWidth < 768 ? 500 : window.innerHeight * 0.7)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    const viewport = viewportRef.current
    if (!section || !track || !viewport) return

    const setHeight = () => {
      const scrollDistance = Math.max(0, track.scrollWidth - viewport.clientWidth)
      section.style.height = `${getStickyHeight() + scrollDistance}px`
    }

    setHeight()
    window.addEventListener('resize', setHeight)
    return () => window.removeEventListener('resize', setHeight)
  }, [items.length])

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    const viewport = viewportRef.current
    const overlay = overlayRef.current

    if (!section || !track || !viewport || !overlay) return

    let frame = 0
    let hasScrolled = false

    const clamp = (value: number) => Math.max(0, Math.min(1, value))

    const update = () => {
      const scrollDistance = Math.max(0, track.scrollWidth - viewport.clientWidth)
      const stickyHeight = getStickyHeight()
      const sectionRect = section.getBoundingClientRect()
      const totalScroll = section.offsetHeight - stickyHeight
      const progress = totalScroll > 0 ? clamp(-sectionRect.top / totalScroll) : 0

      track.style.transform = `translate3d(${-progress * scrollDistance}px, 0, 0)`

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

      const fadeIn = clamp(-sectionRect.top / (stickyHeight * 0.3))
      const fadeOut = clamp(
        (-sectionRect.top - (totalScroll - stickyHeight * 0.3)) / (stickyHeight * 0.3),
      )
      overlay.style.opacity = `${Math.max(0, fadeIn - fadeOut)}`

      if (progress > 0) hasScrolled = true

      if (hasScrolled) {
        ;(viewport.style as any).WebkitMaskImage =
          'linear-gradient(to right, transparent 0, black 4rem, black calc(100% - 4rem), transparent 100%)'
        viewport.style.maskImage =
          'linear-gradient(to right, transparent 0, black 4rem, black calc(100% - 4rem), transparent 100%)'
      }

      if (progress === 0) {
        hasScrolled = false
        ;(viewport.style as any).WebkitMaskImage = 'none'
        viewport.style.maskImage = 'none'
      }
    }

    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }

    update()

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', update)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', update)
    }
  }, [items.length])

  return (
    <section ref={sectionRef} className="relative overflow-x-clip">
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-white pointer-events-none z-0"
        style={{ opacity: 0 }}
      />

      <div className="sticky top-0 flex h-[500px] w-full items-center relative z-10 md:top-[15vh] md:h-[70vh]">
        <div
          ref={inViewRef}
          className={clsx(
            FADE_BASE,
            inView ? FADE_SHOWN : FADE_HIDDEN,
            'mx-auto w-full max-w-[1120px] px-[26px] md:px-8 lg:px-12 xl:px-0',
          )}
        >
          {/* Mobile header — hidden md+ */}
          <div className="mb-2 md:hidden">
            {eyebrow && (
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#1F2BD4]">
                {eyebrow}
              </p>
            )}
            <h2 className="mt-1 text-xl font-bold leading-tight text-black">{title}</h2>
            <div className="mt-1 h-0.5 w-6 bg-[#08084F]" />
            {description && (
              <p className="mt-1 text-[10px] leading-relaxed text-black/70">{description}</p>
            )}
          </div>

          <div ref={viewportRef} className="relative w-full overflow-hidden pb-10 pt-2">
            <div ref={trackRef} className="relative flex w-max will-change-transform items-end">
              {/* Line */}
              <div className="absolute bottom-6 left-0 h-[2px] w-full bg-[#08084F]/20" />

              {/* Header item — collapsed on mobile, visible md+ */}
              <div
                className="relative flex shrink-0 flex-col justify-start overflow-hidden
                w-0 h-0 pr-0
                md:w-[420px] md:h-60 md:pr-16
                lg:w-[460px] lg:h-64"
              >
                {eyebrow && (
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#1F2BD4]">
                    {eyebrow}
                  </p>
                )}
                <h2 className="mt-2 font-bold leading-tight text-black text-3xl lg:text-5xl">
                  {title}
                </h2>
                <div className="mt-3 h-0.5 w-10 bg-[#08084F]" />
                {description && (
                  <p className="mt-3 leading-relaxed text-black/70 text-xs lg:text-base">
                    {description}
                  </p>
                )}
              </div>

              {/* Timeline items */}
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="relative flex shrink-0 flex-col justify-start
                    h-48 w-[140px] pr-4
                    sm:h-52 sm:w-[180px] sm:pr-6
                    md:h-60 md:w-80 md:pr-12
                    lg:h-64 lg:w-96 lg:pr-16"
                >
                  <h3
                    className="font-extrabold text-[#1F2BD4] truncate
                    text-base sm:text-lg md:text-3xl lg:text-4xl"
                  >
                    {item.year}
                  </h3>
                  <p
                    className="mt-1 leading-snug text-[#08084F] break-words w-full
                    text-[10px] sm:text-xs md:text-base lg:text-lg"
                  >
                    {item.description}
                  </p>
                  <div
                    data-dot
                    className="absolute bottom-4 left-0 z-10 rounded-full border-2 border-[#08084F] bg-white
                      h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 lg:h-6 lg:w-6"
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
