import React from 'react'
import { StaffDTO } from '@/validation/our-team'
import { ImageDTO } from '@/validation/common'
import { Mail, UserRound } from 'lucide-react'

export type ProfileProps = {
  profile: StaffDTO
}

export default function ProfileCard({ profile }: ProfileProps) {
  const { firstname, lastname, jobTitle, intro, manager, uoaProfileLink, email, photo, sortOrder } =
    profile
  return (
    <div className="w-full h-full bg-white rounded-[40px] hover:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.25)] transition duration-300">
      <img className="scale-60 my-2 rounded-full" src={photo.url} />
      <p className="text-2xl my-auto text-black font-bold text-center">
        {firstname} {lastname}
      </p>
      <h2 className="text-lg my-auto font-semibold text-blue-600 text-center mb">{jobTitle}</h2>
      <p className="text-xs my-auto font-normal text-black text-center">{intro}</p>
      <p className=" text-lg my-auto text-blue-500 text-center underline"></p>
      <div className="grid grid-cols-2 grid-rows-1 text-center mx-auto mb-10 w-40 justify-items-center">
        <Mail className="text-gray-300 hover:text-black transition" />
        <UserRound className="text-gray-300  hover:text-black transition" />
      </div>
    </div>
  )
}
