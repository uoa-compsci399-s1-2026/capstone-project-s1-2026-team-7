import Link from 'next/link'
import Image from 'next/image'

import { FooterLinkDTO } from '@/validation'

export type FooterColumnProps = {
  title: string
  links: FooterLinkDTO[]
}

export const FooterColumn = ({ title, links }: FooterColumnProps) => {
  return (
    <div>
      <h3 className="mb-4 text-[18px] font-semibold leading-none">{title}</h3>
      <nav className="flex flex-col gap-3">
        {links.map((link) => (
          <Link
            key={link.footerTitle}
            href={link.footerURL}
            className="text-[16px] leading-[1.35] transition hover:opacity-70"
          >
            {link.footerTitle}
          </Link>
        ))}
      </nav>
    </div>
  )
}
