'use client'

import React from 'react'
import ProfileCard from './Profile'
import TeamButton from './TeamButton'
import { useState } from 'react'
import { getOurTeamPage } from '@/queries/ourteampage'
import { ourteampageDTO, StaffDTO } from '@/queries/ourteampageDTO'

import { select } from 'payload/shared'

export default async function OurTeam() {
  {
    /* Import from backend*/
  }
  const pageData: ourteampageDTO = await getOurTeamPage('en')

  const [selected, setSelected] = useState('Research Team')

  const buttons = ['Board of Directors', 'Research Team']

  return (
    <div className=" bg-white text-5xl text-center text-[#0C0C48] font-medium mt-16">
      Meet The Team
      <div className="flex justify-center mt-4">
        <div className="grid grid-cols-2 max-w-sm w-full gap-4">
          {buttons.map((label) => (
            <TeamButton
              key={label}
              label={label}
              selected={selected === label}
              onClick={() => setSelected(label)}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-8">
        {/* change the grid cols section depending?*/}
        <div className="grid grid-cols-3 grid-auto-rows gap-8 max-w-5xl w-full">
          {/* replace following with for loop of array of staff profiles*/}
          <ProfileCard
            profile={{
              photo: '/Sally.png',
              firstName: 'John',
              lastName: 'Doe',
              job: 'Software Engineer',
              uoaID: 'u1234567',
              email: 'john.doe@uoa.ac.nz',
              desc: "I'm a team member",
            }}
          />
          <ProfileCard
            profile={{
              photo: '/HongLeiu.png',
              firstName: 'John',
              lastName: 'Doe',
              job: 'Software Engineer',
              uoaID: 'u1234567',
              email: 'john.doe@uoa.ac.nz',
              desc: "I'm a team member",
            }}
          />
          <ProfileCard
            profile={{
              photo: '/HongLeiu.png',
              firstName: 'John',
              lastName: 'Doe',
              job: 'Software Engineer',
              uoaID: 'u1234567',
              email: 'john.doe@uoa.ac.nz',
              desc: "I'm a team member",
            }}
          />
          <ProfileCard
            profile={{
              photo: '/HongLeiu.png',
              firstName: 'John',
              lastName: 'Doe',
              job: 'Software Engineer',
              uoaID: 'u1234567',
              email: 'john.doe@uoa.ac.nz',
              desc: "I'm a team member",
            }}
          />
          <ProfileCard
            profile={{
              photo: '/HongLeiu.png',
              firstName: 'John',
              lastName: 'Doe',
              job: 'Software Engineer',
              uoaID: 'u1234567',
              email: 'john.doe@uoa.ac.nz',
              desc: "I'm a team member",
            }}
          />
        </div>
      </div>
    </div>
  )
}
