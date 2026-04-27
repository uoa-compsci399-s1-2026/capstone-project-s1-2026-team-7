'use client'

export default function ResearchFilters() {
  return (
    <div className="w-full bg-gray-100 py-4">
      <div
        className="max-w-7xl mx-auto px-6
      flex flex-col md:flex-row md:items-center md:justify-center gap-4"
      >
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Sort items by</label>

          <select
            className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white 
             appearance-none pr-8"
          >
            <option value="newest">Date - Newest</option>
            <option value="oldest">Date - Oldest</option>
            <option value="title">Title - A-Z</option>
          </select>
        </div>

        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search by title"
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
          />
          <span className="absolute right-3 top-2.5 text-gray-500">🔍</span>
        </div>
      </div>
    </div>
  )
}
