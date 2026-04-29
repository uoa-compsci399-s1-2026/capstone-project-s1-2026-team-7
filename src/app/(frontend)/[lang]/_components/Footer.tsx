import React from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'
import { Icon } from '../../[lang]/_components/icons'
import { FooterDTO } from '@/validation'
import { Media } from '@/payload-types'
import { FooterLogos } from './FooterLogos'
import { FooterColumn } from './FooterColumns'

type footerProps = {
  data: FooterDTO
}

export default function Footer(props: footerProps) {
  const { uoaLogo, hnuLogo, exploreLinks, supportLinks, legalLinks, socialLinks, footerMotif } =
    props.data
  return (
    <footer className="w-full bg-[#F7F7F7] text-[#0C0C48] mt-20">
      <div className="mx-auto max-w-360 px-8 pt-10 max-md:px-4 max-md:pt-8">
        <div className="grid grid-cols-[260px_1fr_1fr_220px] gap-x-10 gap-y-10 max-xl:grid-cols-2 max-md:grid-cols-1">
          <FooterLogos uoa={uoaLogo} hnu={hnuLogo} />

          <FooterColumn title="Explore" links={exploreLinks} />

          <FooterColumn title="Help and support" links={supportLinks} />

          <FooterColumn title="Legal" links={legalLinks} />

          <div>
            <h3 className="mb-4 text-[18px] font-semibold leading-none">Connect with us</h3>
            <div className="flex items-center gap-4">
              {socialLinks.map((item) => (
                <a
                  key={item.footerURL}
                  href={item.footerURL}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.footerLogo.alt}
                  className="text-[#A8A8A8] trasnition hover:opacity-70"
                >
                  <Image
                    src={item.footerLogo.url}
                    alt={item.footerLogo.alt}
                    width={24}
                    height={24}
                    className="block"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-end pb-6 max-md:mt-8 max-md:justify-start max-md:pb-5">
          <div className="flex flex-wrap items-center text-[15px] font-medium max-md:text-[14px]">
            {legalLinks.map((item, index) => (
              <React.Fragment key={item.footerTitle}>
                <Link href={item.footerURL} className="transition hover:opacity-70">
                  {item.footerTitle}
                </Link>
                {index < legalLinks.length - 1 && <span className="px-2 text-[#0C0C48]">|</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full border-t border-[#D5D5D5]">
        <img
          src={footerMotif.url}
          alt={footerMotif.alt}
          aria-hidden="true"
          className="block h-30 w-full object-cover"
        />
      </div>
    </footer>
  )
}
