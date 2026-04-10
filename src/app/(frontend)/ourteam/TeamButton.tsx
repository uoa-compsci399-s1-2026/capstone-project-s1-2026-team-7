import React from 'react'

export interface ButtonProps {
  label: string
  selected: boolean
  onClick: () => void
}

export default function TeamButton({ label, selected, onClick }: ButtonProps) {
  const backgroundColour = selected ? 'bg-[#181851]' : 'bg-white'
  const textColour = selected ? 'text-white' : 'text-[#0F0F0F]'

  return (
    <p
      onClick={onClick}
      className={`cursor-pointer text-center ${backgroundColour} ${textColour} text-base font-normal border border-[#0F0F0F] py-2 rounded-lg h-10 w-full`}
    >
      {label}
    </p>
  )
}
