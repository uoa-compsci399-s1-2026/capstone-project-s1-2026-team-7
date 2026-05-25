import { ResearchDTO, researchDTOSchema } from '@/features'
import { getPayloadClient } from '@/lib/payload'
import { PaginatedDocs } from 'payload'
import { Research } from '@/payload-types'

export type ResearchSortOption = 'newest' | 'oldest' | 'title'

export type SearchResearchParams = {
  searchTerm?: string
  page?: number
  limit?: number
  sort?: ResearchSortOption
  categoryId?: string | null
}

export type SearchResearchResult = {
  docs: ResearchDTO[]
  totalDocs: number
  totalPages: number
  page: number
  limit: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export async function searchResearch({
  searchTerm = '',
  page = 1,
  limit = 16,
  sort = 'newest',
  categoryId = null,
}: SearchResearchParams = {}): Promise<SearchResearchResult> {
  const payload = await getPayloadClient()

  const andFilters = []

  if (searchTerm.trim()) {
    andFilters.push({
      title: {
        like: searchTerm.trim(),
      },
    })
  }

  if (categoryId && categoryId !== 'All') {
    andFilters.push({
      categories: {
        contains: Number(categoryId),
      },
    })
  }

  const sortValue = sort === 'newest' ? '-date' : sort === 'oldest' ? 'date' : 'title'

  const data: PaginatedDocs<Research> = await payload.find({
    collection: 'research',
    where: andFilters.length > 0 ? { and: andFilters } : undefined,
    depth: 3,
    page,
    limit,
    sort: sortValue,
  })

  return {
    docs: data.docs.map((doc) => researchDTOSchema.parse(doc)),
    totalDocs: data.totalDocs,
    totalPages: data.totalPages,
    page: data.page ?? page,
    limit: data.limit,
    hasNextPage: data.hasNextPage ?? false,
    hasPrevPage: data.hasPrevPage ?? false,
  }
}
