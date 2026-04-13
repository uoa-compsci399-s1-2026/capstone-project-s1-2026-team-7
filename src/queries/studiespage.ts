import { payload } from '@/lib/payload'
import { studiesDTOSchema, StudiesPageDTO } from '@/validation'

export async function getStudiesPage(locale: 'en' | 'zh' | 'mi' = 'en'): Promise<StudiesPageDTO> {
  const data = await payload.findGlobal({
    slug: 'studies-page',
    locale,
    fallbackLocale: 'en',
    depth: 1,
  })

  return studiesDTOSchema.parse(data)
}
