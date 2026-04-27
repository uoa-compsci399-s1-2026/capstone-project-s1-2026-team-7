type MainButtonProps = {
  title: string
  variant: 'primary' | 'secondary' | 'grey'
}

export default function MainButton({ title, variant }: MainButtonProps) {
  let className =
    'inline-flex min-w-[121px] items-center justify-center whitespace-nowrap rounded-full px-4 py-2 text-xs transition-all duration-200 md:text-sm lg:text-xl'

  if (variant === 'primary') {
    className +=
      ' border border-transparent bg-blue-950 text-white hover:-translate-y-0.5 hover:bg-blue-900 hover:shadow-md'
  } else if (variant === 'secondary') {
    className +=
      ' border border-white text-white hover:-translate-y-0.5 hover:bg-white hover:text-blue-950 hover:shadow-md'
  } else if (variant === 'grey') {
    className +=
      ' border border-gray-300 bg-white text-black hover:-translate-y-0.5 hover:bg-gray-100 hover:shadow-md'
  } else {
    throw new Error(`Invalid variant: ${variant}`)
  }

  return <button className={className}>{title}</button>
}
