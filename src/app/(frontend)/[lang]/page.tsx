import { getHomePage } from '@/queries/homepage'
import HeroSection from './HeroSection'
import AboutSection from './AboutSection'
import { StudiesSection } from './StudiesSection'
import type { HomepageDTO } from '@/validation'
import type { Lang } from '../type/lang'

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
    </>
  )
}
