import Link from 'next/link'
import localizedHref from '@/lib/localizedHref'

import type { FooterLinkDTO } from '@/features/footer/footer.schema'
import { Lang } from '@/types/lang'

export type FooterColumnProps = {
  title: string
  links: FooterLinkDTO[]
  language: Lang
}

export const FooterColumn = ({ title, links, language }: FooterColumnProps) => {
  return (
    <div>
      <h3 className="mb-4 text-[18px] font-semibold leading-none">{title}</h3>
      <nav className="flex flex-col gap-3">
        {links.map((link) => (
          <Link
            key={link.footerTitle}
            href={localizedHref(link.footerURL, language)}
            className="text-[16px] leading-[1.35] transition hover:opacity-70"
          >
            {link.footerTitle}
          </Link>
        ))}
      </nav>
    </div>
  )
}
