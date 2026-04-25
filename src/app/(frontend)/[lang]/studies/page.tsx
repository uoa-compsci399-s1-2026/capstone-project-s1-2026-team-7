import React from 'react'
import { getStudiesPage } from '@/queries/studiespage'
import { StudyDTO, StudiesPageDTO } from '@/validation/studies'
async function Page() {
  const things: StudiesPageDTO = await getStudiesPage('en')

  return (
    <div>
      <h2>{things.title}</h2>

      {things.studiesDisplay.map((study: StudyDTO) => {
        return (
          <div key={study.id}>
            <p>{study.title}</p>
          </div>
        )
      })}
    </div>
  )
}

export default Page
