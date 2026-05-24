'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'
import type { VideoBlockDTO } from '@/features/homepage/home.schema'

type Props = {
  data: VideoBlockDTO
}

type PlayableVideo = VideoBlockDTO['videos'][number] & { youTubeId: string }

/**
 * Pulls the 11-character video ID out of any common YouTube URL shape,
 * or returns it unchanged if the admin pasted a bare ID.
 */
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
  const { title, description, videos } = data

  const playable: PlayableVideo[] = videos
    .map((v) => ({ ...v, youTubeId: getYouTubeId(v.url) }))
    .filter((v) => v.youTubeId)

  if (playable.length === 0) return null

  return (
    <section className="w-full overflow-x-hidden bg-white py-16 text-[#0C0C48] md:py-24">
      <div className="mx-auto w-full max-w-280 px-6.5 md:px-8 lg:px-12 xl:px-0">
        <div className="mx-auto max-w-150 text-center">
          <h2 className="text-xl leading-tight font-extrabold sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
            {title}
          </h2>

          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[#1F2BD4] md:w-20 lg:w-24" />

          {description && (
            <p className="mx-auto mt-5 text-xs leading-relaxed text-[#0C0C48]/70 sm:text-sm md:mt-6 md:text-base lg:text-lg">
              {description}
            </p>
          )}
        </div>

        <Carousel videos={playable} />
      </div>
    </section>
  )
}

function Carousel({ videos }: { videos: PlayableVideo[] }) {
  const count = videos.length

  const stageRef = useRef<HTMLDivElement | null>(null)
  const [width, setWidth] = useState(0)
  const [active, setActive] = useState(Math.floor(count / 2))
  const [playingId, setPlayingId] = useState<string | null>(null)

  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const ro = new ResizeObserver((entries) => setWidth(entries[0].contentRect.width))
    ro.observe(el)
    setWidth(el.clientWidth)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    setActive(Math.floor(count / 2))
  }, [count])

  const next = () => setActive((a) => (a + 1) % count)
  const prev = () => setActive((a) => (a - 1 + count) % count)

  // 1 video -> single large player
  if (count === 1) {
    return (
      <div className="mt-8 md:mt-12">
        <div className="mx-auto max-w-3xl">
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

  // 2 videos -> side by side
  if (count === 2) {
    return (
      <div className="mt-8 grid grid-cols-1 gap-6 md:mt-12 md:grid-cols-2 md:gap-8">
        {videos.map((v) => (
          <VideoCard
            key={v.id}
            video={v}
            playing={playingId === v.id}
            onPlay={() => setPlayingId(v.id)}
            showCaption
          />
        ))}
      </div>
    )
  }

  // 3+ videos -> looping coverflow (3 visible, arrows cycle through)
  const isMobile = width > 0 && width < 640
  const featuredW = isMobile ? width * 0.84 : Math.min(width * 0.56, 620)
  const featuredH = featuredW * (9 / 16)
  const sideScale = 0.74
  const centerGap = isMobile ? width * 0.52 : featuredW * 0.56

  const offsetOf = (i: number) => {
    let rel = (i - active + count) % count
    if (rel > count / 2) rel -= count
    return rel
  }

  return (
    <div className="mt-8 md:mt-12">
      <div className="mb-5 flex items-center justify-center gap-3 md:mb-6">
        <Arrow dir="left" onClick={prev} />
        <Arrow dir="right" onClick={next} />
      </div>

      <div ref={stageRef} className="relative w-full overflow-hidden" style={{ height: featuredH }}>
        {videos.map((v, i) => {
          const rel = offsetOf(i)
          const abs = Math.abs(rel)
          const visible = abs <= 1
          const isCenter = rel === 0

          return (
            <div
              key={v.id}
              className="absolute top-1/2 left-1/2 transition-all duration-500 ease-out"
              style={{
                width: featuredW,
                height: featuredH,
                transform: `translate(-50%, -50%) translateX(${rel * centerGap}px) scale(${isCenter ? 1 : sideScale})`,
                opacity: visible ? (isCenter ? 1 : 0.55) : 0,
                zIndex: 10 - abs,
                pointerEvents: visible ? 'auto' : 'none',
                filter: isCenter ? 'none' : 'saturate(0.85)',
              }}
            >
              <VideoCard
                video={v}
                playing={isCenter && playingId === v.id}
                onPlay={() => (isCenter ? setPlayingId(v.id) : setActive(i))}
                frameOnly
              />
            </div>
          )
        })}
      </div>

      {/* caption for the centered video */}
      <CenterCaption videos={videos} active={active} />

      <div className="mt-6 flex items-center justify-center gap-2">
        {videos.map((v, i) => (
          <button
            key={v.id}
            onClick={() => setActive(i)}
            aria-label={`Go to video ${i + 1}`}
            className="h-2 rounded-full transition-all"
            style={{
              width: i === active ? 28 : 8,
              backgroundColor: i === active ? '#1F2BD4' : 'rgba(12,12,72,0.2)',
            }}
          />
        ))}
      </div>
    </div>
  )
}

function CenterCaption({ videos, active }: { videos: PlayableVideo[]; active: number }) {
  const v = videos[active]
  if (!v || (!v.title && !v.caption)) return null
  return (
    <div key={v.id} className="mt-6 text-center" style={{ animation: 'hnuFade 0.4s ease both' }}>
      <style>{`@keyframes hnuFade { from { opacity: 0 } to { opacity: 1 } }`}</style>
      {v.title && (
        <h3 className="text-base font-extrabold leading-tight text-[#0C0C48] sm:text-lg md:text-xl">
          {v.title}
        </h3>
      )}
      {v.caption && (
        <p className="mx-auto mt-2 max-w-2xl text-xs leading-relaxed text-[#0C0C48]/70 sm:text-sm md:text-base">
          {v.caption}
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
    <figure className="h-full">
      <div className="relative h-full overflow-hidden rounded-2xl bg-black shadow-md">
        <div className={frameOnly ? 'relative h-full w-full' : 'relative aspect-video w-full'}>
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
              <img
                src={thumb}
                alt={video.title || 'Video thumbnail'}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-[#0C0C48]/25 transition group-hover:bg-[#0C0C48]/10" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#1F2BD4] transition group-hover:scale-110 md:h-16 md:w-16">
                  <Play className="ml-1 h-5 w-5 md:h-7 md:w-7" fill="currentColor" />
                </span>
              </span>
            </button>
          )}
        </div>
      </div>

      {showCaption && (video.title || video.caption) && (
        <figcaption className="mt-4 text-center">
          {video.title && (
            <h3 className="text-base font-extrabold leading-tight text-[#0C0C48] sm:text-lg md:text-xl">
              {video.title}
            </h3>
          )}
          {video.caption && (
            <p className="mx-auto mt-2 max-w-2xl text-xs leading-relaxed text-[#0C0C48]/70 sm:text-sm md:text-base">
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
      className="flex h-10 w-10 items-center justify-center rounded-full border border-[#0C0C48]/20 text-[#0C0C48] transition hover:border-[#1F2BD4] hover:bg-[#1F2BD4] hover:text-white md:h-11 md:w-11"
    >
      {dir === 'left' ? (
        <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
      ) : (
        <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
      )}
    </button>
  )
}
