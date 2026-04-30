'use client'
import { Search } from 'lucide-react'

type Props = {
  sortOption: 'newest' | 'oldest' | 'title'
  setSortOption: (value: 'newest' | 'oldest' | 'title') => void
  searchQuery: string
  setSearchQuery: (value: string) => void
}

export default function ResearchFilters({
  sortOption,
  setSortOption,
  searchQuery,
  setSearchQuery,
}: Props) {
  return (
    <div className="w-full bg-gray-100 py-4 mb-4">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:items-center md:justify-center gap-4">
        {/* SORT */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Sort items by</label>

          <select
            className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white appearance-none pr-8"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as 'newest' | 'oldest' | 'title')}
          >
            <option value="newest">Date - Newest</option>
            <option value="oldest">Date - Oldest</option>
            <option value="title">Title - A-Z</option>
          </select>
        </div>

        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title"
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
          />

          <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-500" />
        </div>
      </div>
    </div>
  )
}
