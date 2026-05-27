'use client'
import React, { useState, PropsWithChildren, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { LanguageDropdown } from './LanguageDropdown'
import { useRouter } from 'next/navigation'
import getLocalizedHref from '@/lib/localizedHref'
import { useLanguage } from '@/app/context/LanguageContext'

import Link from 'next/link'
import Image from 'next/image'
import { NavigationBarDTO } from '@/features/navigationBar'

type navbarProps = {
  data: NavigationBarDTO
}

export default function Navbar(props: navbarProps) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()
  const { lang } = useLanguage()

  return (
    <>
      {/* Mobile full-screen overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#F7F7F7] md:hidden">
          {/* Top row — mirrors the header */}
          <div className="flex h-17 shrink-0 items-center justify-between px-4">
            <NavigationLogos data={props.data} />
            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#6B6F76] text-[#000000] transition hover:bg-[#ECECEC]"
            >
              <Image src="/XIcon.svg" alt="" width={14} height={14} aria-hidden />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex flex-1 flex-col px-4 pt-2">
            {props.data.navbarLinks.map((item, index) => (
              <Link
                key={index}
                href={getLocalizedHref(item.navURL, lang)}
                className="border-b border-[#E8E8E8] py-4 text-[22px] font-medium text-[#0C0C48] transition hover:opacity-70"
              >
                {item.navTitle}
              </Link>
            ))}
          </nav>

          {/* Bottom section — search + contact */}
          <div className="flex shrink-0 flex-col gap-3 px-4 pb-8 pt-4">
            <div className="flex items-center gap-2">
              <div className="flex h-11 flex-1 items-center gap-2 rounded-full border border-[#C9CDD4] bg-white px-4">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-transparent text-[13px] text-[#18214D] outline-none placeholder:text-[#9AA1AC]"
                />
              </div>
              <button
                aria-label="Search"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#2F3FE6] transition hover:opacity-90"
              >
                <Image
                  src="/WhiteMagnifyingGlassIcon.svg"
                  alt=""
                  width={15}
                  height={15}
                  aria-hidden
                />
              </button>
            </div>
            <button
              onClick={() => router.push(`/${lang}/contact`)}
              className="h-11 w-full rounded-full bg-[#2F3FE6] text-[13px] font-medium text-white transition hover:opacity-90"
            >
              Contact
            </button>
          </div>
        </div>
      )}

      <header className="w-full border-b border-border bg-[#F7F7F7]">
        <div className="mx-auto flex h-17 max-w-360 items-center justify-between px-8 max-md:px-4">
          <NavigationLogos data={props.data} />
          {!searchOpen && (
            <nav className="hidden md:flex items-center gap-8 text-[#0C0C48]">
              {props.data.navbarLinks.map((item, index) => (
                <Link
                  key={index}
                  href={getLocalizedHref(item.navURL, lang)}
                  className="text-[#0C0C48] text-[13px] font-medium transition hover:opacity-70"
                >
                  {item.navTitle}
                </Link>
              ))}
            </nav>
          )}

          <div className="flex items-center gap-3">
            {!searchOpen ? (
              <>
                <LanguageDropdown className="hidden md:inline-flex" />
                <ContactButton className="hidden md:inline-flex h-8 w-18 items-center justify-center rounded-full bg-[#2F3FE6] text-[12px] font-medium text-white transition hover:opacity-90" />
                <SearchButton
                  className=""
                  onClick={() => {
                    setSearchOpen(true)
                    setMobileMenuOpen(false)
                  }}
                />
                <MenuButton className="" onClick={() => setMobileMenuOpen((prev) => !prev)} />
              </>
            ) : (
              <div className="flex items-center gap-2">
                <div className="flex h-9.5 w-70 max-md:w-45 items-center rounded-full border border-[#C9CDD4] bg-white px-4">
                  <Image src="/MagnifyingGlassIcon.svg" alt="" width={15} height={15} aria-hidden />
                  <input
                    autoFocus
                    type="text"
                    placeholder="Search"
                    className="w-full bg-transparent text-[13px] text-[#18214D] outline-none placeholder:text-[#9AA1AC]"
                  />
                </div>
                <button
                  onClick={() => setSearchOpen(false)}
                  aria-label="Close search"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[#6B6F76] text-[#000000] transition hover:bg-[#ECECEC]"
                >
                  <Image src="/XIcon.svg" alt="" width={14} height={14} aria-hidden />
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  )
}

export const NavigationButton = ({ children }: PropsWithChildren) => {
  return (
    <Link href="#" className="text-[#0C0C48] text-[13px] font-medium transition hover:opacity-70">
      {children}
    </Link>
  )
}

type NavigationLogosProps = {
  data: NavigationBarDTO
}

export const NavigationLogos = ({ data }: NavigationLogosProps) => {
  const { lang } = useLanguage()

  return (
    <div className="flex shrink-0 items-center gap-4 max-md:gap-3">
      <div className="flex h-8 w-16 shrink-0 items-center">
        <Link href={`/${lang}`} className="relative block h-full w-full">
          <Image
            src={data.uoaLogo.url}
            alt={data.uoaLogo.alt}
            sizes="80px"
            fill
            className="object-contain"
          />
        </Link>
      </div>

      <div className="h-9 w-px bg-[#BFC4CC]" />

      <div className="flex h-8 w-16 shrink-0 items-center">
        <Link href={`/${lang}`} className="relative block h-full w-full">
          <Image
            src={data.hnuLogo.url}
            alt={data.hnuLogo.alt}
            fill
            sizes="80px"
            className="object-contain"
          />
        </Link>
      </div>
    </div>
  )
}

type ContactButtonProps = {
  className: string
}

const ContactButton = ({ className }: ContactButtonProps) => {
  const router = useRouter()
  const { lang } = useLanguage()
  return (
    <button onClick={() => router.push(`/${lang}/contact`)} className={className}>
      Contact
    </button>
  )
}

const SearchButton = (props: HTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      aria-label="Open search"
      className="flex h-8 w-11.25 shrink-0 items-center justify-center rounded-full border border-[#6B6F76] transition hover:bg-[#ECECEC]"
    >
      <Image src="/MagnifyingGlassIcon.svg" alt="" width={15} height={15} aria-hidden />
    </button>
  )
}

const MenuButton = (props: HTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      aria-label="Toggle menu"
      className={cn(
        'flex md:hidden h-8 w-11.25 shrink-0 items-center justify-center rounded-full border border-[#6B6F76] transition hover:bg-[#ECECEC]',
        props.className,
      )}
    >
      <Image src="/BurgerIcon.svg" alt="" width={18} height={18} aria-hidden />
    </button>
  )
}
