import Image from 'next/image'
import { FooterDTO } from '@/features'
import { FooterLogos } from './FooterLogos'
import { FooterColumn } from './FooterColumns'
import localizedHref from '@/lib/localizedHref'
import Link from 'next/link'
import { Lang } from '@/types/lang'

type footerProps = {
  data: FooterDTO
  language: Lang
}

export default function Footer(props: footerProps) {
  const { uoaLogo, hnuLogo, exploreLinks, supportLinks, legalLinks, socialLinks, footerMotif } =
    props.data
  const lang = props.language

  return (
    <footer className="w-full bg-[#F7F7F7] text-[#0C0C48] mt-20">
      <div className="mx-auto max-w-360 px-8 pt-10 max-md:px-4 max-md:pt-8">
        <div className="grid grid-cols-[260px_1fr_1fr_220px] gap-x-10 gap-y-10 max-xl:grid-cols-2 max-md:grid-cols-1">
          <FooterLogos uoa={uoaLogo} hnu={hnuLogo} language={props.language} />

          <FooterColumn title="Explore" links={exploreLinks} language={lang} />

          <FooterColumn title="Help and support" links={supportLinks} language={lang} />

          <div>
            <h3 className="mb-4 text-[18px] font-semibold leading-none">Connect with us</h3>
            <div className="flex items-center gap-4">
              {socialLinks.map((item) => (
                <Link
                  key={item.footerURL}
                  href={localizedHref(item.footerURL, lang)}
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
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full border-t mt-4 border-[#D5D5D5]">
        <Image
          src={footerMotif.url}
          alt={footerMotif.alt}
          aria-hidden="true"
          className="block h-30 w-full object-cover"
          width={1920}
          height={120}
        />
      </div>
    </footer>
  )
}
