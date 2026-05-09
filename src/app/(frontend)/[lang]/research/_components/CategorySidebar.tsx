'use client'

type Props = {
  categories: { id: number; title: string }[]
  onSelect: (categoryId: string) => void
  selectedCategoryId: string | null
  hideTitle?: boolean
}

export default function CategorySidebar({
  categories,
  onSelect,
  selectedCategoryId,
  hideTitle,
}: Props) {
  return (
    <aside className="w-full md:w-72 md:pr-4 h-full">
      {!hideTitle && (
        <div className="mb-4">
          <h2 className="font-semibold text-lg">Categories</h2>
        </div>
      )}

      <div className="space-y-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelect(category.title)}
            className="flex items-center gap-3 cursor-pointer text-left w-full"
          >
            <div
              className={`w-4 h-4 border border-gray-300 rounded-sm mr-4 flex ${
                selectedCategoryId === category.title ? 'bg-blue-500 border-blue-500' : ''
              }`}
            />
            <span
              className={`text-sm ${
                selectedCategoryId === category.title ? 'font-medium' : 'text-gray-700'
              }`}
            >
              {category.title}
            </span>
          </button>
        ))}
      </div>
    </aside>
  )
}
