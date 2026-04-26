type MainButtonProps = {
  title: string
  variant: 'primary' | 'secondary' | 'grey'
}

export default function MainButton({ title, variant }: MainButtonProps) {
  let className =
    'rounded-full min-w-30.25 px-4 py-2 text-xs transition-all duration-200 sm:px-6 sm:py-2.5 md:text-sm lg:py-3 lg:text-base'

  if (variant === 'primary') {
    className +=
      ' bg-blue-950 text-white border-3 border-transparent hover:-translate-y-0.5 hover:bg-blue-900 hover:shadow-md'
  } else if (variant === 'secondary') {
    className +=
      ' border-3 border-white text-white hover:-translate-y-0.5 hover:bg-white hover:text-blue-950 hover:shadow-md'
  } else if (variant === 'grey') {
    className +=
      ' border border-gray-300 bg-white text-black hover:-translate-y-0.5 hover:bg-gray-100 hover:shadow-md'
  } else {
    throw new Error(`Invalid variant: ${variant}`)
  }

  return <button className={className}>{title}</button>
}
