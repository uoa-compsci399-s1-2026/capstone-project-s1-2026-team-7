'use client'

import { LayoutGrid, List } from 'lucide-react'

type Props = {
  itemCount: number
  viewMode: 'grid' | 'list'
  setViewMode: (mode: 'grid' | 'list') => void
}

export default function ResearchTopBar({ itemCount, viewMode, setViewMode }: Props) {
  return (
    <div className="flex items-center w-full py-3 px-4">
      <h2 className="md:block font text-base text-gray-400">
        Items in this collection ({itemCount})
      </h2>

      <div className="flex items-center gap-3 ml-auto">
        <button onClick={() => setViewMode('grid')}>
          <LayoutGrid
            className={`w-6 h-6 cursor-pointer transition-all 
              ${viewMode === 'grid' ? 'text-gray-900 scale-110 font-bold' : 'text-gray-400'}`}
          />
        </button>

        <button onClick={() => setViewMode('list')}>
          <List
            className={`w-6 h-6 cursor-pointer transition-all 
              ${viewMode === 'list' ? 'text-gray-900 scale-110 font-bold' : 'text-gray-400'}`}
          />
        </button>
      </div>
    </div>
  )
}
