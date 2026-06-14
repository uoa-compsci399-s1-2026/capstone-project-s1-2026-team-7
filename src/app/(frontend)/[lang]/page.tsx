import type { Metadata } from 'next'
import { getHomePage } from '@/features/homepage/homepage.query'
import type { HomepageDTO } from '@/features/homepage/home.schema'
import HomepageRenderer from './_components/homepage/HomepageRenderer'
import { PageProps } from '@/types/pageprops'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params
  const data: HomepageDTO = await getHomePage(lang)

  const title = data.seo?.title || 'Human Nutrition Unit'

  const description =
    data.seo?.description || 'Human Nutrition Unit research, studies, and public information.'

  const metaImage =
    data.seo?.image && typeof data.seo.image === 'object' ? data.seo.image.url : undefined

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: metaImage ? [metaImage] : [],
    },
    alternates: {
      canonical: `/${lang}`,
      languages: {
        en: '/en',
        zh: '/zh',
      },
    },
  }
}

export default async function HomePage({ params }: PageProps) {
  const { lang } = await params
  const data: HomepageDTO = await getHomePage(lang)

  return (
    <main>
      <HomepageRenderer blocks={data.layout} lang={lang} />
    </main>
  )
}
