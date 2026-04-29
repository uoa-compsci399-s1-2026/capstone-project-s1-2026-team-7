import { getPayloadClient } from '@/lib/payload'
import { studiesDTOSchema, StudiesPageDTO } from '@/validation'
import { Lang } from '@/types/lang'
const payload = await getPayloadClient()

export async function getStudiesPage(locale: Lang = 'en'): Promise<StudiesPageDTO> {
  const data = await payload.findGlobal({
    slug: 'studies-page',
    locale,
    fallbackLocale: 'en',
    depth: 2,
  })

  return studiesDTOSchema.parse(data)
}
