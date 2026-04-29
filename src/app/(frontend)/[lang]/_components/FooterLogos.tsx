import Image from 'next/image'
import Link from 'next/link'
import { MediaDTO } from '@/validation'

export type FooterLogosProps = {
  uoa: MediaDTO
  hnu: MediaDTO
}
export const FooterLogos = ({ uoa, hnu }: FooterLogosProps) => {
  return (
    <div className="flex items-start gap-5 max-md:gap-4">
      <Link href="/" className="relative block h-14 w-28 shrink-0 max-md:h-12 max-md:w-24">
        <Image
          src={uoa.url}
          alt={uoa.alt}
          fill
          sizes="112px"
          className="object-contain object-left"
        />
      </Link>

      <div className="h-16 w-px bg-[#BFC4CC] max-md:h-12" />

      <Link href="/" className="relative block h-14 w-24 shrink-0 max-md:h-12 max-md:w-20">
        <Image
          src={hnu.url}
          alt={hnu.alt}
          fill
          sizes="96px"
          className="object-contain object-left"
        />
      </Link>
    </div>
  )
}
