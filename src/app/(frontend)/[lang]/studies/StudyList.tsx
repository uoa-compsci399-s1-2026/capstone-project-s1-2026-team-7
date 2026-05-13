import React from 'react'
import { StudiesPageDTO } from '@/features/studies'
import StudyCard from './StudyCard'
import Banner from '../_components/Banner'

export type StudyListProps = {
  studypage: StudiesPageDTO
}
export default function StudyList({ studypage }: StudyListProps) {
  return (
    <div>
      <Banner
        title={studypage.title}
        imageUrl={studypage.banner.url}
        imageAlt={studypage.banner.alt}
      ></Banner>
      <div
        className="flex justify-center
      xl:mt-25
      md:mt-20
      m-15"
      >
        <div className="grid grid-cols-1 max-w-5xl w-full xl:gap-6 md:gap-5 gap-4">
          {studypage.studiesDisplay.map((study, index) => (
            <StudyCard key={index} study={study} />
          ))}
        </div>
      </div>
    </div>
  )
}
