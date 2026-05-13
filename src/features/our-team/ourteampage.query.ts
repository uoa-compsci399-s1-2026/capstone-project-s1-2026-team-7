import { getPayloadClient } from '@/lib/payload'
import { ourTeamPageDTOSchema, OurTeamPageDTO } from '@/features'
import { Lang } from '@/types/lang'

const payload = await getPayloadClient()

export async function getOurTeamPage(locale: Lang = 'en'): Promise<OurTeamPageDTO> {
  const data = await payload.findGlobal({
    slug: 'our-team-page',
    locale,
    fallbackLocale: 'en',
    depth: 3,
  })

  return ourTeamPageDTOSchema.parse(data)
}
