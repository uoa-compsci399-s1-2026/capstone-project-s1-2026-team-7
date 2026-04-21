'use client'

import { HiOutlineSquares2X2, HiOutlineBars3 } from 'react-icons/hi2'

type Props = {
  itemCount: number
  viewMode: 'grid' | 'list'
  setViewMode: (mode: 'grid' | 'list') => void
}

export default function ResearchTopBar({ itemCount, viewMode, setViewMode }: Props) {
  return (
    <div className="flex items-center justify-between w-full py-1 px-4">
      <h2 className="font text-base text-gray-400">Items in this collection ({itemCount})</h2>

      <div className="flex items-center gap-3">
        <button onClick={() => setViewMode('grid')}>
          <HiOutlineSquares2X2
            className={`w-6 h-6 transition-all 
              ${viewMode === 'grid' ? 'text-gray-900 scale-110 font-bold' : 'text-gray-400'}`}
          />
        </button>

        <button onClick={() => setViewMode('list')}>
          <HiOutlineBars3
            className={`w-6 h-6 transition-all 
              ${viewMode === 'list' ? 'text-gray-900 scale-110 font-bold' : 'text-gray-400'}`}
          />
        </button>
      </div>
    </div>
  )
}
