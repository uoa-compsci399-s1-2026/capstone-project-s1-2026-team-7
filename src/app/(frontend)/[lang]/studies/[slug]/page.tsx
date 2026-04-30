import { Lang } from '@/types/lang'
import { getStudyBySlug } from '@/queries/getStudyBySlug'
import { StudyDTO } from '@/validation'
import { RichTextRenderer } from '@/lib/richTextRenderer'
import Banner from '../../_components/Banner'
import StudyActionSection from './StudyActionSection'
import ContactComponent from './ContactComponent'

export type StudiesPageProps = {
  params: Promise<{
    lang: Lang
    slug: string
  }>
}

export default async function StudiesTemplatePage({ params }: StudiesPageProps) {
  const { lang, slug } = await params
  const result: StudyDTO = await getStudyBySlug(lang, slug)

  return (
    <main>
      <Banner title={result.title} imageUrl={result.banner.url} imageAlt={result.banner.alt} />

      {result.subtitle && (
        <section className="mx-auto max-w-4xl px-4 pt-10 text-center">
          <p className="text-xl leading-relaxed text-[#08084F] md:text-2xl">{result.subtitle}</p>
        </section>
      )}

      <section className="mx-auto w-full max-w-4xl px-4 py-20">
        <RichTextRenderer data={result.description} />
      </section>

      <StudyActionSection />

      <ContactComponent />
    </main>
  )
}
