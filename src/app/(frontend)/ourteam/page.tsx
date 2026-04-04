import React from 'react'
import ProfileCard from './Profile'
function page() {
  return (
    <div>
      Meet The Team
      <ProfileCard
        profile={{
          photo: '/Sally.png',
          fullName: 'John Doe',
          job: 'Software Engineer',
          uoaID: 'u1234567',
          email: 'john.doe@uoa.ac.nz',
          desc: 'SALLY is a software engineer with a passion for creating innovative solutions. With a background in computer science, SALLY has experience in developing web applications and mobile apps. SALLY is dedicated to delivering high-quality work and is always eager to learn new technologies.',
        }}
      />
    </div>
  )
}

export default page
