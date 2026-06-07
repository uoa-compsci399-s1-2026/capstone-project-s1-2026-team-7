'use client'

import React, { useEffect, useRef, useState, PropsWithChildren } from 'react'
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

const MOBILE_MENU_ANIMATION_MS = 300

const navUnderlineClass =
  "relative inline-block after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[#0C0C48] after:transition-transform after:duration-200 after:ease-out after:content-[''] hover:after:scale-x-100"

export default function Navbar(props: navbarProps) {
  const [mobileMenuMounted, setMobileMenuMounted] = useState(false)
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false)

  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const router = useRouter()
  const { lang } = useLanguage()

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current)
      }
    }
  }, [])

  const openMobileMenu = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
    }

    setMobileMenuMounted(true)

    requestAnimationFrame(() => {
      setMobileMenuVisible(true)
    })
  }

  const closeMobileMenu = (afterClose?: () => void) => {
    setMobileMenuVisible(false)

    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
    }

    closeTimerRef.current = setTimeout(() => {
      setMobileMenuMounted(false)
      afterClose?.()
    }, MOBILE_MENU_ANIMATION_MS)
  }

  return (
    <>
      {mobileMenuMounted && (
        <div
          className={`fixed inset-0 z-50 flex flex-col bg-[#F7F7F7] transition-transform duration-300 ease-out md:hidden ${
            mobileMenuVisible ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="flex h-17 shrink-0 items-center justify-between px-4">
            <NavigationLogos data={props.data} />

            <button
              onClick={() => closeMobileMenu()}
              aria-label="Close menu"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#6B6F76] text-[#000000] transition hover:bg-[#ECECEC]"
            >
              <Image src="/XIcon.svg" alt="" width={14} height={14} aria-hidden />
            </button>
          </div>

          <nav className="flex flex-1 flex-col px-4 pt-2">
            {props.data.navbarLinks.map((item, index) => {
              const href = getLocalizedHref(item.navURL, lang)

              return (
                <Link
                  key={index}
                  href={href}
                  onClick={(event) => {
                    event.preventDefault()
                    closeMobileMenu(() => router.push(href))
                  }}
                  className="border-b border-[#E8E8E8] py-4 text-[22px] font-medium text-[#0C0C48] transition hover:opacity-85"
                >
                  <span className={navUnderlineClass}>{item.navTitle}</span>
                </Link>
              )
            })}
          </nav>

          <div className="flex shrink-0 flex-col gap-3 px-4 pb-8 pt-4">
            <button
              onClick={() => {
                closeMobileMenu(() => router.push(`/${lang}/contact`))
              }}
              className="h-11 w-full rounded-full bg-[#2F3FE6] text-[13px] font-medium text-white transition hover:opacity-85"
            >
              Contact
            </button>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-40 w-full border-b border-border bg-[#F7F7F7]">
        <div className="mx-auto flex h-17 max-w-360 items-center justify-between px-8 max-md:px-4">
          <NavigationLogos data={props.data} />

          <nav className="hidden items-center gap-8 text-[#0C0C48] md:flex">
            {props.data.navbarLinks.map((item, index) => (
              <Link
                key={index}
                href={getLocalizedHref(item.navURL, lang)}
                className={`text-[13px] font-medium text-[#0C0C48] transition hover:opacity-85 ${navUnderlineClass}`}
              >
                {item.navTitle}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <LanguageDropdown className="hidden md:inline-flex" />

            <ContactButton className="hidden h-8 w-18 items-center justify-center rounded-full bg-[#2F3FE6] text-[12px] font-medium text-white transition hover:opacity-85 md:inline-flex" />

            <LanguageDropdown className="inline-flex md:hidden" />

            <button
              onClick={openMobileMenu}
              aria-label="Open menu"
              className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-[#ECECEC] md:hidden"
            >
              <Image src="/BurgerIcon.svg" alt="" width={21} height={21} aria-hidden />
            </button>
          </div>
        </div>
      </header>
    </>
  )
}

export const NavigationButton = ({ children }: PropsWithChildren) => {
  return (
    <Link
      href="#"
      className={`text-[13px] font-medium text-[#0C0C48] transition hover:opacity-85 ${navUnderlineClass}`}
    >
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
    <Link
      href={`/${lang}`}
      aria-label="Go to homepage"
      className="flex shrink-0 items-center gap-4 transition hover:opacity-85 max-md:gap-3"
    >
      <span className="relative block h-8 w-16 shrink-0 max-[444px]:hidden">
        <Image
          src={data.uoaLogo.url}
          alt={data.uoaLogo.alt}
          sizes="80px"
          fill
          className="object-contain"
        />
      </span>

      <span className="h-9 w-px bg-[#BFC4CC] max-[444px]:hidden" aria-hidden />

      <span className="relative block h-8 w-16 shrink-0">
        <Image
          src={data.hnuLogo.url}
          alt={data.hnuLogo.alt}
          fill
          sizes="80px"
          className="object-contain"
        />
      </span>
    </Link>
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
