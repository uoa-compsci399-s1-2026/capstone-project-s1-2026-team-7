import React from 'react'
import { getStudiesPage } from '@/features/studies/studiespage.query'
import { StudiesPageDTO } from '@/features/studies'
import StudyCard from './StudyCard'
import StudyList from './StudyList'

async function Page() {
  const things: StudiesPageDTO = await getStudiesPage('en')

  return <StudyList studypage={things}></StudyList>
}

export default Page
