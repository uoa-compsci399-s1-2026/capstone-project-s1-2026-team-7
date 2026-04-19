import React from 'react'
// import { de } from 'zod/locales'

type Props = {
  pdfCount: number
  viewMode: 'grid' | 'list'
  OnToggleView: () => void
}

export default function ResearchTopBar({ pdfCount, viewMode, OnToggleView }: Props) {
  return (
    <div className="w-full py-4 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 border rounded-md bg-white shadow-sm">Category</button>

          <span className="text-gray-600 text-sm">Items in this collection ({pdfCount})</span>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={OnToggleView} className="p-2 border rounded-md bg-white shadow-sm">
            {viewMode === 'grid' ? 'List' : 'Grid'}
          </button>
        </div>
      </div>
    </div>
  )
}
