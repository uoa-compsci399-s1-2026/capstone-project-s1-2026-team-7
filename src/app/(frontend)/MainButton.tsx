import { cn } from '@/lib/cn'

type MainButtonProps = {
  title: string
  className?: string
}

export default function MainButton({ title, className }: MainButtonProps) {
  return (
    <button
      className={cn(
        'rounded-full min-w-[121px] px-4 py-2 text-xs transition-all duration-200 sm:px-6 sm:py-2.5 md:text-sm  lg:py-3 lg:text-base',
        className,
      )}
    >
      {title}
    </button>
  )
}
