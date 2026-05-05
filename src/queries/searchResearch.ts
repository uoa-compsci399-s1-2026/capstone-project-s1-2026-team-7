import { ResearchDTO, researchDTOSchema } from '@/validation'
import { getPayloadClient } from '@/lib/payload'
import { PaginatedDocs } from 'payload'
import { Research } from '@/payload-types'

export async function searchResearch(
  searchTerm: string,
  catagoryId: number,
): Promise<ResearchDTO[]> {
  const payload = await getPayloadClient()
  const data: PaginatedDocs<Research> = await payload.find({
    collection: 'research',
    where: {
      and: [
        {
          title: {
            like: searchTerm,
          },
        },
        {
          categories: {
            contains: catagoryId,
          },
        },
      ],
    },
    depth: 3,
  })
  return data.docs.map((doc) => researchDTOSchema.parse(doc))
}
