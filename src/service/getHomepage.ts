import config from '@payload-config'
import { getPayload } from 'payload'

type SiteLocale = 'en' | 'zh' | 'mi'

export async function getHomePage(locale: SiteLocale = 'en') {
  const payload = await getPayload({ config })

  const homePage = await payload.findGlobal({
    slug: 'home-page',
    locale,
    fallbackLocale: 'en',
    depth: 1,
  })

  return homePage
}
