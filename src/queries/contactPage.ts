import { getPayloadClient } from '@/lib/payload'
import { contactPageDTOSchema, ContactPageDTO } from '@/validation/contact/contact.schema'
import type { Lang } from '@/types/lang'

export async function getContactPage(locale: Lang = 'en'): Promise<ContactPageDTO> {
  const payload = await getPayloadClient()

  const data = await payload.findGlobal({
    slug: 'contact-page',
    locale,
    fallbackLocale: 'en',
    depth: 1,
  })

  return contactPageDTOSchema.parse(data)
}
