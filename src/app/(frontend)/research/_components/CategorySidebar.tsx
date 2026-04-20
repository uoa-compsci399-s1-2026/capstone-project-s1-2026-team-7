'use client'

import { ChevronIcon } from '@payloadcms/ui'

type Props = {
  categories: {
    id: string
    title: string
  }[]
  onSelect: (categoryId: string) => void
  selectedCategoryId: string | null
}

export default function CategorySidebar({ categories, onSelect, selectedCategoryId }: Props) {
  return (
    <aside className="w-full md:w-64 border-r border-gray-200 ml-10 pr-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg">Categories</h2>
        <ChevronIcon className="w-10 h-10 text-gray-500" />
      </div>

      <div className="space-y-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelect(category.id)}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div
              className={`w-4 h-4 border border-gray-300 rounded-sm mr-2 flex ${selectedCategoryId === category.id ? 'bg-blue-500 border-blue-500' : ''}`}
            />
            <span className={`text-sm ${selectedCategoryId === category.id ? 'font-medium' : ''}`}>
              {category.title}
            </span>
          </button>
        ))}
      </div>
    </aside>
  )
}
