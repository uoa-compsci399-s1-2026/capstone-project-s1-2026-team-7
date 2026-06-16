'use client'

import { useEffect, useMemo, useRef, useState, type SetStateAction } from 'react'
import { ResearchDTO } from '@/features/research'
import CategorySidebar from './CategorySidebar'
import Pagination from './Pagination'
import ResearchArticles from './ResearchArticles'
import ResearchFilters from './ResearchFilters'
import ResearchTopBar from './ResearchTopBar'
import StaffSidebar from './StaffSidebar'
import type { ResearchCategoryOption } from './CategorySidebar'
import type { StaffFilter, StaffOption } from './StaffSidebar'
import type { SortOption } from './ResearchFilters'

type Props = {
  categories: ResearchCategoryOption[]
  staffOptions: StaffOption[]
  initialResearch: ResearchDTO[]
  initialTotalDocs: number
}

type CachedResearch = {
  docs: ResearchDTO[]
  totalDocs: number
}

const itemsPerPage = 12

function useDebouncedValue<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      window.clearTimeout(timeout)
    }
  }, [delay, value])

  return debouncedValue
}

function getCacheKey(
  page: number,
  search: string,
  sort: SortOption,
  categoryId: string | null,
  staffId: string | null,
) {
  return JSON.stringify({
    page,
    search: search.trim().toLowerCase(),
    sort,
    categoryId,
    staffId,
  })
}

function getStaffDisplayName(staff: StaffOption) {
  const firstname = staff.firstname ?? ''
  const lastname = staff.lastname ?? ''
  const fullName = `${firstname} ${lastname}`.trim()

  return fullName || staff.label || staff.email || `Staff member ${staff.id}`
}

