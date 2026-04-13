'use client'
import React from 'react'
import ProfileCard from './Profile'
import { useState } from 'react'
import { ourteampageDTO } from '@/queries/ourteampageDTO'
import OurTeam from './page'
import { StaffDTO } from '@/queries/ourteampageDTO'

export type teamSectionProps = {
  teamSection: ourteampageDTO
}

export default function TeamSection({ teamSection }: teamSectionProps) {
  const [selected, setSelected] = useState<'board' | 'staff'>('staff')
  return (
    <div className="bg-white w-auto text-center mt-10 font-bold text-5xl text-[#0C0C48]">
      {teamSection.title}
      <div className="grid grid-cols-2 text-[18px] font-normal max-w-xs gap-4  mt-6 bg-white mx-auto">
        <button
          onClick={() => setSelected('board')}
          className={`cursor-pointer text-center border rounded-xl h-11 w-40 ${
            selected === 'board' ? 'bg-[#181851] text-white' : 'bg-white text-[#0F0F0F]'
          }`}
        >
          {teamSection.boardTabLabel}
        </button>

        <button
          onClick={() => setSelected('staff')}
          className={`cursor-pointer text-center border rounded-xl h-11 w-40 ${
            selected === 'staff' ? 'bg-[#181851] text-white' : 'bg-white text-[#0F0F0F]'
          }`}
        >
          {teamSection.staffTabLabel}
        </button>
      </div>
      <div className="flex justify-center mt-8">
        {/* change the grid cols section depending?*/}
        <div className="grid grid-cols-3 grid-auto-rows gap-8 max-w-5xl max-hxl w-full h-full">
          {teamSection.staff
            .filter((profile: StaffDTO) =>
              selected === 'board' ? profile.manager : !profile.manager,
            )
            .map((profile: StaffDTO) => (
              <ProfileCard key={profile.email} profile={profile} />
            ))}
        </div>
      </div>
    </div>
  )
}
