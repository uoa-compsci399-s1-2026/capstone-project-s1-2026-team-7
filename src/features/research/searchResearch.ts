import { ResearchDTO, researchDTOSchema } from '@/features'
import { getPayloadClient } from '@/lib/payload'
import { PaginatedDocs } from 'payload'
import { Research } from '@/payload-types'

export async function searchResearch(searchTerm: string): Promise<ResearchDTO[]> {
  const payload = await getPayloadClient()

  const data: PaginatedDocs<Research> = await payload.find({
    collection: 'research',
    where: {
      title: {
        like: searchTerm,
      },
    },
    depth: 3,
  })

  return data.docs.map((doc) => researchDTOSchema.parse(doc))
}
