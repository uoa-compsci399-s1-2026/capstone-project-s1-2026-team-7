import { getPayloadClient } from '@/lib/payload'
import type { Media, ResearchCategory } from '@/payload-types'

export type UploadResearchDTO = {
  title: string
  doi: string
  link: string
  date: string
  staffID: number[]
  image?: Media
  categories?: ResearchCategory[]
  categoryIDs?: number[]
  order?: number
}

export type UploadResearchResult = {
  id?: number | string
  reason?: string
  status: 'created' | 'skipped' | 'updated'
}

function normalizeDoi(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\/(dx\.)?doi\.org\//, '')
    .replace(/^doi:/, '')
}

export async function uploadResearch(article: UploadResearchDTO): Promise<UploadResearchResult> {
  const payload = await getPayloadClient()

  if (!article.link) {
    console.log(`Skipping article with no URL: ${article.title}`)
    return { status: 'skipped', reason: 'Missing URL' }
  }

  if (!article.doi) {
    console.log(`Skipping article with no DOI: ${article.title}`)
    return { status: 'skipped', reason: 'Missing DOI' }
  }

  const doi = normalizeDoi(article.doi)
  const categoryIDs =
    article.categoryIDs ?? article.categories?.map((category) => category.id) ?? []

  const data = {
    title: article.title,
    doi,
    link: article.link,
    image: article.image,
    date: article.date,
    staff: article.staffID,
    categories: categoryIDs,
    order: article.order ?? 0,
  }

  const existing = await payload.find({
    collection: 'research',
    where: {
      doi: {
        equals: doi,
      },
    },
    limit: 1,
  })

  const existingDoc = existing.docs[0]

  if (existingDoc) {
    await payload.update({
      collection: 'research',
      id: existingDoc.id,
      data,
    })

    return { id: existingDoc.id, status: 'updated' }
  }

  const created = await payload.create({
    collection: 'research',
    data,
  })

  return { id: created.id, status: 'created' }
}
