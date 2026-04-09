import React from 'react'

export interface Button {
  label: string
  selected: boolean
}

export type ButtonProps = {
  button: Button
}

export default function TeamButton({ button }: ButtonProps) {
  const { label, selected } = button
  const backgroundColour = selected ? 'bg-[#181851]' : 'bg-white'
  const textColour = selected ? 'text-white' : 'text-[#0F0F0F]'
  return (
    <p
      className={`${backgroundColour} ${textColour} text-base font-normal border border-[#0F0F0F] py-2 rounded-lg h-10 w-fill`}
    >
      {label}
    </p>
  )
}
