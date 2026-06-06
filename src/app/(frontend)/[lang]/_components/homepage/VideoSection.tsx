'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'
import clsx from 'clsx'
import type { VideoBlockDTO } from '@/features/homepage/home.schema'
import { useInView } from '@/app/(frontend)/[lang]/_components/useInView'
import Image from 'next/image'
type Props = {
  data: VideoBlockDTO
}

type PlayableVideo = VideoBlockDTO['videos'][number] & { youTubeId: string }

const FADE_BASE = 'transition-all duration-700 ease-out will-change-[opacity,transform]'
const FADE_HIDDEN = 'opacity-0 translate-y-6'
const FADE_SHOWN = 'opacity-100 translate-y-0'

const CARD_DELAYS = ['delay-200', 'delay-300', 'delay-[400ms]', 'delay-500', 'delay-700']

function getYouTubeId(input: string): string {
  if (!input) return ''

  const trimmed = input.trim()

  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed

  try {
    const url = new URL(trimmed)

    if (url.hostname.includes('youtu.be')) return url.pathname.slice(1)
    if (url.pathname.startsWith('/embed/')) return url.pathname.split('/')[2] ?? ''
    if (url.pathname.startsWith('/shorts/')) return url.pathname.split('/')[2] ?? ''

    return url.searchParams.get('v') ?? ''
  } catch {
    return ''
  }
}

export default function VideoSection({ data }: Props) {
  const { title, description, videos = [] } = data
  const { ref, inView } = useInView<HTMLElement>()

  const playable: PlayableVideo[] = videos
    .map((video) => ({ ...video, youTubeId: getYouTubeId(video.url) }))
    .filter((video) => video.youTubeId)

  if (playable.length === 0) return null

  return (
    <section ref={ref} className="w-full overflow-x-hidden bg-white py-16 text-[#08084f]">
      <div className="mx-auto w-[84%] max-w-300">
        <div
          className={clsx(
            FADE_BASE,
            inView ? FADE_SHOWN : FADE_HIDDEN,
            'mx-auto max-w-150 text-center',
          )}
        >
          <h2 className="text-lg leading-tight font-extrabold text-[#08084f] sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
            {title}
          </h2>

          <div
            className={clsx(
              FADE_BASE,
              inView ? FADE_SHOWN : FADE_HIDDEN,
              inView && 'delay-100',
              'mx-auto mt-3 h-0.75 w-16 rounded-full bg-[#08084f] sm:w-18 md:mt-4 md:h-1 md:w-20 lg:w-22 xl:w-24',
            )}
          />

          {description && (
            <p
              className={clsx(
                FADE_BASE,
                inView ? FADE_SHOWN : FADE_HIDDEN,
                inView && 'delay-200',
                'mx-auto mt-5 text-xs leading-relaxed font-medium text-[#08084f]/70 sm:text-xs md:mt-6 md:text-sm lg:text-base xl:text-lg',
              )}
            >
              {description}
            </p>
          )}
        </div>

        <Carousel videos={playable} inView={inView} />
      </div>
    </section>
  )
}

