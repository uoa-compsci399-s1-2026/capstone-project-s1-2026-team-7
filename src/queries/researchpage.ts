import { getPayloadClient } from '@/lib/payload'
import { researchPageDTOSchema, ResearchPageDTO } from '@/validation'
const payload = await getPayloadClient()

export async function getResearchPage(locale: 'en' | 'zh' | 'mi' = 'en'): Promise<ResearchPageDTO> {
  const data = await payload.findGlobal({
    slug: 'research-page',
    locale,
    fallbackLocale: 'en',
    depth: 2,
  })

  return researchPageDTOSchema.parse(data)
}
