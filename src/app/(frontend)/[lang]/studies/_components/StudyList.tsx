import React from 'react'
import { StudiesPageDTO } from '@/features/studies'
import StudyCard from './StudyCard'
import Banner from '../../_components/Banner'
import getLocalizedHref from '@/lib/localizedHref'
import type { Lang } from '@/types/lang'
import CtaBanner from '../../_components/CtaBanner'

export type StudyListProps = {
  studypage: StudiesPageDTO
  lang: Lang
}
export default function StudyList({ studypage, lang }: StudyListProps) {
  const listingPage = studypage.listingPage
  const bannerUrl = listingPage.banner?.url ?? ''
  const bannerAlt = listingPage.banner?.alt ?? listingPage.title
  const studies = studypage.listingPage.studiesDisplay
  const hasStudies = studies.length > 0

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
          {hasStudies ? (
            studies.map((study, index) => <StudyCard key={index} study={study} />)
          ) : (
            <div className="rounded-2xl border border-dashed border-[#0C0C48]/20 bg-white px-6 py-12 text-center">
              <p className="text-base text-[#0C0C48]/70 md:text-lg">No studies currently</p>
            </div>
          )}
          <CtaBanner
            title="Need Help?"
            description="Get in touch and we'll help you find the right study or answer any questions."
            buttonLabel="Contact us"
            href={getLocalizedHref('/contact', lang)}
          />
        </div>
      </div>
    </div>
  )
}
