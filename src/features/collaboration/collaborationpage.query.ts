import { getPayloadClient } from '@/lib/payload'
import type { Lang } from '@/types/lang'

import { collaborationsPageSchema, CollaborationsPageDTO } from './collaboration.schema'

export async function getCollaborationsPage(locale: Lang = 'en'): Promise<CollaborationsPageDTO> {
  const payload = await getPayloadClient()

  const data = await payload.findGlobal({
    slug: 'collaborations-page',
    locale,
    fallbackLocale: 'en',
    depth: 1,
  })

  return collaborationsPageSchema.parse(data)
}
