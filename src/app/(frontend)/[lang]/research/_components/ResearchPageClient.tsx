'use client'

import React, { useState } from 'react'
import ResearchTopBar from './ResearchTopBar'

export default function ResearchPageClient({ children, pdfCount }: any) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  return (
    <>
      <ResearchTopBar
        pdfCount={pdfCount}
        viewMode={viewMode}
        OnToggleView={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
      />

      {children(viewMode)}
    </>
  )
}
