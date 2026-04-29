import React from 'react'
import ProfileCard from './Profile'
import TeamSection from './TeamSection'
import { getOurTeamPage } from '@/queries/ourteampage'
import { OurTeamPageDTO, StaffDTO } from '@/validation/our-team'
import { select } from 'payload/shared'

export default async function OurTeam() {
  {
    /* Import from backend*/
  }

  const pageData: OurTeamPageDTO = await getOurTeamPage('en')

  return <TeamSection teamSection={pageData} />
}
