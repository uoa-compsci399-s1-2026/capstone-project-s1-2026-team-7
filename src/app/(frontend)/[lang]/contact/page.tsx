import Banner from '../_components/Banner'
import ContactForm from './_components/ContactForm'
import ContactMap from './_components/ContactMap'
import type { Lang } from '@/types/lang'
import { getContactPage } from '@/features/contact/contactPage.query'
import { getEnquiryTags } from '@/features/contact/enquiryTags.query'
import { sendContactEmail } from './action'

type ContactPageProps = {
  params: Promise<{ lang: string }>
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { lang } = await params
  const currentLang: Lang = lang === 'zh' ? 'zh' : 'en'

  const [content, tags] = await Promise.all([
    getContactPage(currentLang),
    getEnquiryTags(currentLang),
  ])

  return (
    <>
      <Banner
        title={content.heroTitle}
        imageUrl={content.heroImage.url}
        imageAlt={content.heroImage?.alt ?? content.heroImageAlt}
      />

      <section className="bg-white px-8 py-20 md:px-16">
        <div className="mx-auto grid max-w-300 grid-cols-1 gap-16 md:grid-cols-2 md:items-start">
          <ContactForm content={content.form} tags={tags} action={sendContactEmail} />
          <ContactMap src={content.mapSrc} />
        </div>
      </section>
    </>
  )
}
