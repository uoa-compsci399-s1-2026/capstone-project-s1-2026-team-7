import TeamSection from './TeamSection'
import { getOurTeamPage } from '@/queries/ourteampage'
import { OurTeamPageDTO } from '@/validation/our-team'

export default async function OurTeam() {
  const pageData: OurTeamPageDTO = await getOurTeamPage('en')
  return <TeamSection teamSection={pageData} />
}
