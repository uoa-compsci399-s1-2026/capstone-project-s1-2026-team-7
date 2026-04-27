'use client'

import { useState } from 'react'
import CategorySidebar from './CategorySidebar'
import ResearchArticles from './ResearchArticles'
import ResearchTopBar from './ResearchTopBar'
import { ResearchEntry } from '../_types/types'
import Pagination from './Pagination'

type Props = {
  categories: { id: string; title: string }[]
  research: ResearchEntry[]
}

export function ResearchClient({ categories, research }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const itemsPerPage = 16
  const [page, setPage] = useState(1)

  const start = (page - 1) * itemsPerPage
  const end = start + itemsPerPage

  const filteredResearch =
    selectedCategory === 'All'
      ? research
      : research.filter((item) => item.categoryId === selectedCategory)

  const paginatedResearch = filteredResearch.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  return (
    <div className="max-w-screen-xl mx-auto w-full px-4 mt-8">
      <div>
        <button
          onClick={() => setMobileCategoriesOpen(!mobileCategoriesOpen)}
          className="w-full flex justify-between items-center px-4 py-3 bg-gray-100 rounded-lg"
        >
          <span>Categories</span>
          <span>{mobileCategoriesOpen ? '▲' : '▼'}</span>
        </button>
      </div>

      {mobileCategoriesOpen && (
        <div className="mt-2 p-4 bg-gray-50 rounded-lg">
          <CategorySidebar
            categories={categories}
            selectedCategoryId={selectedCategory}
            onSelect={(id) => {
              setSelectedCategory(id)
              setMobileCategoriesOpen(false)
            }}
            hideTitle={true}
          />
        </div>
      )}

      <div className="grid md:grid-cols-[250px_1fr] grid-cols-1 gap-8">
        <div className="hidden md:block">
          <CategorySidebar
            categories={categories}
            selectedCategoryId={selectedCategory}
            onSelect={setSelectedCategory}
            hideTitle={false}
          />
        </div>

        <main>
          <ResearchTopBar
            itemCount={filteredResearch.length}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />

          {filteredResearch.length === 0 && (
            <p className="text-gray-500 mt-6 ml-4">No items found in this category</p>
          )}

          {filteredResearch.length > 0 && (
            <ResearchArticles research={paginatedResearch} viewMode={viewMode} />
          )}

          {filteredResearch.length > itemsPerPage && (
            <Pagination
              page={page}
              totalItems={filteredResearch.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setPage}
            />
          )}
        </main>
      </div>
    </div>
  )
}
