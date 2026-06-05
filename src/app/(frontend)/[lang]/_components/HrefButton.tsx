'use client'

import Link from 'next/link'
import { useLenis } from 'lenis/react'
import { Variant } from '@/types/variant'

interface HrefButtonProps {
  title: string
  variant: Variant
  href: string
  className?: string
}

const baseClasses =
  'inline-flex min-w-30 items-center justify-center whitespace-nowrap rounded-full px-4 py-2 text-xs transition-all duration-200 sm:text-sm lg:text-lg'

const variantClasses: Record<Variant, string> = {
  primary:
    'border-2 border-transparent bg-[#1F2BD4] text-white hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-black hover:shadow-md',
  secondary:
    'border-2 border-white text-white hover:-translate-y-0.5 hover:bg-white hover:text-blue-950 hover:shadow-md',
  grey: 'border-2 border-gray-300 bg-white text-black hover:-translate-y-0.5 hover:bg-gray-100 hover:shadow-md',
}

export default function HrefButton({ title, variant, href, className = '' }: HrefButtonProps) {
  const lenis = useLenis()
  const buttonClassName = `${baseClasses} ${variantClasses[variant]} ${className}`

  if (href.startsWith('#')) {
    return (
      <Link
        href={href}
        className={buttonClassName}
        onClick={(e) => {
          e.preventDefault()

          if (lenis) {
            lenis.scrollTo(href, { offset: 0 })
          } else {
            document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
          }
        }}
      >
        {title}
      </Link>
    )
  }

  return (
    <Link href={href} className={buttonClassName}>
      {title}
    </Link>
  )
}
