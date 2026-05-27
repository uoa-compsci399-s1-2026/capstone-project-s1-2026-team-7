import { searchResearch } from '@/features/research/searchResearch'
import type { ResearchSortOption } from '@/features/research/searchResearch'

const allowedSortOptions: ResearchSortOption[] = ['newest', 'oldest', 'title']

function getPositiveNumber(value: string | null, fallback: number, max: number) {
  const parsed = Number(value)

  if (!Number.isFinite(parsed) || parsed < 1) {
    return fallback
  }

  return Math.min(Math.floor(parsed), max)
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const page = getPositiveNumber(searchParams.get('page'), 1, 1000)
  const limit = getPositiveNumber(searchParams.get('limit'), 12, 24)
  const searchTerm = (searchParams.get('search') ?? '').trim().slice(0, 120)
  const requestedSort = searchParams.get('sort') as ResearchSortOption | null
  const sort =
    requestedSort && allowedSortOptions.includes(requestedSort) ? requestedSort : 'newest'
  const categoryId = searchParams.get('categoryId')?.trim() || null
  const staffId = searchParams.get('staffId')?.trim() || null

  const result = await searchResearch({
    searchTerm,
    page,
    limit,
    sort,
    categoryId,
    staffId,
  })

  return Response.json(result, {
    headers: {
      'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=300',
    },
  })
}
