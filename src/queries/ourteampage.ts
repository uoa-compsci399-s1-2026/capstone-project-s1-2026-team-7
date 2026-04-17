import { getPayloadClient } from '@/lib/payload'
import { ourTeamPageDTOSchema, OurTeamPageDTO } from '@/validation'
const payload = await getPayloadClient()

export async function getOurTeamPage(locale: 'en' | 'zh' | 'mi' = 'en'): Promise<OurTeamPageDTO> {
  const data = await payload.findGlobal({
    slug: 'our-team-page',
    locale,
    fallbackLocale: 'en',
    depth: 3,
  })

  return ourTeamPageDTOSchema.parse(data)
}