function ResearchSkeleton() {
  return (
    <div className="flex flex-col gap-4" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6"
        >
          <div className="mb-4 flex gap-2">
            <div className="h-6 w-24 rounded-full bg-slate-100" />
            <div className="h-6 w-28 rounded-full bg-slate-100" />
          </div>

          <div className="space-y-3">
            <div className="h-6 w-11/12 rounded-full bg-slate-100" />
            <div className="h-6 w-3/4 rounded-full bg-slate-100" />
            <div className="h-4 w-1/2 rounded-full bg-slate-100" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function ResearchClient({
  categories,
  staffOptions,
  initialResearch,
  initialTotalDocs,
}: Props) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null)
  const [selectedStaff, setSelectedStaff] = useState<StaffFilter | null>(null)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [page, setPage] = useState(1)
  const [research, setResearch] = useState<ResearchDTO[]>(initialResearch)
  const [totalItems, setTotalItems] = useState(initialTotalDocs)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOption, setSortOptionState] = useState<SortOption>('newest')
  const [loading, setLoading] = useState(false)

  const debouncedSearchQuery = useDebouncedValue(searchQuery, 350)
  const selectedStaffId = selectedStaff?.id ?? null

  const visibleStaffOptions = useMemo(() => {
    return staffOptions
      .filter((staff) => staff.id !== undefined && staff.id !== null)
      .map((staff) => ({
        ...staff,
        id: String(staff.id),
        label: getStaffDisplayName(staff),
      }))
  }, [staffOptions])

  const selectedCategoryLabel = useMemo(() => {
    if (!selectedCategoryId) {
      return null
    }

    return categories.find((category) => String(category.id) === selectedCategoryId)?.title ?? null
  }, [categories, selectedCategoryId])

  const hasActiveFilters = Boolean(
    searchQuery.trim() || selectedCategoryId || selectedStaffId || sortOption !== 'newest',
  )

  const queryKey = useMemo(
    () => getCacheKey(page, debouncedSearchQuery, sortOption, selectedCategoryId, selectedStaffId),
    [debouncedSearchQuery, page, selectedCategoryId, selectedStaffId, sortOption],
  )

  const cache = useRef<Map<string, CachedResearch>>(
    new Map([
      [
        getCacheKey(1, '', 'newest', null, null),
        {
          docs: initialResearch,
          totalDocs: initialTotalDocs,
        },
      ],
    ]),
  )

  function handleSearchQueryChange(value: SetStateAction<string>) {
    setSearchQuery(value)
    setPage(1)
  }

  function setSortOption(value: SortOption) {
    setSortOptionState(value)
    setPage(1)
  }

  function handleCategorySelect(categoryId: string | null) {
    setSelectedCategoryId(categoryId)
    setPage(1)
    setMobileFiltersOpen(false)
  }

  function handleStaffSelect(staff: StaffFilter | null) {
    setSelectedStaff((currentStaff) => {
      if (!staff || currentStaff?.id === staff.id) {
        return null
      }

      return staff
    })

    setPage(1)
    setMobileFiltersOpen(false)
  }

  function clearStaffFilter() {
    setSelectedStaff(null)
    setPage(1)
  }

  function clearFilters() {
    setSearchQuery('')
    setSelectedCategoryId(null)
    setSelectedStaff(null)
    setSortOptionState('newest')
    setPage(1)
  }

  useEffect(() => {
    const cached = cache.current.get(queryKey)

    if (cached) {
      setResearch(cached.docs)
      setTotalItems(cached.totalDocs)
      setLoading(false)
      return
    }

    const controller = new AbortController()

    async function loadResearchPage() {
      setLoading(true)

      try {
        const params = new URLSearchParams({
          page: String(page),
          limit: String(itemsPerPage),
          sort: sortOption,
        })

        const trimmedSearch = debouncedSearchQuery.trim()

        if (trimmedSearch) {
          params.set('search', trimmedSearch)
        }

        if (selectedCategoryId) {
          params.set('categoryId', selectedCategoryId)
        }

        if (selectedStaffId) {
          params.set('staffId', selectedStaffId)
        }

        const response = await fetch(`/api/research/search?${params.toString()}`, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error('Failed to load research')
        }

        const data = (await response.json()) as CachedResearch

        cache.current.set(queryKey, data)
        setResearch(data.docs)
        setTotalItems(data.totalDocs)
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error(error)
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadResearchPage()

    return () => {
      controller.abort()
    }
  }, [debouncedSearchQuery, page, queryKey, selectedCategoryId, selectedStaffId, sortOption])

  return (
    <div className="w-full pb-16">
      <ResearchFilters
        sortOption={sortOption}
        setSortOption={setSortOption}
        searchQuery={searchQuery}
        setSearchQuery={handleSearchQueryChange}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={clearFilters}
      />

      <div className="mx-auto mt-8 grid w-full max-w-7xl grid-cols-1 gap-6 px-5 md:px-8 lg:grid-cols-[300px_1fr] lg:gap-8">
        <div className="lg:hidden">
          <button
            type="button"
            onClick={() => setMobileFiltersOpen((isOpen) => !isOpen)}
            className="flex w-full items-center justify-between rounded-3xl border border-slate-200 bg-white px-5 py-4 text-left font-black text-slate-950 shadow-sm"
          >
            <span>Filters</span>
            <span className="text-sm text-slate-400">
              {mobileFiltersOpen ? 'Close' : 'Categories & staff'}
            </span>
          </button>

          {mobileFiltersOpen && (
            <div className="mt-3 space-y-4">
              <CategorySidebar
                categories={categories}
                selectedCategoryId={selectedCategoryId}
                onSelect={handleCategorySelect}
              />

              <StaffSidebar
                staff={visibleStaffOptions}
                selectedStaffId={selectedStaffId}
                onSelect={handleStaffSelect}
              />
            </div>
          )}
        </div>

        <div className="hidden lg:block">
          <div className="space-y-4 lg:sticky lg:top-24">
            <CategorySidebar
              categories={categories}
              selectedCategoryId={selectedCategoryId}
              onSelect={handleCategorySelect}
            />

            <StaffSidebar
              staff={visibleStaffOptions}
              selectedStaffId={selectedStaffId}
              onSelect={handleStaffSelect}
            />
          </div>
        </div>

        <main aria-busy={loading}>
          <ResearchTopBar
            itemCount={totalItems}
            page={page}
            itemsPerPage={itemsPerPage}
            selectedCategoryLabel={selectedCategoryLabel}
            selectedStaff={selectedStaff}
            onClearStaff={clearStaffFilter}
          />

          {loading ? (
            <ResearchSkeleton />
          ) : research.length > 0 ? (
            <>
              <ResearchArticles research={research} />

              <Pagination
                page={page}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                onPageChange={setPage}
              />
            </>
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center shadow-sm">
              <p className="text-lg font-black text-slate-950">No matching publications</p>

              <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                Try a different search term, category, staff member, or sort option.
              </p>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-6 rounded-2xl bg-[#090936] px-5 py-3 text-sm font-black text-white transition-all duration-200 hover:bg-[#15155a]"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
