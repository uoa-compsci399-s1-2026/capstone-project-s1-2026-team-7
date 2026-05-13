import { getPayloadClient } from '@/lib/payload'
import { Study } from '@/payload-types'
import { Lang } from '@/types/lang'
import { PaginatedDocs } from 'payload'
import { studySchema, StudyDTO } from '@/features'

export async function getStudyBySlug(locale: Lang = 'en', slug: string): Promise<StudyDTO> {
  const payload = await getPayloadClient()
  const data: PaginatedDocs<Study> = await payload.find({
    collection: 'studies',
    locale,
    fallbackLocale: 'en',
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 3,
    limit: 1,
  })

  const study = data.docs[0]
  return studySchema.parse(study)
}
