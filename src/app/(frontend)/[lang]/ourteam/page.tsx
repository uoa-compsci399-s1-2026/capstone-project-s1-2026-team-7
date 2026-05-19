import TeamSection from './_components/TeamSection'
import { getOurTeamPage } from '@/features/our-team/ourteampage.query'
import { OurTeamPageDTO } from '@/features/our-team'
import { Lang } from '@/types/lang'

type PageProps = {
  params: Promise<{
    lang: Lang
  }>
}

export default async function OurTeam({ params }: PageProps) {
  const { lang } = await params

  const pageData: OurTeamPageDTO = await getOurTeamPage(lang)
  return <TeamSection teamSection={pageData} />
}
