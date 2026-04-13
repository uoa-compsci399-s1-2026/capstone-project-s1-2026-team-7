import React from 'react'
import ProfileCard from './Profile'
import TeamSection from './TeamSection'
import { getOurTeamPage } from '@/queries/ourteampage'
import { ourteampageDTO, StaffDTO } from '@/queries/ourteampageDTO'

import { select } from 'payload/shared'

export default async function OurTeam() {
  {
    /* Import from backend*/
  }

  const pageData: ourteampageDTO = await getOurTeamPage('en')

  return <TeamSection teamSection={pageData} />
}
