import Image from 'next/image'

type Props = {
  title: string
  imageUrl: string
  imageAlt: string
}

export default function CollabCategoryCard({ title, imageUrl, imageAlt }: Props) {
  return (
    <div className="w-full sm:w-[48%] lg:w-[30%] rounded-2xl overflow-hidden hover:shadow-md transition cursor-pointer">
      <div className="relative w-full h-40">
        <h3 className="text-lg font-semibold">{title}</h3>
        <Image src={imageUrl} alt={imageAlt} fill className="object-cover" />
      </div>

      {/*       <div className="p-4 text-center">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div> */}
    </div>
  )
}
