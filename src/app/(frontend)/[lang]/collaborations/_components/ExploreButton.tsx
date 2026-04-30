'use client'

import { Plus, Circle } from 'lucide-react'

type Props = {
  label: string
  active: boolean
  onClick: () => void
}

export default function ExploreButton({ label, active, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center justify-between px-4 py-2 rounded-full
        transition cursor-pointer bg-[#f7f7f7] hover:bg-[#EDEDED] 
      `}
    >
      <span className="text-lg font-medium text-[#0C0C48]">{label}</span>

      {active ? (
        <Circle className="w-4 h-4 fill-[#0C0C48] text-[#0C0C48]" />
      ) : (
        <Plus className="w-4 h-4 text-[#0C0C48]" />
      )}
    </button>
  )
}
