import { getPayloadClient } from '@/lib/payload'
import { researchPageDTOSchema, ResearchPageDTO } from '@/features'
import { Lang } from '@/types/lang'

const payload = await getPayloadClient()

export async function getResearchPage(locale: Lang = 'en'): Promise<ResearchPageDTO> {
  const data = await payload.findGlobal({
    slug: 'research-page',
    locale,
    fallbackLocale: 'en',
    depth: 3,
  })

  return researchPageDTOSchema.parse(data)
}
