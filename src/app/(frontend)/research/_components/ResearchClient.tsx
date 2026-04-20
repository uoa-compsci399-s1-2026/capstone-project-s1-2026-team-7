// This page is the client component to make the page interative.
// It will fetch data from server to display the research articles and categories,
// and handle user interactions such as filtering and pagination.

'use client'

import { useState } from 'react'
import CategorySidebar from './CategorySidebar'
import ResearchArticles from './ResearchArticles'
import { ResearchEntry } from '../_types/types'

type Prop = {
  categories: { id: string; title: string }[]
  research: ResearchEntry[]
}

export function ResearchClient({ categories, research }: Prop) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
      <CategorySidebar
        categories={categories}
        selectedCategoryId={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <main className="md:col-span-3">
        <ResearchArticles research={research} />
      </main>
    </div>
  )
}
