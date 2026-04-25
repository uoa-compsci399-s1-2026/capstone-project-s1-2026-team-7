import React from 'react'
import { getOurTeamPage } from '@/queries/ourteampage'
import { OurTeamPageDTO, StaffDTO } from '@/validation/our-team'

async function Page() {
  const things: OurTeamPageDTO = await getOurTeamPage('en')

  return (
    <div>
      <p>{things.title}</p>

      <button>{things.boardTabLabel}</button>
      <button>{things.staffTabLabel}</button>

      {things.staff.map((staffperson: StaffDTO, index: number) => {
        return (
          <div key={index}>
            <p>{staffperson.firstname}</p>
            <p>{staffperson.lastname}</p>
            <p>{staffperson.email}</p>
            <p>{staffperson.jobTitle}</p>
            <img src={staffperson.photo.url} />
          </div>
        )
      })}
    </div>
  )
}

export default Page
