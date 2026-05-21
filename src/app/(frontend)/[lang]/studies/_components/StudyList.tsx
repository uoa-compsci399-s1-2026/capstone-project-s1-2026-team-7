import React from 'react'
import { StudiesPageDTO } from '@/features/studies'
import StudyCard from './StudyCard'
import Banner from '../../_components/Banner'

export type StudyListProps = {
  studypage: StudiesPageDTO
}
export default function StudyList({ studypage }: StudyListProps) {
  const listingPage = studypage.listingPage
  const bannerUrl = listingPage.banner?.url ?? ''
  const bannerAlt = listingPage.banner?.alt ?? listingPage.title

  return (
    <div>
      <Banner
        title={studypage.listingPage.title}
        imageUrl={bannerUrl || ''}
        imageAlt={bannerAlt || ''}
      ></Banner>
      <div
        className="flex justify-center
      xl:mt-25
      md:mt-20
      m-15"
      >
        <div className="grid grid-cols-1 max-w-5xl w-full xl:gap-6 md:gap-5 gap-4">
          {studypage.listingPage.studiesDisplay.map((study, index) => (
            <StudyCard key={index} study={study} />
          ))}
        </div>
      </div>
    </div>
  )
}
