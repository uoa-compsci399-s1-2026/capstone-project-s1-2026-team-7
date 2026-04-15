import { getPayloadClient } from '@/lib/payload'
import { navigationBarSchema, NavigationBarDTO } from '@/validation'
const payload = await getPayloadClient()


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
