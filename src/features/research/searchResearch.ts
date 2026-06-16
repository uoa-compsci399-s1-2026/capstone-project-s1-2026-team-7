import { ResearchDTO, researchDTOSchema } from './research.schema'
import { getPayloadClient } from '@/lib/payload'
import type { Where } from 'payload'

export type ResearchSortOption = 'newest' | 'oldest' | 'title'

export type SearchResearchParams = {
  searchTerm?: string
  page?: number
  limit?: number
  sort?: ResearchSortOption
  categoryId?: string | null
  staffId?: string | null
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

export type ResearchStaffOption = {
  id: string
  label: string
  firstname: string
  lastname: string
  email: string
}

type StaffDoc = {
  id?: string | number | null
  firstname?: string | null
  lastname?: string | null
  email?: string | null
  sortOrder?: number | null
}

type StaffRelationship = string | number | StaffDoc | null | undefined

function toPayloadId(id: string) {
  const numericId = Number(id)
  return Number.isNaN(numericId) ? id : numericId
}

function getStaffLabel(staff: StaffDoc) {
  const firstname = staff.firstname ?? ''
  const lastname = staff.lastname ?? ''
  const fullName = `${firstname} ${lastname}`.trim()

  return fullName || staff.email || `Staff member ${staff.id}`
}

export function getResearchStaffOptions(
  researchStaffDisplay: StaffRelationship[] | null | undefined,
): ResearchStaffOption[] {
  return (researchStaffDisplay ?? []).flatMap((staff) => {
    if (!staff || typeof staff !== 'object') {
      return []
    }

    if (staff.id === undefined || staff.id === null) {
      return []
    }

    return [
      {
        id: String(staff.id),
        label: getStaffLabel(staff),
        firstname: staff.firstname ?? '',
        lastname: staff.lastname ?? '',
        email: staff.email ?? '',
      },
    ]
  })
}

export async function searchResearch({
  searchTerm = '',
  page = 1,
  limit = 12,
  sort = 'newest',
  categoryId = null,
  staffId = null,
}: SearchResearchParams = {}): Promise<SearchResearchResult> {
  const payload = await getPayloadClient()

  const andFilters: Where[] = [
    {
      csvDeleted: {
        not_equals: true,
      },
    },
  ]
  const trimmedSearchTerm = searchTerm.trim()

  if (trimmedSearchTerm) {
    andFilters.push({
      or: [
        {
          title: {
            like: trimmedSearchTerm,
          },
        },
        {
          doi: {
            like: trimmedSearchTerm,
          },
        },
      ],
    })
  }

  if (categoryId && categoryId !== 'All') {
    andFilters.push({
      categories: {
        contains: toPayloadId(categoryId),
      },
    })
  }

  if (staffId && staffId !== 'All') {
    andFilters.push({
      staff: {
        contains: toPayloadId(staffId),
      },
    })
  }

  const sortValue = sort === 'newest' ? '-date' : sort === 'oldest' ? 'date' : 'title'

  const where: Where | undefined =
    andFilters.length > 0
      ? {
          and: andFilters,
        }
      : undefined

  const data = await payload.find({
    collection: 'research',
    where,
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
