import React from 'react'
import ProfileCard from './Profile'
import TeamButton from './TeamButton'
import { select } from 'payload/shared'
function page() {
  return (
    <div className=" bg-white text-5xl text-center text-[#0C0C48] font-medium mt-16">
      Meet The Team
      <div className="flex justify-center mt-4">
        {/* change the grid cols section depending?*/}
        <div className="grid grid-cols-2  grid-auto-rows max-w-sm w-full gap-4 ">
          <TeamButton
            button={{
              label: 'Board of Directors',
              selected: false,
            }}
          />
          <TeamButton
            button={{
              label: 'Research Team',
              selected: true,
            }}
          />
        </div>
      </div>
      <div className="flex justify-center mt-8">
        {/* change the grid cols section depending?*/}
        <div className="grid grid-cols-3 grid-auto-rows gap-8 max-w-5xl w-full">
          {/* replace following with for loop of array of staff profiles*/}
          <ProfileCard
            profile={{
              photo: '/Sally.png',
              fullName: 'John Doe',
              job: 'Software Engineer',
              uoaID: 'u1234567',
              email: 'john.doe@uoa.ac.nz',
              desc: "I'm a team member",
            }}
          />
          <ProfileCard
            profile={{
              photo: '/HongLeiu.png',
              fullName: 'John Doe',
              job: 'Software Engineer',
              uoaID: 'u1234567',
              email: 'john.doe@uoa.ac.nz',
              desc: "I'm a team member",
            }}
          />
          <ProfileCard
            profile={{
              photo: '/HongLeiu.png',
              fullName: 'John Doe',
              job: 'Software Engineer',
              uoaID: 'u1234567',
              email: 'john.doe@uoa.ac.nz',
              desc: "I'm a team member",
            }}
          />
          <ProfileCard
            profile={{
              photo: '/HongLeiu.png',
              fullName: 'John Doe',
              job: 'Software Engineer',
              uoaID: 'u1234567',
              email: 'john.doe@uoa.ac.nz',
              desc: "I'm a team member",
            }}
          />
          <ProfileCard
            profile={{
              photo: '/HongLeiu.png',
              fullName: 'John Doe',
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

export default page
