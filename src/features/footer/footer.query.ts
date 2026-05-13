import { getPayloadClient } from '@/lib/payload'
import { footerSchema, FooterDTO } from '@/features'
import { Lang } from '@/types/lang'

const payload = await getPayloadClient()

export async function getFooter(locale: Lang = 'en'): Promise<FooterDTO> {
  const data = await payload.findGlobal({
    slug: 'footer',
    locale,
    fallbackLocale: 'en',
    depth: 3,
  })

  return footerSchema.parse(data)
}
