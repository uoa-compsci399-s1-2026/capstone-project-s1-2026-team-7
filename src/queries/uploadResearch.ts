import { getPayloadClient } from '@/lib/payload'

export type UploadResearchDTO = {
  title: string
  doi: string
  url: string
  publicationDate: string
  staffIds: number[]
}

export async function uploadResearch(article: UploadResearchDTO): Promise<void> {
  const payload = await getPayloadClient()

  if (!article.url) {
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
      researchLink: article.url,
      date: article.publicationDate,
      staff: article.staffIds,
    },
  })
}
