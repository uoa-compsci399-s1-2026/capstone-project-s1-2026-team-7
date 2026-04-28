import { Lang } from '@/types/lang'
import { getStudiesBySlug } from '@/queries/getStudyBySlug'
import { StudyDTO } from '@/validation'
import { RichTextRenderer } from '@/lib/richTextRenderer'

export type StudiesPageProps = {
  params: Promise<{
    lang: Lang
    slug: string
  }>
}

export default async function StudiesTemplatePage({ params }: StudiesPageProps) {
  const { lang, slug } = await params
  const result: StudyDTO = await getStudiesBySlug(lang, slug)
  return (
    <main>
      {result.id}
      {result.title}
      <RichTextRenderer data={result.description} />
      {result.sortOrder}
    </main>
  )
}
