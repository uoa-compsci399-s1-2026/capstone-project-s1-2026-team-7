import Link from 'next/link'
import { Variant } from '@/types/variant'

interface HrefButtonProps {
  title: string
  variant: Variant
  href: string
}

const baseClasses =
  'inline-flex min-w-[7.5625rem] items-center justify-center whitespace-nowrap rounded-full px-4 py-2 text-xs transition-all duration-200 sm:text-sm md:text-base lg:text-lg xl:text-xl'

const variantClasses: Record<Variant, string> = {
  primary:
    'border border-transparent bg-[#1F2BD4] text-white hover:-translate-y-0.5 hover:bg-blue-900 hover:shadow-md',
  secondary:
    'border border-white text-white hover:-translate-y-0.5 hover:bg-white hover:text-blue-950 hover:shadow-md',
  grey: 'border border-gray-300 bg-white text-black hover:-translate-y-0.5 hover:bg-gray-100 hover:shadow-md',
}

export default function HrefButton({ title, variant, href }: HrefButtonProps) {
  const className = `${baseClasses} ${variantClasses[variant]}`

  return (
    <Link href={href} className={className}>
      {title}
    </Link>
  )
}
