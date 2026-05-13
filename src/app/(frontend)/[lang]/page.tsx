import { getHomePage } from '@/features/homepage/homepage.query'
import type { HomepageDTO } from '@/features'
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

  return (
    <main>
      <HomepageRenderer blocks={data.layout} />
    </main>
  )
}
