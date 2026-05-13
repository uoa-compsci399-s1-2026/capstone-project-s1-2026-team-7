import { getPayloadClient } from '@/lib/payload'
import { Media, ResearchCategory } from '@/payload-types'

export type UploadResearchDTO = {
  title: string
  doi: string
  link: string
  date: string
  staffID: number[]
  image?: Media
  categories?: ResearchCategory[]
  order?: number
}

export async function uploadResearch(article: UploadResearchDTO): Promise<void> {
  const payload = await getPayloadClient()

  if (!article.link) {
    console.log(`Skipping article with no URL: ${article.title}`)
    return
  }

  if (!article.doi) {
    console.log(`Skipping article with no DOI: ${article.title}`)
    return
  }

  await payload.create({
    collection: 'research',
    data: {
      title: article.title,
      doi: article.doi,
      link: article.link,
      image: article.image,
      date: article.date,
      staff: article.staffID,
      categories: article.categories ?? [],
      order: article.order ?? 0,
    },
  })
}
