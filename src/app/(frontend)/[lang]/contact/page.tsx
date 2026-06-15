import Banner from '../_components/Banner'
import ContactForm from './_components/ContactForm'
import ContactMap from './_components/ContactMap'
import type { Lang } from '@/types/lang'
import { getContactPage } from '@/features/contact/contactPage.query'
import { getEnquiryTags } from '@/features/contact/enquiryTags.query'
import { sendContactEmail } from './action'
import { PageProps } from '@/types/pageprops'

import type { Metadata } from 'next'

function getImageUrl(image: unknown): string | undefined {
  if (!image || typeof image !== 'object') {
    return undefined
  }

  const url = (image as { url?: string | null }).url

  return url ?? undefined
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params
  const currentLang: Lang = lang === 'zh' ? 'zh' : 'en'
  const content = await getContactPage(currentLang)
  const title = content.meta?.title || content.heroTitle || 'Contact'
  const description = content.meta?.description || 'Contact the Human Nutrition Unit.'
  const imageUrl = getImageUrl(content.meta?.image) || getImageUrl(content.heroImage)
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: imageUrl
        ? [
            {
              url: imageUrl,
              alt: title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: imageUrl ? 'summary_large_image' : 'summary',
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  }
}

export default async function ContactPage({ params }: PageProps) {
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
