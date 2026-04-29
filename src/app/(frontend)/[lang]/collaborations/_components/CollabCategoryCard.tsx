import Image from 'next/image'
import Link from 'next/link'

type Props = {
  title: string
  imageUrl: string
  imageAlt: string
  href: string
}

export default function CollabCategoryCard({ title, imageUrl, imageAlt, href }: Props) {
  return (
    <Link href={href} className="w-full sm:w-[48%] lg:w-[30%] block">
      <div className="rounded-full overflow-hidden cursor-pointer hover:shadow-md transition">
        <div className="relative w-full h-24">
          <Image src={imageUrl} alt={imageAlt} fill className="object-cover" />

          <div className="absolute inset-0 bg-[#0C0C48] opacity-[0.7]" />

          <div className="absolute inset-0 flex items-center justify-center">
            <h3 className="text-white text-lg font-semibold">{title}</h3>
          </div>
        </div>
      </div>
    </Link>
  )
}
