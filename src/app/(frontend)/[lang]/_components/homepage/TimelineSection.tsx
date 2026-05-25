'use client'

import { useEffect, useRef, useState } from 'react'
import { useLenis } from 'lenis/react'
import clsx from 'clsx'
import { TimelineBlockDTO } from '@/features'
import { useInView } from '@/app/(frontend)/[lang]/_components/useInView'

type TimelineSectionProps = {
  data: TimelineBlockDTO
}

const FADE_BASE = 'transition-all duration-700 ease-out will-change-[opacity,transform]'
const FADE_HIDDEN = 'opacity-0 translate-y-6'
const FADE_SHOWN = 'opacity-100 translate-y-0'

function TimelineSection({ data }: TimelineSectionProps) {
  const { eyebrow, title, description, items } = data

  const sectionRef = useRef<HTMLElement | null>(null)
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)

  const [extra, setExtra] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)

  const activeIndexRef = useRef(0)
  const hasScrolledRef = useRef(false)

  const { ref: inViewRef, inView } = useInView<HTMLDivElement>()

  useEffect(() => {
    const recalc = () => {
      const viewport = viewportRef.current
      const track = trackRef.current

      if (!viewport || !track) return

      setExtra(Math.max(track.scrollWidth - viewport.clientWidth, 0))
    }

    recalc()

    const resizeObserver = new ResizeObserver(recalc)

    if (viewportRef.current) resizeObserver.observe(viewportRef.current)
    if (trackRef.current) resizeObserver.observe(trackRef.current)

    window.addEventListener('resize', recalc)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', recalc)
    }
  }, [items.length])

  useLenis(
    (lenis) => {
      const section = sectionRef.current
      const viewport = viewportRef.current
      const track = trackRef.current

      if (!section || !viewport || !track || extra <= 0) return

      const rect = section.getBoundingClientRect()
      const sectionTop = rect.top + lenis.scroll

      const progress = Math.min(Math.max((lenis.scroll - sectionTop) / extra, 0), 1)

      track.style.transform = `translate3d(${-progress * extra}px, 0, 0)`

      const nextActiveIndex = items.length > 1 ? Math.round(progress * (items.length - 1)) : 0

      if (nextActiveIndex !== activeIndexRef.current) {
        activeIndexRef.current = nextActiveIndex
        setActiveIndex(nextActiveIndex)
      }

      if (progress > 0.01) {
        hasScrolledRef.current = true
      }

      if (hasScrolledRef.current) {
        ;(viewport.style as any).WebkitMaskImage =
          'linear-gradient(to right, transparent 0, black 4rem, black 100%)'
        viewport.style.maskImage =
          'linear-gradient(to right, transparent 0, black 4rem, black 100%)'
      }

      if (progress <= 0.01) {
        hasScrolledRef.current = false
        ;(viewport.style as any).WebkitMaskImage = 'none'
        viewport.style.maskImage = 'none'
      }
    },
    [extra, items.length],
  )

  const isTimelineComplete = activeIndex === items.length - 1

  return (
    <section
      ref={sectionRef}
      id="our-history"
      className="relative overflow-x-clip bg-white"
      style={{ height: extra > 0 ? `calc(100vh + ${extra}px)` : '100vh' }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div ref={inViewRef} className="mx-auto w-full max-w-300 px-6.5 md:px-8 lg:px-12 xl:px-0">
          <article className={clsx(FADE_BASE, inView ? FADE_SHOWN : FADE_HIDDEN, 'mb-8 md:hidden')}>
            {eyebrow && <p className="text-sm font-semibold text-[#1F2BD4]">{eyebrow}</p>}

            <h2 className="mt-3 text-[22px] leading-tight font-extrabold text-[#08084f] sm:text-2xl">
              {title}
            </h2>

            <div className="mt-3 h-0.75 w-16 rounded-full bg-[#08084f]" />

            {description && (
              <p className="mt-5 max-w-80 text-sm leading-snug font-normal text-[#08084f]">
                {description}
              </p>
            )}
          </article>

          <div ref={viewportRef} className="overflow-hidden">
            <div ref={trackRef} className="relative flex w-max items-start will-change-transform">
              <article
                className={clsx(
                  FADE_BASE,
                  inView ? FADE_SHOWN : FADE_HIDDEN,
                  'mr-14 hidden h-72 w-80 shrink-0 md:block lg:mr-20 lg:h-80 lg:w-92 xl:w-100',
                )}
              >
                {eyebrow && (
                  <p className="text-sm font-semibold text-[#1F2BD4] lg:text-base">{eyebrow}</p>
                )}

                <h2 className="mt-3 text-[28px] leading-tight font-extrabold text-[#08084f] lg:text-[32px] xl:text-4xl">
                  {title}
                </h2>

                <div className="mt-4 h-1 w-20 rounded-full bg-[#08084f] lg:w-22 xl:w-24" />

                {description && (
                  <p className="mt-6 max-w-90 text-sm leading-snug font-normal text-[#08084f] lg:text-base">
                    {description}
                  </p>
                )}
              </article>

              {items.map((item, index) => {
                const isActive = index === activeIndex

                return (
                  <article
                    key={`${item.year}-${index}`}
                    className={clsx(
                      FADE_BASE,
                      inView ? FADE_SHOWN : FADE_HIDDEN,
                      'relative grid h-64 w-52 shrink-0 grid-rows-[1fr_3rem] md:h-72 md:w-64 md:grid-rows-[1fr_4rem] lg:h-80 lg:w-72',
                    )}
                    style={{ transitionDelay: inView ? `${150 + index * 100}ms` : '0ms' }}
                  >
                    <div className="pr-7 md:pr-9">
                      <h3
                        className={clsx(
                          'text-xl leading-tight font-extrabold transition-colors duration-300 md:text-2xl lg:text-3xl',
                          isActive ? 'text-[#1F2BD4]' : 'text-[#08084f]',
                        )}
                      >
                        {item.year}
                      </h3>

                      <p className="mt-3 max-w-48 text-[10px] leading-snug font-normal text-[#08084f] sm:text-xs md:max-w-58 md:text-sm">
                        {item.description}
                      </p>
                    </div>

                    <div className="relative flex items-center">
                      <span
                        aria-hidden="true"
                        className={clsx(
                          'block shrink-0 rounded-full transition-all duration-300',
                          isActive
                            ? 'h-6 w-6 bg-[#1F2BD4] md:h-7 md:w-7 lg:h-8 lg:w-8'
                            : 'h-4 w-4 bg-black md:h-5 md:w-5 lg:h-6 lg:w-6',
                        )}
                      />

                      <span aria-hidden="true" className="h-px flex-1 bg-black" />
                    </div>
                  </article>
                )
              })}
            </div>
          </div>

          <div
            className={clsx(
              FADE_BASE,
              inView ? FADE_SHOWN : FADE_HIDDEN,
              'mt-7 flex items-center gap-3 text-[10px] font-bold tracking-[0.22em] text-[#1F2BD4] uppercase md:text-xs lg:text-sm',
            )}
            style={{ transitionDelay: inView ? '500ms' : '0ms' }}
          >
            <span>{isTimelineComplete ? 'Timeline complete' : 'Scroll to explore'}</span>

            <span
              aria-hidden="true"
              className={clsx(
                'inline-block transition-transform duration-300',
                isTimelineComplete ? 'translate-x-0' : 'animate-pulse',
              )}
            >
              →
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TimelineSection
