import { payload } from '@/lib/payload'
import { navigationBarSchema, NavigationBarDTO } from '@/validation/navigationBar'

export async function getNavigationBar(
  locale: 'en' | 'zh' | 'mi' = 'en',
): Promise<NavigationBarDTO> {
  const data = await payload.findGlobal({
    slug: 'navigation-bar',
    locale,
    fallbackLocale: 'en',
    depth: 3,
  })

  return navigationBarSchema.parse(data)
}
