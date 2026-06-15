import { getPayloadClient } from '@/lib/payload'
import { researchPageDTOSchema, ResearchPageDTO } from './research.schema'
import { Lang } from '@/types/lang'

const payload = await getPayloadClient()

export async function getResearchPage(locale: Lang = 'en'): Promise<ResearchPageDTO> {
  const data = await payload.findGlobal({
    slug: 'research-page',
    locale,
    fallbackLocale: 'en',
    depth: 3,
  })

  // The global stores these fields with spaces ("portrait image" / "mobile image"),
  // but the DTO schema expects camelCase. Map them before parsing.
  const normalized = {
    ...data,
    portraitImage: data['portrait image'],
    mobileImage: data['mobile image'],
  }

  return researchPageDTOSchema.parse(normalized)
}
