import { getHomePage } from '@/queries/homepage'
import HeroSection from './HeroSection'
import { HomepageDTO } from '@/validation'
import { Lang } from '@/types/lang'

type PageProps = {
  params: Promise<{
    lang: Lang
  }>
}

export default async function HomePage({ params }: PageProps) {
  const { lang } = await params
  const data: HomepageDTO = await getHomePage(lang)
  return (
    <main>
      <HeroSection prop={data.hero} />
    </main>
  )
}
