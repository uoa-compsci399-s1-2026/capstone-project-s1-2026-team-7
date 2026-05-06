import { getHomePage } from '@/queries/homepage'
import type { HomepageDTO } from '@/validation'
import type { Lang } from '@/types/lang'
import HomepageRenderer from './_components/homepage/HomepageRenderer'

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
    <main>
      <HomepageRenderer blocks={data.layout} />
    </main>
  )
}
