import { ResearchDTO, researchDTOSchema } from '@/validation'
import { getPayloadClient } from '@/lib/payload'
import { PaginatedDocs } from 'payload'
import { Research } from '@/payload-types'
const payload = await getPayloadClient()

export async function searchResearch(
  searchTerm: string,
  catagoryId: number,
): Promise<ResearchDTO[]> {
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
            equals: catagoryId,
          },
        },
      ],
    },
    depth: 3,
  })
  return data.docs.map((doc) => researchDTOSchema.parse(doc))
}
