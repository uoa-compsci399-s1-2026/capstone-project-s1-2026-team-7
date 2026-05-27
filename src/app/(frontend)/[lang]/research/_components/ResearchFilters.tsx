'use client'

import { Search, SlidersHorizontal, X } from 'lucide-react'

export type SortOption = 'newest' | 'oldest' | 'title'

type Props = {
  sortOption: SortOption
  setSortOption: (value: SortOption) => void
  searchQuery: string
  setSearchQuery: (value: string) => void
  hasActiveFilters: boolean
  onClearFilters: () => void
}

export default function ResearchFilters({
  sortOption,
  setSortOption,
  searchQuery,
  setSearchQuery,
  hasActiveFilters,
  onClearFilters,
}: Props) {
  return (
    <div className="relative z-10 -mt-10 px-5 md:px-8">
      <div className="mx-auto max-w-7xl rounded-3xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/10 md:p-5">
        <div className="grid gap-3 lg:grid-cols-[1fr_auto_auto] lg:items-end">
          <label className="block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
              Search publications
            </span>
            <span className="relative block">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search by title or DOI"
                className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#090936] focus:bg-white focus:ring-4 focus:ring-[#090936]/10"
              />
            </span>
          </label>

          <label className="block lg:min-w-56">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
              Sort by
            </span>
            <span className="relative block">
              <SlidersHorizontal
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <select
                className="h-12 w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-9 text-sm font-bold text-slate-800 outline-none transition focus:border-[#090936] focus:bg-white focus:ring-4 focus:ring-[#090936]/10"
                value={sortOption}
                onChange={(event) => setSortOption(event.target.value as SortOption)}
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
                <option value="title">Title A-Z</option>
              </select>
            </span>
          </label>

          <button
            type="button"
            onClick={onClearFilters}
            disabled={!hasActiveFilters}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-slate-200 px-5 text-sm font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <X className="h-4 w-4" aria-hidden="true" />
            Clear
          </button>
        </div>
      </div>
    </div>
  )
}
