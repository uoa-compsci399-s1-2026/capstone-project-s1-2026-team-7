import { getHomePage } from '@/queries/homepage'
import type { HomepageDTO } from '@/validation'
import type { Lang } from '@/types/lang'
import HeroSection from './_components/HeroSection'
import AboutSection from './_components/AboutSection'
import { StudiesSection } from './_components/StudiesSection'
import { PartnersSection } from './_components/PartnersSection'

type PageProps = {
  params: Promise<{
    lang: Lang
  }>
}

export default async function HomePage({ params }: PageProps) {
  const { lang } = await params
  const data: HomepageDTO = await getHomePage(lang)

  return (
    <>
      <HeroSection prop={data.hero} />
      <StudiesSection />
      <AboutSection data={data.aboutSection} />
      <PartnersSection partnersSection={data.partnersSection} />
    </>
  )
}
