import { getPayloadClient } from '@/lib/payload'
import { navigationBarSchema, NavigationBarDTO } from '@/validation'
import { Lang } from '@/types/lang'

const payload = await getPayloadClient()

export async function getNavigationBar(locale: Lang = 'en'): Promise<NavigationBarDTO> {
  const data = await payload.findGlobal({
    slug: 'navigation-bar',
    locale,
    fallbackLocale: 'en',
    depth: 3,
  })

  return navigationBarSchema.parse(data)
}
