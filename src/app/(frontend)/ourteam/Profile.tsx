import React from 'react'

export interface Profile {
  photo: string
  fullName: string
  job: string
  uoaID: string
  email: string
  desc: string
}
export type ProfileProps = {
  profile: Profile
}

export default function ProfileCard({ profile }: ProfileProps) {
  const { photo, fullName, job, email, desc } = profile
  return (
    <div className="w-full h-120 bg-white">
      <img className="scale-80 mx-auto my-6 rounded-full" src={photo} />
      <p className="text-2xl text-black font-bold text-center mb-2">{fullName}</p>
      <h2 className="text-xl text-blue-600 text-center mb-4">{job}</h2>
      <p className="text-xs font-normal text-black">{desc}</p>
      <p className=" text-lg text-blue-500 text-center underline">{email}</p>
    </div>
  )
}
