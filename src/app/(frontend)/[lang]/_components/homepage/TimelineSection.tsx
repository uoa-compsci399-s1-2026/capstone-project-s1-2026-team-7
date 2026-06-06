'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
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

const TITLE_TEXT_SIZE = 'text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl'
const BODY_TEXT_SIZE = 'text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl'
const EYEBROW_TEXT_SIZE = 'text-sm sm:text-base md:text-lg lg:text-xl'

function setViewportMask(element: HTMLElement, value: string) {
  element.style.setProperty('-webkit-mask-image', value)
  element.style.setProperty('mask-image', value)
}

export default function TimelineSection({ data }: TimelineSectionProps) {
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

  const applyTimelineScroll = useCallback(() => {
    const section = sectionRef.current
    const viewport = viewportRef.current
    const track = trackRef.current

    if (!section || !viewport || !track || extra <= 0) return

    const rect = section.getBoundingClientRect()
    const progress = Math.min(Math.max(-rect.top / extra, 0), 1)

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
      setViewportMask(viewport, 'linear-gradient(to right, transparent 0, black 3rem, black 100%)')
    }

    if (progress <= 0.01) {
      hasScrolledRef.current = false
      setViewportMask(viewport, 'none')
    }
  }, [extra, items.length])

  useLenis(() => applyTimelineScroll())

  useEffect(() => {
    let raf = 0

    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(applyTimelineScroll)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    raf = requestAnimationFrame(applyTimelineScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [applyTimelineScroll])

  const isTimelineComplete = activeIndex === items.length - 1

  return (
    <section
      ref={sectionRef}
      id="our-history"
      className="relative overflow-x-clip bg-white"
      style={{ height: extra > 0 ? `calc(100svh + ${extra}px)` : '100svh' }}
    >
      <div className="sticky top-0 flex h-svh items-center overflow-hidden md:h-dvh">
        <div ref={inViewRef} className="mx-auto flex w-[84%] max-w-300 flex-col justify-center">
          <article className={clsx(FADE_BASE, inView ? FADE_SHOWN : FADE_HIDDEN, 'mb-8 md:hidden')}>
            {eyebrow && (
              <p className={clsx('font-semibold text-[#1F2BD4]', EYEBROW_TEXT_SIZE)}>{eyebrow}</p>
            )}

            <h2
              className={clsx('mt-3 leading-tight font-extrabold text-[#08084f]', TITLE_TEXT_SIZE)}
            >
              {title}
            </h2>

            <div className="mt-4 h-1 w-16 rounded-full bg-[#08084f] sm:w-20 md:w-24" />

            {description && (
              <p
                className={clsx(
                  'mt-5 max-w-sm leading-relaxed font-normal text-[#08084f] sm:max-w-lg',
                  BODY_TEXT_SIZE,
                )}
              >
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
                  'mr-12 hidden h-72 w-72 shrink-0 md:block lg:mr-16 lg:h-80 lg:w-80 xl:mr-20 xl:h-96 xl:w-96',
                )}
              >
                {eyebrow && (
                  <p className={clsx('font-semibold text-[#1F2BD4]', EYEBROW_TEXT_SIZE)}>
                    {eyebrow}
                  </p>
                )}

                <h2
                  className={clsx(
                    'mt-4 leading-tight font-extrabold text-[#08084f]',
                    TITLE_TEXT_SIZE,
                  )}
                >
                  {title}
                </h2>

                <div className="mt-5 h-1 w-20 rounded-full bg-[#08084f] md:w-24 lg:w-28" />

                {description && (
                  <p
                    className={clsx(
                      'mt-7 max-w-sm leading-relaxed font-normal text-[#08084f] md:max-w-md lg:max-w-lg',
                      BODY_TEXT_SIZE,
                    )}
                  >
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
                      'relative flex h-64 w-72 shrink-0 flex-col justify-between sm:h-72 sm:w-80 md:h-80 md:w-88 lg:h-88 lg:w-96 xl:h-96 xl:w-100',
                    )}
                    style={{ transitionDelay: inView ? `${150 + index * 100}ms` : '0ms' }}
                  >
                    <div className="pr-8">
                      <h3
                        className={clsx(
                          'leading-tight font-extrabold transition-colors duration-300',
                          TITLE_TEXT_SIZE,
                          isActive ? 'text-[#1F2BD4]' : 'text-[#08084f]',
                        )}
                      >
                        {item.year}
                      </h3>

                      <p
                        className={clsx(
                          'mt-4 max-w-xs leading-relaxed font-normal text-[#08084f] sm:max-w-sm md:mt-5 lg:max-w-md',
                          BODY_TEXT_SIZE,
                        )}
                      >
                        {item.description}
                      </p>
                    </div>

                    <div className="relative flex items-center">
                      <span
                        aria-hidden="true"
                        className={clsx(
                          'block shrink-0 rounded-full transition-all duration-300',
                          isActive
                            ? 'h-7 w-7 bg-[#1F2BD4] sm:h-8 sm:w-8 md:h-9 md:w-9 lg:h-10 lg:w-10 xl:h-11 xl:w-11'
                            : 'h-5 w-5 bg-black sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 xl:h-9 xl:w-9',
                        )}
                      />

                      <span aria-hidden="true" className="h-0.5 flex-1 bg-black" />
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
              'mt-6 flex items-center gap-3 text-xs font-bold tracking-widest text-[#1F2BD4] uppercase sm:text-sm md:mt-7 lg:mt-8 lg:text-base',
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
