import Image from 'next/image'
import Link from 'next/link'
import type { MediaDTO } from '@/features/common/media.schema'
import { Lang } from '@/types/lang'

export type FooterLogosProps = {
  uoa: MediaDTO
  hnu: MediaDTO
  language: Lang
}

export const FooterLogos = ({ uoa, hnu, language }: FooterLogosProps) => {
  return (
    <div className="flex items-start gap-5 max-md:gap-4">
      <Link href={`/${language}`} className="block shrink-0">
        <div className="relative h-14 w-28 max-md:h-12 max-md:w-24">
          <Image
            src={uoa.url}
            alt={uoa.alt}
            fill
            sizes="112px"
            className="object-contain object-left"
          />
        </div>
      </Link>

      <div className="h-16 w-px bg-[#BFC4CC] max-md:h-12" />

      <Link href={`/${language}`} className="block shrink-0">
        <div className="relative h-14 w-24 max-md:h-12 max-md:w-20">
          <Image
            src={hnu.url}
            alt={hnu.alt}
            fill
            sizes="96px"
            className="object-contain object-left"
          />
        </div>
      </Link>
    </div>
  )
}
