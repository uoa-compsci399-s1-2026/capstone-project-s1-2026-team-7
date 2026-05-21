import { getPayloadClient } from '@/lib/payload'
import { homepageSchema, HomepageDTO } from '@/features'

import { Lang } from '@/types/lang'

const payload = await getPayloadClient()

export async function getHomePage(locale: Lang = 'en'): Promise<HomepageDTO> {
  const data = await payload.findGlobal({
    slug: 'home-page',
    locale,
    fallbackLocale: 'en',
    depth: 4,
  })

  return homepageSchema.parse(data)
}
