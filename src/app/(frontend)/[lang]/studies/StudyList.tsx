import React from 'react'
import { StudiesPageDTO } from '@/validation/studies'
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
        <div
          className="grid justify-center justify-items-center grid-cols-1 grid-auto-rows max-w-5xl max-hxl w-full h-full
        xl:gap-12.5
        md:gap-7.5
        gap-7.5"
        >
          {studypage.studiesDisplay.map((study, index) => (
            <StudyCard key={index} study={study} />
          ))}
        </div>
      </div>
    </div>
  )
}
