import Banner from '../_components/Banner'
import ContactForm from './_components/ContactForm'
import ContactMap from './_components/ContactMap'
import type { Lang } from '../../type/lang'

type ContactPageProps = {
  params: Promise<{
    lang: string
  }>
}

const contactPageContent = {
  en: {
    heroTitle: 'Contact Us',
    url: '/contactHero.svg',
    heroImageAlt: 'Contact page hero image',

    name: 'Name',
    email: 'Email Address',
    phone: 'Phone Number',
    message: 'Your Message',

    namePlaceholder: 'John Doe',
    emailPlaceholder: 'example@gmail.com',
    phonePlaceholder: '0226461819',
    messagePlaceholder: 'Let us know how we can help',

    button: 'Send Message',

    location: 'Location',
    address: '18 Carrick Place, Mt Eden\nAuckland 1024, New Zealand',
  },

  zh: {
    heroTitle: '联系我们',
    url: '/contactHero.svg',
    heroImageAlt: '联系页面横幅图片',

    name: '姓名',
    email: '电子邮箱',
    phone: '电话号码',
    message: '留言',

    namePlaceholder: 'John Doe',
    emailPlaceholder: 'example@gmail.com',
    phonePlaceholder: '0226461819',
    messagePlaceholder: '请告诉我们您需要什么帮助',

    button: '发送信息',

    location: '位置',
    address: '18 Carrick Place, Mt Eden\nAuckland 1024, New Zealand',
  },
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { lang } = await params
  const currentLang: Lang = lang === 'zh' ? 'zh' : 'en'

  const content = contactPageContent[currentLang]

  return (
    <>
      <Banner title={content.heroTitle} imageUrl={content.url} imageAlt={content.heroImageAlt} />

      <section className="bg-white px-8 py-20 md:px-16">
        <div className="mx-auto grid max-w-300 grid-cols-1 gap-16 md:grid-cols-2 md:items-start">
          <ContactForm content={content} />
          <ContactMap />
        </div>
      </section>
    </>
  )
}
