import Image from 'next/image'

type StudyPreviewCardProps = {
  title: string
  imageUrl: string
  imageAlt: string
}

export default function StudyPreviewCard({ title, imageUrl, imageAlt }: StudyPreviewCardProps) {
  return (
    <div className="group relative h-52 w-full overflow-hidden rounded-4xl md:h-64">
      <Image
        src={imageUrl}
        alt={imageAlt}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-[#08084f]/65" />

      <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
        <h3 className="text-2xl font-bold text-white md:text-3xl">{title}</h3>
      </div>
    </div>
  )
}
