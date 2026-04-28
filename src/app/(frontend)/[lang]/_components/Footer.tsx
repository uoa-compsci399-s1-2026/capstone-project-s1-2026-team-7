import React from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'
import { NavigationBarDTO } from '@/validation/navigationBar'
import { Icon } from '../../[lang]/_components/icons'

type footerProps = {
  data: NavigationBarDTO
}

const exploreLinks = [
  { label: 'About the University', href: '/about-the-university' },
  { label: 'Research', href: '/research' },
  { label: 'Collaboration', href: '/collaboration' },
  { label: 'Our Studies', href: '/studies' },
  { label: 'Our Team', href: '/ourteam' },
  { label: 'Copyright', href: '/copyright' },
]

const supportLinks = [
  { label: 'Contact us', href: '/contact' },
  { label: 'Donation', href: '/donation' },
  { label: 'Provide feedback', href: '/feedback' },
  { label: 'Complaints', href: '/complaints' },
]

const legalLinks = [
  { label: 'Accessibility', href: '/accessibility' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Disclaimer', href: '/disclaimer' },
]

const socialLinks = [
  {
    label: 'Facebook',
    href: 'https://facebook.com',
    icon: '/Fbicon.svg',
  },
  {
    label: 'UOA',
    href: 'https://linkedin.com',
    icon: '/UOAfooter.svg',
  },
]

export default function Footer(props: footerProps) {
  return (
    <footer className="w-full bg-[#F7F7F7] text-[#0C0C48]">
      <div className="mx-auto max-w-360 px-8 pt-10 max-md:px-4 max-md:pt-8">
        <div className="grid grid-cols-[260px_1fr_1fr_220px] gap-x-10 gap-y-10 max-xl:grid-cols-2 max-md:grid-cols-1">
          <FooterLogos data={props.data} />

          <FooterColumn title="Explore" links={exploreLinks} />

          <FooterColumn title="Help and support" links={supportLinks} />

          <div>
            <h3 className="mb-4 text-[18px] font-semibold leading-none">Connect with us</h3>
            <div className="flex items-center gap-4">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className="text-[#A8A8A8] transition hover:opacity-70"
                >
                  <img src={item.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-end pb-6 max-md:mt-8 max-md:justify-start max-md:pb-5">
          <div className="flex flex-wrap items-center text-[15px] font-medium max-md:text-[14px]">
            {legalLinks.map((item, index) => (
              <React.Fragment key={item.label}>
                <Link href={item.href} className="transition hover:opacity-70">
                  {item.label}
                </Link>
                {index < legalLinks.length - 1 && <span className="px-2 text-[#0C0C48]">|</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <FooterMotif />
    </footer>
  )
}

export const FooterLogos = (props: footerProps) => {
  return (
    <div className="flex items-start gap-5 max-md:gap-4">
      <Link href="/" className="relative block h-14 w-28 shrink-0 max-md:h-12 max-md:w-24">
        <Image
          src={props.data.uoaLogo.url}
          alt={props.data.uoaLogo.alt || 'University of Auckland logo'}
          fill
          sizes="112px"
          className="object-contain object-left"
        />
      </Link>

      <div className="h-16 w-px bg-[#BFC4CC] max-md:h-12" />

      <Link href="/" className="relative block h-14 w-24 shrink-0 max-md:h-12 max-md:w-20">
        <Image
          src={props.data.hnuLogo.url}
          alt={props.data.hnuLogo.alt || 'Human Nutrition Unit logo'}
          fill
          sizes="96px"
          className="object-contain object-left"
        />
      </Link>
    </div>
  )
}

export const FooterColumn = (props: {
  title: string
  links: { label: string; href: string }[]
}) => {
  return (
    <div>
      <h3 className="mb-4 text-[18px] font-semibold leading-none">{props.title}</h3>
      <nav className="flex flex-col gap-3">
        {props.links.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="text-[16px] leading-[1.35] transition hover:opacity-70"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}

export const FooterMotif = () => {
  return (
    <div className="w-full border-t border-[#D5D5D5]">
      <img
        src="/motif-footer.svg"
        alt=""
        aria-hidden="true"
        className="block h-30 w-full object-cover"
      />
    </div>
  )
}
