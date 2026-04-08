import { payload } from '@/lib/payload'
import { ourTeamPageDTOSchema } from '@/validation/our-team'

export async function getOurTeamPage(locale: 'en' | 'zh' | 'mi' = 'en') {
  const data = await payload.findGlobal({
    slug: 'our-team-page',
    locale,
    fallbackLocale: 'en',
    depth: 2,
  })

  return ourTeamPageDTOSchema.parse(data)
}
