import { getPayloadClient } from '@/lib/payload'
import { Media, Staff, ResearchCategory } from '@/payload-types'
export type UploadResearchDTO = {
  id: number
  title: string
  doi: string
  link: string
  image: Media
  date: string
  staffID: number[]
  categories: ResearchCategory[]
  order: number
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
      categories: article.categories,
      order: article.order,
    },
  })
}