function Carousel({ videos, inView }: { videos: PlayableVideo[]; inView: boolean }) {
  const count = videos.length

  const stageRef = useRef<HTMLDivElement | null>(null)
  const [width, setWidth] = useState(0)
  const [active, setActive] = useState(Math.floor(count / 2))
  const [playingId, setPlayingId] = useState<string | null>(null)

  useEffect(() => {
    const element = stageRef.current
    if (!element) return

    const resizeObserver = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width)
    })

    resizeObserver.observe(element)
    setWidth(element.clientWidth)

    return () => resizeObserver.disconnect()
  }, [])

  const next = () => {
    setPlayingId(null)
    setActive((current) => (current + 1) % count)
  }

  const prev = () => {
    setPlayingId(null)
    setActive((current) => (current - 1 + count) % count)
  }

  if (count === 1) {
    return (
      <div
        className={clsx(
          FADE_BASE,
          inView ? FADE_SHOWN : FADE_HIDDEN,
          inView && 'delay-200',
          'mt-8 sm:mt-10 md:mt-12 lg:mt-14 xl:mt-16',
        )}
      >
        <div className="mx-auto max-w-4xl">
          <VideoCard
            video={videos[0]}
            playing={playingId === videos[0].id}
            onPlay={() => setPlayingId(videos[0].id)}
            showCaption
          />
        </div>
      </div>
    )
  }

  if (count === 2) {
    return (
      <div className="mt-8 grid grid-cols-1 items-start gap-y-12 sm:mt-10 md:mt-12 md:grid-cols-2 md:gap-x-8 md:gap-y-0 lg:mt-14 xl:mt-16">
        {videos.map((video, index) => (
          <div
            key={video.id}
            className={clsx(
              FADE_BASE,
              inView ? FADE_SHOWN : FADE_HIDDEN,
              inView && CARD_DELAYS[index % CARD_DELAYS.length],
            )}
          >
            <VideoCard
              video={video}
              playing={playingId === video.id}
              onPlay={() => setPlayingId(video.id)}
              showCaption
            />
          </div>
        ))}
      </div>
    )
  }

  const isMobile = width > 0 && width < 640
  const featuredW = isMobile ? width * 0.84 : Math.min(width * 0.56, 620)
  const featuredH = featuredW * (9 / 16)
  const sideScale = 0.74
  const centerGap = isMobile ? width * 0.52 : featuredW * 0.56

  const offsetOf = (index: number) => {
    let relativePosition = (index - active + count) % count

    if (relativePosition > count / 2) {
      relativePosition -= count
    }

    return relativePosition
  }

  return (
    <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-14 xl:mt-16">
      <div
        className={clsx(
          FADE_BASE,
          inView ? FADE_SHOWN : FADE_HIDDEN,
          inView && 'delay-200',
          'mb-5 flex items-center justify-center gap-3 sm:mb-6 md:mb-7 lg:mb-8',
        )}
      >
        <Arrow dir="left" onClick={prev} />
        <Arrow dir="right" onClick={next} />
      </div>

      <div
        ref={stageRef}
        className={clsx(
          FADE_BASE,
          inView ? FADE_SHOWN : FADE_HIDDEN,
          inView && 'delay-300',
          'relative w-full overflow-hidden',
        )}
        style={{ height: featuredH }}
      >
        {videos.map((video, index) => {
          const relativePosition = offsetOf(index)
          const distance = Math.abs(relativePosition)
          const visible = distance <= 1
          const isCenter = relativePosition === 0

          return (
            <div
              key={video.id}
              className="absolute top-1/2 left-1/2 transition-all duration-500 ease-out"
              style={{
                width: featuredW,
                height: featuredH,
                transform: `translate(-50%, -50%) translateX(${
                  relativePosition * centerGap
                }px) scale(${isCenter ? 1 : sideScale})`,
                opacity: visible ? (isCenter ? 1 : 0.55) : 0,
                zIndex: 10 - distance,
                pointerEvents: visible ? 'auto' : 'none',
                filter: isCenter ? 'none' : 'saturate(0.85)',
              }}
            >
              <VideoCard
                video={video}
                playing={isCenter && playingId === video.id}
                onPlay={() => (isCenter ? setPlayingId(video.id) : setActive(index))}
                frameOnly
              />
            </div>
          )
        })}
      </div>

      <CenterCaption videos={videos} active={active} inView={inView} />

      <div
        className={clsx(
          FADE_BASE,
          inView ? FADE_SHOWN : FADE_HIDDEN,
          inView && 'delay-[400ms]',
          'mt-6 flex items-center justify-center gap-2 sm:mt-7 md:mt-8',
        )}
      >
        <button
          type="button"
          onClick={prev}
          aria-label="Previous video"
          className="h-2 w-2 rounded-full bg-[#08084f]/25 transition hover:bg-[#08084f]/40"
        />

        <button
          type="button"
          onClick={() => setActive(active)}
          aria-label="Current video"
          className="h-2.5 w-2.5 rounded-full bg-[#08084f]/35 transition hover:bg-[#08084f]/45"
        />

        <button
          type="button"
          onClick={next}
          aria-label="Next video"
          className="h-2 w-2 rounded-full bg-[#08084f]/25 transition hover:bg-[#08084f]/40"
        />
      </div>
    </div>
  )
}

