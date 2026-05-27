import { searchResearch, ResearchSortOption } from '@/features/research/searchResearch'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 16)
  const searchTerm = searchParams.get('search') ?? ''
  const sort = (searchParams.get('sort') ?? 'newest') as ResearchSortOption
  const categoryId = searchParams.get('categoryId')
  const staffId = searchParams.get('staffId')

  const result = await searchResearch({
    searchTerm,
    page,
    limit,
    sort,
    categoryId,
    staffId,
  })

  return Response.json(result)
}
