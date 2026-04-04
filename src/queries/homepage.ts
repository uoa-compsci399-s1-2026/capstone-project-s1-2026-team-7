import { payload } from '@/lib/payload'
type SiteLocale = 'en' | 'zh' | 'mi'

export async function getHomePage(locale: SiteLocale = 'en') {
  const homePage = await payload.findGlobal({
    slug: 'home-page',
    locale,
    fallbackLocale: 'en',
    depth: 1,
  })

  return homePage
}
