'use client'

import { useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Play, X } from 'lucide-react'
import clsx from 'clsx'

type MediaVideo = {
  id: string
  title: string
  description?: string
  videoUrl: string
  thumbnail?: {
    url: string
    alt?: string
  }
}

type MediaSectionProps = {
  data: {
    eyebrow?: string
    title: string
    description?: string
    videos: MediaVideo[]
  }
}

function MediaSection({ data }: MediaSectionProps) {
  const { eyebrow, title, description } = data

  const videos = data.videos.slice(0, 20)

  const carouselRef = useRef<HTMLDivElement | null>(null)
  const [selectedVideo, setSelectedVideo] = useState<MediaVideo | null>(null)

  const scrollCarousel = (direction: 'left' | 'right') => {
    const carousel = carouselRef.current

    if (!carousel) return

    const scrollAmount = carousel.clientWidth * 0.85

    carousel.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  if (videos.length === 0) return null

  return (
    <section className="bg-[#0C0C48] py-16 text-white md:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-300 px-6.5 md:px-8 lg:px-0">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-150">
            {eyebrow && (
              <p className="text-base font-semibold text-[#1F2BD4] md:text-lg">{eyebrow}</p>
            )}

            <h2 className="mt-3 text-4xl leading-tight font-extrabold md:text-5xl lg:text-6xl">
              {title}
            </h2>

            <div className="mt-5 h-1 w-20 rounded-full bg-[#1F2BD4] md:w-24 lg:w-32" />

            {description && (
              <p className="mt-6 max-w-120 text-base leading-snug text-white/80 md:text-lg lg:text-xl">
                {description}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous videos"
              onClick={() => scrollCarousel('left')}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-white transition hover:border-[#1F2BD4] hover:bg-[#1F2BD4]"
            >
              <ChevronLeft className="h-6 w-6" strokeWidth={2.5} />
            </button>

            <button
              type="button"
              aria-label="Next videos"
              onClick={() => scrollCarousel('right')}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-white transition hover:border-[#1F2BD4] hover:bg-[#1F2BD4]"
            >
              <ChevronRight className="h-6 w-6" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        <div
          ref={carouselRef}
          className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] md:mt-12 [&::-webkit-scrollbar]:hidden"
        >
          {videos.map((video, index) => (
            <button
              key={video.id}
              type="button"
              onClick={() => setSelectedVideo(video)}
              className="group snap-start overflow-hidden rounded-3xl bg-white text-left text-[#0C0C48] shadow-sm transition hover:-translate-y-1 hover:shadow-xl basis-72 shrink-0 md:basis-90 lg:basis-100"
            >
              <div className="relative aspect-video overflow-hidden bg-[#1F2BD4]">
                {video.thumbnail?.url ? (
                  <img
                    src={video.thumbnail.url}
                    alt={video.thumbnail.alt ?? video.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <video
                    src={video.videoUrl}
                    muted
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                )}

                <div className="absolute inset-0 bg-[#0C0C48]/30 transition group-hover:bg-[#0C0C48]/15" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#1F2BD4] transition group-hover:scale-110 md:h-16 md:w-16">
                    <Play className="ml-1 h-6 w-6 md:h-7 md:w-7" fill="currentColor" />
                  </span>
                </div>
              </div>

              <div className="p-5 md:p-6">
                <p className="text-xs font-semibold tracking-[0.18em] text-[#1F2BD4] uppercase">
                  Video {index + 1}
                </p>

                <h3 className="mt-3 text-xl leading-tight font-extrabold md:text-2xl">
                  {video.title}
                </h3>

                {video.description && (
                  <p className="mt-3 text-sm leading-snug text-[#0C0C48]/75 md:text-base">
                    {video.description}
                  </p>
                )}

                <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-[#1F2BD4]">
                  <span>Watch video</span>
                  <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </div>
            </button>
          ))}
        </div>

        <p className="mt-4 text-xs font-light tracking-[0.22em] text-white/60 uppercase md:text-sm">
          Use the arrows or swipe to explore
        </p>
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0C0C48]/90 p-6">
          <div className="w-full max-w-250">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold tracking-[0.18em] text-[#1F2BD4] uppercase">
                  Now playing
                </p>

                <h3 className="mt-1 text-2xl font-extrabold text-white md:text-3xl">
                  {selectedVideo.title}
                </h3>
              </div>

              <button
                type="button"
                aria-label="Close video"
                onClick={() => setSelectedVideo(null)}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[#0C0C48] transition hover:bg-[#1F2BD4] hover:text-white"
              >
                <X className="h-6 w-6" strokeWidth={2.5} />
              </button>
            </div>

            <div className="overflow-hidden rounded-3xl bg-black">
              <video
                src={selectedVideo.videoUrl}
                controls
                autoPlay
                playsInline
                className="aspect-video w-full"
              />
            </div>

            {selectedVideo.description && (
              <p className="mt-5 max-w-180 text-base leading-snug text-white/75 md:text-lg">
                {selectedVideo.description}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  )
}

export default MediaSection
