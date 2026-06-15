import type { Metadata } from 'next'
import TeamSection from './_components/TeamSection'
import { getOurTeamPage } from '@/features/our-team/ourteampage.query'
import { OurTeamPageDTO } from '@/features/our-team'
import { PageProps } from '@/types/pageprops'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params
  const pageData: OurTeamPageDTO = await getOurTeamPage(lang)
  const title = pageData.meta?.title || 'Our Team'
  const description =
    pageData.meta?.description ||
    'Meet the Human Nutrition Unit team and learn about the people behind our research.'
  const metaImage =
    pageData.meta?.image && typeof pageData.meta.image === 'object'
      ? pageData.meta.image.url
      : undefined

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: metaImage ? [metaImage] : [],
    },
    alternates: {
      canonical: `/${lang}/ourteam`,
      languages: {
        en: '/en/ourteam',
        zh: '/zh/ourteam',
      },
    },
  }
}

export default async function OurTeam({ params }: PageProps) {
  const { lang } = await params
  const pageData: OurTeamPageDTO = await getOurTeamPage(lang)
  return <TeamSection teamSection={pageData} />
}
