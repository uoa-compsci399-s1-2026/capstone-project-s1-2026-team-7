import ContactHero from './_components/ContactHero'
import type { Lang } from '../../type/lang'

type ContactPageProps = {
  params: Promise<{
    lang: string
  }>
}

const contactPageContent = {
  en: {
    heroTitle: 'Contact Us',
    heroImageAlt: 'Contact page hero image',
  },
  zh: {
    heroTitle: '联系我们',
    heroImageAlt: '联系页面横幅图片',
  },
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { lang } = await params
  const currentLang: Lang = lang === 'zh' ? 'zh' : 'en'

  const content = contactPageContent[currentLang]

  return (
    <ContactHero
      title={content.heroTitle}
      imageUrl="/contactHero.svg"
      imageAlt={content.heroImageAlt}
    />
  )
}
