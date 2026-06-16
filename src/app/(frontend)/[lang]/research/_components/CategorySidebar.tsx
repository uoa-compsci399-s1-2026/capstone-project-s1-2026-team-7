'use client'

import { Filter, X } from 'lucide-react'

export type ResearchCategoryOption = {
  id: string | number
  title: string
  slug?: string
}

type Props = {
  categories: ResearchCategoryOption[]
  onSelect: (categoryId: string | null) => void
  selectedCategoryId: string | null
  hideTitle?: boolean
}

function getCategoryId(category: ResearchCategoryOption) {
  return String(category.id)
}

export default function CategorySidebar({
  categories,
  onSelect,
  selectedCategoryId,
  hideTitle,
}: Props) {
  return (
    <aside className="w-full rounded-3xl border border-slate-200 bg-white p-4 shadow-sm lg:p-5">
      {!hideTitle && (
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
              Filter by
            </p>
            <h2 className="mt-1 text-lg font-black text-slate-950">Categories</h2>
          </div>
          <div className="rounded-2xl bg-slate-100 p-2 text-slate-600">
            <Filter className="h-4 w-4" aria-hidden="true" />
          </div>
        </div>
      )}

      <div className="space-y-2">
        <button
          type="button"
          onClick={() => onSelect(null)}
          className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-semibold transition-all duration-200 cursor-pointer ${
            selectedCategoryId === null
              ? 'bg-[#090936] text-white shadow-sm'
              : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
          }`}
        >
          <span>All categories</span>
          {selectedCategoryId === null && <span className="text-xs text-white/70">Active</span>}
        </button>

        {categories.map((category) => {
          const categoryId = getCategoryId(category)
          const isActive = selectedCategoryId === categoryId

          return (
            <button
              key={categoryId}
              type="button"
              onClick={() => onSelect(isActive ? null : categoryId)}
              className={`group flex w-full items-center justify-between gap-3 rounded-2xl px-4 py-3 text-left text-sm transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-[#090936] font-bold text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-950'
              }`}
            >
              <span>{category.title}</span>
              {isActive ? (
                <X className="h-4 w-4 text-white/80" aria-hidden="true" />
              ) : (
                <span className="h-2 w-2 rounded-full bg-slate-200 transition group-hover:bg-[#090936]" />
              )}
            </button>
          )
        })}
      </div>
    </aside>
  )
}
