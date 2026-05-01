import { getPayloadClient } from '@/lib/payload'
import { studiesDTOSchema, StudiesPageDTO } from '@/validation'
import type { Lang } from '@/types/lang'

export async function getStudiesPage(locale: Lang = 'en'): Promise<StudiesPageDTO> {
  const payload = await getPayloadClient()

  const data = await payload.findGlobal({
    slug: 'studies-page',
    locale,
    fallbackLocale: 'en',
    depth: 2,
  })

  return studiesDTOSchema.parse(data)
}
