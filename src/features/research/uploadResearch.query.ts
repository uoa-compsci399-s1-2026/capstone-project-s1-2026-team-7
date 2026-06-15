import { getPayloadClient } from '@/lib/payload'
import type { Media, ResearchCategory } from '@/payload-types'
import type { Payload, Where } from 'payload'
import { isCsvResearchIdentityExcluded, normalizeCsvDoi } from './researchCsvDeletionPersistence'

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

async function findExistingResearch(payload: Payload, article: UploadResearchDTO, doi: string) {
  if (doi) {
    const existingByDoi = await payload.find({
      collection: 'research',
      where: {
        doi: {
          equals: doi,
        },
      },
      limit: 1,
      overrideAccess: true,
    })

    if (existingByDoi.docs[0]) {
      return existingByDoi.docs[0]
    }
  }

  const fallbackFilters: Where[] = [
    {
      title: {
        equals: article.title,
      },
    },
  ]

  if (article.link) {
    fallbackFilters.push({
      link: {
        equals: article.link,
      },
    })
  }

  if (article.date) {
    fallbackFilters.push({
      date: {
        equals: article.date,
      },
    })
  }

  const existingByFallback = await payload.find({
    collection: 'research',
    where: {
      and: fallbackFilters,
    },
    limit: 1,
    overrideAccess: true,
  })

  return existingByFallback.docs[0]
}

export async function uploadResearch(article: UploadResearchDTO): Promise<UploadResearchResult> {
  const payload = await getPayloadClient()
  const doi = normalizeCsvDoi(article.doi)
  const link = article.link?.trim() ?? ''
  const date = article.date?.trim() ?? ''
  const categoryIDs =
    article.categoryIDs ?? article.categories?.map((category) => category.id) ?? []

  const isExcluded = await isCsvResearchIdentityExcluded(
    {
      title: article.title,
      doi,
      link,
      date,
    },
    payload,
  )

  if (isExcluded) {
    return {
      status: 'skipped',
      reason: 'This research record is listed in Excluded Research and will not be imported.',
    }
  }

  const data = {
    title: article.title,
    doi,
    link,
    image: article.image,
    date,
    staff: article.staffID,
    categories: categoryIDs,
    source: 'orcid-csv',
    csvDeleted: false,
    csvDeletedAt: null,
    order: article.order ?? 0,
  }

  const existingDoc = await findExistingResearch(payload, { ...article, link, date }, doi)

  if (existingDoc) {
    await payload.update({
      collection: 'research',
      id: existingDoc.id,
      data: data as any,
      overrideAccess: true,
    })

    return { id: existingDoc.id, status: 'updated' }
  }

  const created = await payload.create({
    collection: 'research',
    data: data as any,
    overrideAccess: true,
  })

  return { id: created.id, status: 'created' }
}
