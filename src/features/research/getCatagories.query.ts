import { getPayloadClient } from '@/lib/payload'
import { ResearchCategory } from '@/payload-types'
import { researchCategorySchema } from '@/features'
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

export async function getAllCategories() {
  const data = await payload.find({
    collection: 'research-categories',
    sort: 'title',
    limit: 0,
    depth: 0,
  })

  return data.docs.map((category) => ({
    id: category.id,
    title: category.title,
    slug: category.slug,
  }))
}
