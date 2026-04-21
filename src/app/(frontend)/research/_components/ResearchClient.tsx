'use client'

import { useState } from 'react'
import CategorySidebar from './CategorySidebar'
import ResearchArticles from './ResearchArticles'
import ResearchTopBar from './ResearchTopBar'
import { ResearchEntry } from '../_types/types'

type Prop = {
  categories: { id: string; title: string }[]
  research: ResearchEntry[]
}

export function ResearchClient({ categories, research }: Prop) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const itemsPerPage = 16
  const [page, setPage] = useState(1)

  const start = (page - 1) * itemsPerPage
  const end = start + itemsPerPage
  const paginatedResearch = research.slice(start, end)

  return (
    <div className="max-w-screen-xl mx-auto w-full px-4 mt-8">
      <div className="grid grid-cols-[250px_1fr] gap-8">
        {/* Sidebar always visible */}
        <CategorySidebar
          categories={categories}
          selectedCategoryId={selectedCategory}
          onSelect={setSelectedCategory}
        />

        {/* Main content */}
        <main>
          <ResearchTopBar
            itemCount={research.length}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />

          <ResearchArticles research={paginatedResearch} viewMode={viewMode} />

          <div className="flex justify-between gap-4 mt-8">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 border rounded disabled:opacity-50 cursor-pointer"
            >
              Previous
            </button>

            <button
              disabled={page === Math.ceil(research.length / itemsPerPage)}
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 border rounded disabled:opacity-50 cursor-pointer"
            >
              Next
            </button>
          </div>
        </main>
      </div>
    </div>
  )
}
