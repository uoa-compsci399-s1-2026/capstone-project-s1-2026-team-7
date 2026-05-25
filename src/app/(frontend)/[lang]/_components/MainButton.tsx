import { ButtonHTMLAttributes, MouseEventHandler } from 'react'
import { Variant } from '@/types/variant'

type MainButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string
  onClick?: MouseEventHandler<HTMLButtonElement>
  type?: 'button' | 'submit' | 'reset'

  variant: Variant
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

export default function MainButton({ title, variant, ...props }: MainButtonProps) {
  const className = `${baseClasses} ${variantClasses[variant]}`

  return (
    <button {...props} className={className}>
      {title}
    </button>
  )
}
