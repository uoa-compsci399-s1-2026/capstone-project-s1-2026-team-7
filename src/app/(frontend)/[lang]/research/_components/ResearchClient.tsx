'use client'

import { useState } from 'react'
import CategorySidebar from './CategorySidebar'
import ResearchArticles from './ResearchArticles'
import ResearchTopBar from './ResearchTopBar'
import { ResearchEntry } from '../_types/types'
import Pagination from './Pagination'
import ResearchFilters from './ResearchFilters'

type Props = {
  categories: { id: number; title: string }[]
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

  const [searchQuery, setSearchQuery] = useState('')
  const [sortOption, setSortOption] = useState<'newest' | 'oldest' | 'title'>('newest')

  const filteredResearch = research
    .filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((item) =>
      selectedCategory === 'All' || selectedCategory === null
        ? true
        : item.categories.some((cat) => cat.title === selectedCategory),
    )
    .sort((a, b) => {
      if (sortOption === 'newest') {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
      if (sortOption === 'oldest') {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      }
      if (sortOption === 'title') {
        return a.title.localeCompare(b.title)
      }
      return 0
    })

  const paginatedResearch = filteredResearch.slice(start, end)

  return (
    <div className="w-full">
      <ResearchFilters
        sortOption={sortOption}
        setSortOption={setSortOption}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className="max-w-7xl mx-auto w-full px-4 mt-8">
        <div className="lg:hidden mt-4">
          <button
            onClick={() => setMobileCategoriesOpen(!mobileCategoriesOpen)}
            className="w-full flex justify-between items-center px-3 py-3 bg-gray-100 rounded-lg md:px-4"
          >
            <span>Categories</span>
            <span>{mobileCategoriesOpen ? '▲' : '▼'}</span>
          </button>

          {mobileCategoriesOpen && (
            <div className="mt-2 p-3 bg-gray-50 rounded-lg md:p-4">
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
        </div>

        <div className="grid lg:grid-cols-[250px_1fr] grid-cols-1 gap-8">
          <div className="hidden lg:block">
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
    </div>
  )
}
