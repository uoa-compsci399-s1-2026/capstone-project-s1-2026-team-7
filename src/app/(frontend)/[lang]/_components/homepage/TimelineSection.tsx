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

    return () => resizeObserver.disconnect()
  }, [items.length])

  useLenis(
    (lenis) => {
      const section = sectionRef.current
      const track = trackRef.current

      if (!section || !track || extra <= 0) return

      const rect = section.getBoundingClientRect()
      const sectionTop = rect.top + lenis.scroll

      const progress = Math.min(Math.max((lenis.scroll - sectionTop) / extra, 0), 1)

      track.style.transform = `translate3d(${-progress * extra}px, 0, 0)`

      const nextActiveIndex = items.length > 1 ? Math.round(progress * (items.length - 1)) : 0

      if (nextActiveIndex !== activeIndexRef.current) {
        activeIndexRef.current = nextActiveIndex
        setActiveIndex(nextActiveIndex)
      }
    },
    [extra, items.length],
  )

  const isTimelineComplete = activeIndex === items.length - 1

  return (
    <section
      ref={sectionRef}
      id="our-history"
      className="relative bg-white"
      style={{ height: extra > 0 ? `calc(100vh + ${extra}px)` : '100vh' }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div ref={inViewRef} className="mx-auto w-full max-w-280 px-6.5 md:px-8 lg:px-0">
          <article
            className={clsx(FADE_BASE, inView ? FADE_SHOWN : FADE_HIDDEN, 'mb-10 md:hidden')}
          >
            <p className="text-base font-semibold text-[#1F2BD4]">{eyebrow}</p>

            <h2 className="mt-3 text-4xl leading-tight font-extrabold text-[#08084f]">{title}</h2>

            <div className="mt-4 h-1 w-20 rounded-full bg-[#08084f]" />

            <p className="mt-6 max-w-80 text-base leading-snug text-[#08084f]">{description}</p>
          </article>

          <div ref={viewportRef} className="overflow-hidden">
            <div ref={trackRef} className="flex w-max items-start will-change-transform">
              <article
                className={clsx(
                  FADE_BASE,
                  inView ? FADE_SHOWN : FADE_HIDDEN,
                  'mr-20 hidden h-88 w-90 shrink-0 md:block lg:mr-24 lg:w-105',
                )}
              >
                <p className="text-lg font-semibold text-[#1F2BD4] lg:text-xl">{eyebrow}</p>

                <h2 className="mt-4 text-5xl leading-tight font-extrabold text-[#08084f] lg:text-6xl">
                  {title}
                </h2>

                <div className="mt-5 h-1 w-24 rounded-full bg-[#08084f] lg:w-32" />

                <p className="mt-8 max-w-100 text-lg leading-snug text-[#08084f] lg:text-xl">
                  {description}
                </p>
              </article>

              {items.map((item, index) => {
                const isActive = index === activeIndex

                return (
                  <article
                    key={`${item.year}-${index}`}
                    className={clsx(
                      FADE_BASE,
                      inView ? FADE_SHOWN : FADE_HIDDEN,
                      'relative grid h-75 w-60 shrink-0 grid-rows-[1fr_3.5rem] md:h-88 md:w-72 md:grid-rows-[1fr_4rem] lg:w-80',
                      index !== items.length - 1 &&
                        'after:absolute after:bottom-7 after:left-5 after:-right-5 after:z-0 after:h-px after:bg-[#08084f]/70 md:after:bottom-8 md:after:left-6 md:after:-right-6 lg:after:left-8 lg:after:-right-8',
                    )}
                    style={{
                      transitionDelay: inView ? `${150 + index * 100}ms` : '0ms',
                    }}
                  >
                    <div className="pr-8 md:pr-10">
                      <h3
                        className={clsx(
                          'text-2xl font-extrabold transition-colors duration-300 md:text-3xl lg:text-4xl',
                          isActive ? 'text-[#1F2BD4]' : 'text-[#08084f]',
                        )}
                      >
                        {item.year}
                      </h3>

                      <p className="mt-4 max-w-55 text-sm leading-snug text-[#08084f] md:max-w-64 md:text-lg">
                        {item.description}
                      </p>
                    </div>

                    <div className="relative z-10 flex items-center">
                      <span
                        aria-hidden="true"
                        className="relative z-10 flex h-10 w-16 items-center bg-white pr-2 md:h-12 md:w-20 lg:h-16 lg:w-24"
                      >
                        <span
                          className={clsx(
                            'h-0.5 flex-1 transition-colors duration-300',
                            isActive ? 'bg-[#1F2BD4]' : 'bg-black',
                          )}
                        />

                        <span
                          className={clsx(
                            '-ml-2 block h-3 w-3 rotate-[-45deg] border-r-2 border-b-2 transition-colors duration-300 md:h-4 md:w-4 lg:h-5 lg:w-5 lg:border-r-4 lg:border-b-4',
                            isActive ? 'border-[#1F2BD4]' : 'border-black',
                          )}
                        />
                      </span>
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
              'mt-8 flex items-center gap-3 text-xs font-bold tracking-[0.22em] text-[#1F2BD4] uppercase md:text-sm',
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
