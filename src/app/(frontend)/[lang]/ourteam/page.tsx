import TeamSection from './TeamSection'
import { getOurTeamPage } from '@/features/our-team/ourteampage.query'
import { OurTeamPageDTO } from '@/features/our-team'

export default async function OurTeam() {
  const pageData: OurTeamPageDTO = await getOurTeamPage('en')
  return <TeamSection teamSection={pageData} />
}