function CenterCaption({
  videos,
  active,
  inView,
}: {
  videos: PlayableVideo[]
  active: number
  inView: boolean
}) {
  const video = videos[active]

  if (!video || (!video.title && !video.caption)) return null

  return (
    <div
      key={video.id}
      className={clsx(
        FADE_BASE,
        inView ? FADE_SHOWN : FADE_HIDDEN,
        inView && 'delay-300',
        'mt-6 text-center sm:mt-7 md:mt-8',
      )}
    >
      {video.title && (
        <h3 className="text-sm leading-tight font-bold text-[#08084f] sm:text-base md:text-lg lg:text-xl xl:text-2xl">
          {video.title}
        </h3>
      )}

      {video.caption && (
        <p className="mx-auto mt-2 max-w-2xl text-xs leading-relaxed text-[#08084f]/70 sm:text-xs md:text-sm lg:text-base xl:text-lg">
          {video.caption}
        </p>
      )}
    </div>
  )
}

function VideoCard({
  video,
  playing,
  onPlay,
  showCaption,
  frameOnly,
}: {
  video: PlayableVideo
  playing: boolean
  onPlay: () => void
  showCaption?: boolean
  frameOnly?: boolean
}) {
  const thumb = `https://img.youtube.com/vi/${video.youTubeId}/hqdefault.jpg`

  return (
    <figure className={frameOnly ? 'h-full' : 'h-auto'}>
      <div
        className={clsx(
          'relative w-full overflow-hidden rounded-xl bg-black shadow-md sm:rounded-2xl',
          frameOnly ? 'h-full' : 'aspect-video',
        )}
      >
        {playing ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${video.youTubeId}?autoplay=1&rel=0`}
            title={video.title || 'YouTube video'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={onPlay}
            aria-label={`Play ${video.title || 'video'}`}
            className="group absolute inset-0 h-full w-full"
          >
            <div className="relative h-full w-full overflow-hidden">
              <Image
                fill
                src={thumb}
                alt={video.title || 'Video thumbnail'}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </div>

            <span className="absolute inset-0 bg-[#08084f]/25 transition group-hover:bg-[#08084f]/10" />

            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#1F2BD4] transition group-hover:scale-110 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 xl:h-18 xl:w-18">
                <Play className="ml-1 h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7" fill="currentColor" />
              </span>
            </span>
          </button>
        )}
      </div>

      {showCaption && (video.title || video.caption) && (
        <figcaption className="mt-5 text-center sm:mt-6 md:mt-7">
          {video.title && (
            <h3 className="mx-auto max-w-xl text-sm leading-tight font-bold text-[#08084f] sm:text-base md:text-lg lg:text-xl">
              {video.title}
            </h3>
          )}

          {video.caption && (
            <p className="mx-auto mt-2 max-w-2xl text-xs leading-relaxed text-[#08084f]/70 sm:text-xs md:text-sm lg:text-base xl:text-lg">
              {video.caption}
            </p>
          )}
        </figcaption>
      )}
    </figure>
  )
}

function Arrow({ dir, onClick }: { dir: 'left' | 'right'; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={dir === 'left' ? 'Previous video' : 'Next video'}
      onClick={onClick}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-[#08084f]/20 text-[#08084f] transition hover:border-[#1F2BD4] hover:bg-[#1F2BD4] hover:text-white sm:h-11 sm:w-11 md:h-12 md:w-12 lg:h-13 lg:w-13 xl:h-14 xl:w-14"
    >
      {dir === 'left' ? (
        <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" strokeWidth={2.5} />
      ) : (
        <ChevronRight className="h-5 w-5 md:h-6 md:w-6" strokeWidth={2.5} />
      )}
    </button>
  )
}
