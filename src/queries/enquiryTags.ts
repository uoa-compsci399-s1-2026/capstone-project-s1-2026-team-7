import { z } from 'zod'
import { getPayloadClient } from '@/lib/payload'
import { enquiryTagSchema, type EnquiryTagDTO } from '@/validation/contact/contact.schema'
import type { Lang } from '@/types/lang'

export async function getEnquiryTags(locale: Lang = 'en'): Promise<EnquiryTagDTO[]> {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'enquiry-tags',
    locale,
    fallbackLocale: 'en',
    depth: 0,
    limit: 100,
  })

  return z.array(enquiryTagSchema).parse(result.docs)
}
