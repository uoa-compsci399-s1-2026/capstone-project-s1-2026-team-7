import type { Metadata } from 'next'
import { getHomePage } from '@/features/homepage/homepage.query'
import type { HomepageDTO } from '@/features/homepage/home.schema'
import HomepageRenderer from './_components/homepage/HomepageRenderer'
import { PageProps } from '@/types/pageprops'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params
  const data: HomepageDTO = await getHomePage(lang)

  const title = data.meta?.title || 'Human Nutrition Unit'

  const description =
    data.meta?.description || 'Human Nutrition Unit research, studies, and public information.'

  const metaImage =
    data.meta?.image && typeof data.meta.image === 'object' ? data.meta.image.url : undefined

  return {
    title: {
      absolute: title,
    },
    description,
    openGraph: {
      title,
      description,
      images: metaImage ? [metaImage] : undefined,
    },
    twitter: {
      card: metaImage ? 'summary_large_image' : 'summary',
      title,
      description,
      images: metaImage ? [metaImage] : undefined,
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
