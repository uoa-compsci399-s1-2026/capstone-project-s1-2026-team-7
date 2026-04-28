import { getHomePage } from '@/queries/homepage'
import { HomepageDTO } from '@/validation'
import { Lang } from '@/types/lang'
import HeroSection from './_components/HeroSection'
import AboutSection from './_components/AboutSection'
import { StudiesSection } from './_components/StudiesSection'

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
