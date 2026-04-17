import { getPayloadClient } from '@/lib/payload'
import { ResearchCategory } from '@/payload-types'
import { researchCategorySchema } from '@/validation'
import { PaginatedDocs } from 'payload'
const payload = await getPayloadClient()

export async function getCatagoryByTitle(slug: string) {
  const data: PaginatedDocs<ResearchCategory> = await payload.find({
    collection: 'research-categories',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  return researchCategorySchema.parse(data.docs[0])
}
