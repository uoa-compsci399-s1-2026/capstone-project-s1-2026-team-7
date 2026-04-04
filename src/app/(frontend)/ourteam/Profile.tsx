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
    <div className="w-[30%] mask-x-from-1 px-16 py-16">
      <img className="w-[95%] h-auto rounded-2xl" src={photo} />
      <h2 className="text-2xl font-semibold text-center mb-2">{fullName}</h2>
      <p className="text-gray-600 text-center mb-4">{job}</p>
      <p className="text-blue-500 text-center underline">{email}</p>
    </div>
  )
}
