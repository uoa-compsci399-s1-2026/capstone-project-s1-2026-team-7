'use client'
import React from 'react'
import ProfileCard from './Profile'
import { useState } from 'react'
import { OurTeamPageDTO } from '@/validation/our-team'
import OurTeam from './page'
import { StaffDTO } from '@/validation/our-team'

export type teamSectionProps = {
  teamSection: OurTeamPageDTO
}

export default function TeamSection({ teamSection }: teamSectionProps) {
  const [selected, setSelected] = useState<'board' | 'staff'>('staff')
  const boardCount = teamSection.staff.filter((p) => p.manager).length
  const staffCount = teamSection.staff.filter((p) => !p.manager).length
  return (
    <div
      className="container mx-auto text-center
    xl:w-321.25
    md:w-3xl
    w-81.25"
    >
      <div
        className="flex flex-col bg-[url('/background.png')] w-auto justify-center text-center font-bold text-white
    xl:mt-11.5 xl:text-[48px] xl:h-59 xl:bg-center xl:bg-size-[100%_auto]
    md:mt-5.5 md:text-[34.7px] md:h-38.5 md:bg-position-[15%_center md:bg-size-[110%_auto]
    mt-7.5 text-[22.81px] h-27.5 bg-position-[20%_center] bg-size-[185%_auto] "
      >
        {teamSection.title}
        <div
          className="grid grid-cols-2  font-normal mx-auto
      xl:w-96.75 xl:gap-3.5 xl:text-[18px] xl:mt-7
      md:w-72 md:gap-3 md:text-[13.2px] md:mt-4.5
      w-45.75 gap-2 text-[8.36px] mt-3.5"
        >
          <button
            onClick={() => setSelected('board')}
            className={`cursor-pointer text-center border text-white
            xl:h-12.75 xl:w-46.5 xl:rounded-[13px]
            md:h-[38.28px] md:w-34.5 md:rounded-[9.65px]
            h-6 w-22 rounded-md
             ${selected === 'board' ? 'bg-[#181851] border-[#181851]' : 'bg-transparent border-white'}`}
          >
            {teamSection.boardTabLabel}
          </button>

          <button
            onClick={() => setSelected('staff')}
            className={`cursor-pointer text-center border text-white
             xl:h-12.75 xl:w-46.5 xl:rounded-[13px]
             md:h-[38.28px] md:w-34.5 md:rounded-[9.65px]
             h-6 w-22 rounded-md
              ${selected === 'staff' ? 'bg-[#181851] border-[#181851]' : 'bg-transparent border-white'}`}
          >
            {teamSection.staffTabLabel} ({staffCount})
          </button>
        </div>
      </div>
      <div
        className="flex justify-center
      xl:mt-25
      md:mt-4
      m-15"
      >
        {/* change the grid cols section depending?*/}
        <div className="grid  justify-center justify-items-center  md:grid-cols-3 grid-cols-1 grid-auto-rows gap-8 max-w-5xl max-hxl w-full h-full">
          {teamSection.staff
            .filter((profile: StaffDTO) =>
              selected === 'board' ? profile.manager : !profile.manager,
            )
            .map((profile: StaffDTO) => (
              <ProfileCard key={profile.firstname} profile={profile} />
            ))}
        </div>
      </div>
    </div>
  )
}
