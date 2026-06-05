import { getPayloadClient } from '@/lib/payload'
import { Study } from '@/payload-types'
import { Lang } from '@/types/lang'
import { PaginatedDocs } from 'payload'
import { studySchema, StudyDTO } from '@/features'

export type StudyWithTranslationState = {
  study: StudyDTO

  hasTranslation: boolean
}

export async function getStudyBySlug(
  locale: Lang = 'en',
  slug: string,
): Promise<StudyWithTranslationState> {
  const payload = await getPayloadClient()

  // English: always show normally.
  if (locale === 'en') {
    const data: PaginatedDocs<Study> = await payload.find({
      collection: 'studies',
      locale: 'en',
      fallbackLocale: 'en',
      where: { slug: { equals: slug } },
      depth: 3,
      limit: 1,
    })
    return { study: studySchema.parse(data.docs[0]), hasTranslation: true }
  }

  const zhData: PaginatedDocs<Study> = await payload.find({
    collection: 'studies',
    locale: 'zh',
    fallbackLocale: 'en',
    where: { slug: { equals: slug } },
    depth: 3,
    limit: 1,
  })

  const zhRaw = zhData.docs[0]
  const approved = zhRaw?.chineseTranslationApproved === true

  if (approved) {
    // Admin has approved — show the Chinese translation.
    return { study: studySchema.parse(zhRaw), hasTranslation: true }
  }

  // Not approved → force English content + warn.
  const enData: PaginatedDocs<Study> = await payload.find({
    collection: 'studies',
    locale: 'en',
    fallbackLocale: 'en',
    where: { slug: { equals: slug } },
    depth: 3,
    limit: 1,
  })

  return { study: studySchema.parse(enData.docs[0]), hasTranslation: false }
}
