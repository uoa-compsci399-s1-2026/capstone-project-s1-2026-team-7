import React from 'react'
import { getStudiesPage } from '@/features/studies/studiespage.query'
import { StudiesPageDTO } from '@/features/studies'
import StudyList from './_components/StudyList'
import { Lang } from '@/types/lang'

type PageProps = {
  params: Promise<{
    lang: Lang
  }>
}

async function Page({ params }: PageProps) {
  const { lang } = await params
  const things: StudiesPageDTO = await getStudiesPage(lang)

  return <StudyList studypage={things}></StudyList>
}

export default Page
