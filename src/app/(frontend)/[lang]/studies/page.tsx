import React from 'react'
import { getStudiesPage } from '@/features/studies/studiespage.query'
import { StudiesPageDTO } from '@/features/studies'
import StudyList from './_components/StudyList'
import type { PageProps } from '@/types/pageprops'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params
  const studiesPage = await getStudiesPage(lang)
  const title = studiesPage.meta?.title || studiesPage.listingPage.title
  const description =
    studiesPage.meta?.description || 'Explore current studies from the Human Nutrition Unit.'
  const imageUrl = studiesPage.meta?.image?.url || studiesPage.listingPage.banner?.url
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  }
}

export default async function Page({ params }: PageProps) {
  const { lang } = await params
  const things: StudiesPageDTO = await getStudiesPage(lang)
  return <StudyList studypage={things}></StudyList>
}
