import { getPayloadClient } from '@/lib/payload'

export type UploadResearchDTO = {
  title: string
  url: string
  publicationDate: string
}

export async function uploadResearch(article: UploadResearchDTO): Promise<void> {
  const payload = await getPayloadClient()

  if (!article.url) {
    console.log(`Skipping article with no URL: ${article.title}`)
    return
  }

  await payload.create({
    collection: 'research',
    data: {
      title: article.title,
      researchLink: article.url,
      date: article.publicationDate,
    },
  })
}
