import { Lang } from '@/types/lang'
import { getStudiesBySlug } from '@/queries/getStudyBySlug'
import { StudyDTO } from '@/validation'
import { RichTextRenderer } from '@/lib/richTextRenderer'
import Banner from '../../_components/Banner'
import InformationComponent from './InformationComponent'
import { BookOpen, Phone, Info } from 'lucide-react'

import ContactComponent from './ContactComponent'

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
      <Banner title={result.title} imageUrl={result.banner.url} imageAlt={result.banner.alt} />

      <section className="mx-auto w-full max-w-4xl px-4 py-20">
        <RichTextRenderer data={result.description} />
      </section>

      <section className="mx-10 flex flex-col items-center justify-center gap-10 md:flex-row ">
        {/*<InformationComponent
    Icon={BookOpen}
    title="Studies"
    description="Read more about our studies."
    link="/studies"
  />*/}

        <InformationComponent
          Icon={Phone}
          title="Pre-Screening Survey"
          description="You cannot be in the study if you have already been diagnosed with diabetes. You can start by completing the pre-screening survey."
          link="/en/"
        />

        <InformationComponent
          Icon={Info}
          title="Ethics & Study Information"
          description="This study has been approved by the Southern Health and Disability Ethics Committee, and you can find additional details and FAQs on the University of Auckland website."
          link="/en/"
        />
      </section>

      <ContactComponent />
    </main>
  )
}
