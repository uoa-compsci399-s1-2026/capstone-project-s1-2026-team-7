import { getPayloadClient } from '@/lib/payload'
type SiteLocale = 'en' | 'zh' | 'mi'
import { homepageSchema, HomepageDTO } from '@/validation'
const payload = await getPayloadClient()


export async function getHomePage(locale: SiteLocale = 'en'): Promise<HomepageDTO> {
  const data = await payload.findGlobal({
    slug: 'home-page',
    locale,
    fallbackLocale: 'en',
    depth: 1,
  })

  return homepageSchema.parse(data)
}
