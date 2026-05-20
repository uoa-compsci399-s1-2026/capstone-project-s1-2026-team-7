'use client'
import { TimelineBlockDTO } from '@/features'
import { useEffect, useRef, useState } from 'react'

type TimelineItem = {
  year: string
  description: string
}

const timelineItems: TimelineItem[] = [
  {
    year: '1999',
    description:
      'Human Nutrition Unit established through NZ Dairy Board funding and purchase of Carrick Place.',
  },
  {
    year: '2000',
    description: 'Jackson Report leads to appointment of founding director Prof Sally Poppitt.',
  },
  {
    year: '2017',
    description:
      'A/Prof Jennifer Miles-Chan appointed director following strategic international recruitment from Switzerland.',
  },
  {
    year: '2020 - Present',
    description:
      'Expansion of industry partnerships, postgraduate research, and international collaborations.',
  },
  {
    year: 'Today',
    description:
      'Australasia’s only residential nutrition trial facility with global research collaborations and over $25M in trial funding to date.',
  },
]

type TimelineSectionProps = {
  data: TimelineBlockDTO
}

function TimelineSection({ data }: TimelineSectionProps) {
  const { eyebrow, title, description, items } = data

  const sectionRef = useRef<HTMLElement | null>(null)
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)

  const [translateX, setTranslateX] = useState(0)
  const translateXRef = useRef(0)

  useEffect(() => {
    const getMaxTranslate = () => {
      const viewport = viewportRef.current
      const track = trackRef.current

      if (!viewport || !track) return 0

      return Math.max(track.scrollWidth - viewport.clientWidth, 0)
    }

    const handleWheel = (event: WheelEvent) => {
      const section = sectionRef.current
      if (!section) return

      const sectionRect = section.getBoundingClientRect()
      const maxTranslate = getMaxTranslate()

      if (maxTranslate <= 0) return

      const currentTranslate = translateXRef.current
      const isScrollingDown = event.deltaY > 0
      const isScrollingUp = event.deltaY < 0

      /*
        The timeline is active when it is around the middle area
        of the screen. This means you do not have to hover directly
        over the timeline.
      */
      const activationTop = window.innerHeight * 0.25
      const activationBottom = window.innerHeight * 0.75

      const isSectionInActiveZone =
        sectionRect.top <= activationBottom && sectionRect.bottom >= activationTop

      if (!isSectionInActiveZone) return

      const canMoveRight = isScrollingDown && currentTranslate < maxTranslate
      const canMoveLeft = isScrollingUp && currentTranslate > 0

      if (canMoveRight || canMoveLeft) {
        event.preventDefault()

        const scrollSpeed = 1.15

        const nextTranslate = Math.min(
          Math.max(currentTranslate + event.deltaY * scrollSpeed, 0),
          maxTranslate,
        )

        translateXRef.current = nextTranslate
        setTranslateX(nextTranslate)
      }
    }

    const handleResize = () => {
      const maxTranslate = getMaxTranslate()

      if (translateXRef.current > maxTranslate) {
        translateXRef.current = maxTranslate
        setTranslateX(maxTranslate)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <section ref={sectionRef} className="bg-white px-6.5 py-16 md:px-8 md:py-24 lg:px-12">
      <div className="mx-auto w-full max-w-287.5">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[320px_1fr] md:items-start md:gap-10">
          {/* Left content */}
          <div className="text-left">
            <p className="text-[10px] font-semibold text-[#1F2BD4] sm:text-xs md:text-sm">
              {eyebrow}
            </p>

            <h2 className="mt-2 text-[20px] leading-tight font-extrabold text-[#08084f] sm:text-2xl md:text-3xl">
              {title}
            </h2>

            <div className="mt-3 h-0.75 w-16 rounded-full bg-[#08084f]" />

            <p className="mt-5 max-w-82.5 text-[11px] leading-snug text-[#08084f] sm:text-xs md:text-sm">
              {description}
            </p>
          </div>

          {/* Timeline viewport */}
          <div ref={viewportRef} className="overflow-hidden">
            <div
              ref={trackRef}
              className="flex w-max transition-transform duration-100 ease-out"
              style={{ transform: `translateX(-${translateX}px)` }}
            >
              {items.map((item, index) => (
                <div
                  key={`${item.year}-${index}`}
                  className="grid w-55 shrink-0 grid-rows-[96px_38px] md:w-65 md:grid-rows-[110px_42px] lg:w-72.5"
                >
                  {/* Text */}
                  <div className="pr-6">
                    <h3 className="text-sm font-extrabold text-[#1F2BD4] md:text-lg">
                      {item.year}
                    </h3>

                    <p className="mt-2 max-w-47.5 text-[10px] leading-snug text-[#08084f] md:max-w-57.5 md:text-xs">
                      {item.description}
                    </p>
                  </div>

                  {/* Dot and line */}
                  <div className="flex items-center">
                    <div
                      className={`h-8 w-8 shrink-0 rounded-full md:h-9 md:w-9 ${
                        index === 0 ? 'bg-[#1F2BD4]' : 'bg-black'
                      }`}
                    />

                    {index !== timelineItems.length - 1 && (
                      <div className="h-px flex-1 bg-[#08084f]/70" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TimelineSection
