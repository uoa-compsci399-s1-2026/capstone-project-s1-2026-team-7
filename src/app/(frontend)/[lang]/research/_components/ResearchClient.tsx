'use client'

import { useEffect, useState } from 'react'
import CategorySidebar from './CategorySidebar'
import ResearchArticles from './ResearchArticles'
import ResearchTopBar from './ResearchTopBar'
import Pagination from './Pagination'
import ResearchFilters from './ResearchFilters'
import { ResearchDTO } from '@/features'

type Props = {
  categories: { id: number; title: string }[]
  initialResearch: ResearchDTO[]
  initialTotalDocs: number
}

type SortOption = 'newest' | 'oldest' | 'title'

export function ResearchClient({ categories, initialResearch, initialTotalDocs }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const itemsPerPage = 16

  const [page, setPage] = useState(1)
  const [research, setResearch] = useState<ResearchDTO[]>(initialResearch)
  const [totalItems, setTotalItems] = useState(initialTotalDocs)

  const [searchQuery, setSearchQuery] = useState('')
  const [sortOption, setSortOption] = useState<SortOption>('newest')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setPage(1)
  }, [searchQuery, sortOption, selectedCategory])

  useEffect(() => {
    const controller = new AbortController()

    async function loadResearchPage() {
      setLoading(true)

      try {
        const params = new URLSearchParams({
          page: String(page),
          limit: String(itemsPerPage),
          sort: sortOption,
        })

        if (searchQuery.trim()) {
          params.set('search', searchQuery.trim())
        }

        if (selectedCategory && selectedCategory !== 'All') {
          params.set('categoryId', selectedCategory)
        }

        const response = await fetch(`/research-api?${params.toString()}`, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error('Failed to load research')
        }

        const data = await response.json()

        setResearch(data.docs)
        setTotalItems(data.totalDocs)
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error(error)
        }
      } finally {
        setLoading(false)
      }
    }

    loadResearchPage()

    return () => controller.abort()
  }, [page, searchQuery, sortOption, selectedCategory])

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
                  setSelectedCategory((prev) => (prev === id ? null : id))
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
              onSelect={(id) => {
                setSelectedCategory((prev) => (prev === id ? null : id))
              }}
              hideTitle={false}
            />
          </div>

          <main>
            <ResearchTopBar itemCount={totalItems} viewMode={viewMode} setViewMode={setViewMode} />

            {loading && <p className="text-gray-500 mt-6 ml-4">Loading...</p>}

            {!loading && research.length === 0 && (
              <p className="text-gray-500 mt-6 ml-4">No items found</p>
            )}

            {!loading && research.length > 0 && (
              <ResearchArticles research={research} viewMode={viewMode} />
            )}

            {totalItems > itemsPerPage && (
              <Pagination
                page={page}
                totalItems={totalItems}
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
