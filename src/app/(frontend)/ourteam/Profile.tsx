import React from 'react'
import { StaffDTO } from '@/validation/our-team'
import { ImageDTO } from '@/validation/common'
import { Mail, UserRound } from 'lucide-react'
import Image from 'next/image'
export type ProfileProps = {
  profile: StaffDTO
}

export default function ProfileCard({ profile }: ProfileProps) {
  const { firstname, lastname, jobTitle, intro, manager, uoaProfileLink, email, photo, sortOrder } =
    profile
  return (
    <div className="flex flex-col items-center justify-center xl:w-74.25 md:w-50 w-43 h-89.75 bg-white rounded-[40px] hover:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.25)] transition duration-300">
      <Image
        className=" object-cover my-2 rounded-full mx-auto"
        src={photo.url}
        alt={photo.alt}
        width={200}
        height={200}
      />
      <p className="text-2xl text-black font-bold text-center">
        {firstname} {lastname}
      </p>
      <h2 className="text-lg font-semibold text-blue-600 text-center mb">{jobTitle}</h2>
      <p className="text-xs font-normal text-black text-center">{intro}</p>
      <p className=" text-lg text-blue-500 text-center underline"></p>
      <div className="grid grid-cols-2 grid-rows-1 text-center mx-auto mt-10 w-40 justify-items-center">
        <Mail className="text-gray-300 hover:text-black transition" />
        <UserRound className="text-gray-300  hover:text-black transition" />
      </div>
    </div>
  )
}
