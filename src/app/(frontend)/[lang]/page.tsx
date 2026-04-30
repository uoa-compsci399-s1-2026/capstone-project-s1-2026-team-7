import { getHomePage } from '@/queries/homepage'
import type { HomepageDTO } from '@/validation'
import type { Lang } from '@/types/lang'
import HeroSection from './_components/HeroSection'
import AboutSection from './_components/AboutSection'
import { StudiesSection } from './_components/StudiesSection'
import { PartnersSection } from './_components/PartnersSection'
import ParticipantsStats from './_components/ParticipantsStats'
import ServicesSection from './_components/ServicesSection'
import ContactCTA from './_components/ContactCTA'

type PageProps = {
  params: Promise<{
    lang: Lang
  }>
}

export default async function HomePage({ params }: PageProps) {
  const { lang } = await params
  const data: HomepageDTO = await getHomePage(lang)
  const currentLang: Lang = lang === 'zh' ? 'zh' : 'en'

  return (
    <>
      <HeroSection prop={data.hero} />
      <StudiesSection />
      <AboutSection data={data.aboutSection} />
      <ServicesSection />
      <ParticipantsStats />
      <PartnersSection partnersSection={data.partnersSection} />
      <ContactCTA currentLang={currentLang} />
    </>
  )
}
