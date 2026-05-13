import React from 'react'
import { StaffDTO } from '@/features/our-team'
import { Mail, UserRound } from 'lucide-react'
import Image from 'next/image'
export type ProfileProps = {
  profile: StaffDTO
}

export default function ProfileCard({ profile }: ProfileProps) {
  const { firstname, lastname, jobTitle, intro, manager, uoaProfileLink, email, photo, sortOrder } =
    profile
  return (
    <div
      className="flex flex-col justify-items-center justify-center  bg-white  hover:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.25)] transition duration-300
    xl:w-74.25 xl:h-89.75 xl:rounded-[49px]
    md:w-50 md:h-61 md:rounded-[33.78px]
    w-43.5 h-52.5 rounded-[29px]"
    >
      <Image
        className=" object-cover  rounded-full mx-auto 
        w-21.5 h-21.5 mt-3.5 
        md:w-24.75 md:h-24.75 md:mt-4.25 
        xl:h-36.5 xl:w-36.5 xl:mt-6.25"
        src={photo.url}
        alt={photo.alt}
        width={200}
        height={200}
      />
      <p
        className=" text-black font-bold text-center
      xl:text-[22.67px]  xl:mt-3.5
      md:text-[15.41px] md:mt-2.5
      text-[13.31px] mt-2"
      >
        {firstname} {lastname}
      </p>
      <h2
        className="text-lg font-semibold text-[#1F2BD4] text-center 
      xl:text-[17px] 
      md:text-[11.56px] 
      text-[9.98px] mt-0.75"
      >
        {jobTitle}
      </h2>
      <p
        className="text-xs font-normal text-[#1E1E1E] text-center
      xl:text-[14px] mt-1
      md:text-[9.52px]
      text-[8.22px]"
      >
        {intro}
      </p>
      <p className=" text-lg text-blue-500 text-center underline"></p>
      <div
        className="grid grid-cols-2 grid-rows-1 text-center mx-auto justify-items-center mt-auto
              xl:gap-4 xl:w-20 xl:h-8.25 xl:mb-2.5
              md:gap-2.5 md:w-13.5 md:h-5.5 md:mb-2.5
              gap-1.75 w-11.75 h-4.75 mb-2.5"
      >
        <Mail
          className="text-gray-300 hover:text-black transition
        xl:w-8.25 xl:h-8.25
        md:w-5.5 md:h-5.5
        w-4.75 h-4.75"
        />
        <UserRound
          className="text-gray-300 hover:text-black transition
        xl:w-8.25 xl:h-8.25
        md:w-5.5 md:h-5.5
        w-4.75 h-4.75"
        />
      </div>
    </div>
  )
}
