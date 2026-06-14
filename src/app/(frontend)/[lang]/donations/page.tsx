import React from 'react'
import { getDonationsPage } from '@/features/donations/donationpage.query'
import { DonationsPageDTO } from '@/features/donations/donationsPage.schema'
import { getHomePage } from '@/features/homepage/homepage.query'
import DonationsHero from './_components/DonationsHero'
import SupportSection from './_components/SupportSection'
import StatsSection from './_components/StatsSection'
import { PartnersSection } from '../_components/homepage/PartnersSection'
import DonationSection from '../_components/homepage/DonationSection'

export default async function Donations() {
  const [pageData, homeData]: [DonationsPageDTO, Awaited<ReturnType<typeof getHomePage>>] =
    await Promise.all([getDonationsPage('en'), getHomePage('en')])

  const partnersBlock = homeData.layout.find((b) => b.blockType === 'partners')

  return (
    <div>
      <DonationsHero
        title={pageData.hero.title}
        blurb={pageData.hero.blurb}
        donobutton={pageData.hero.buttonLabel}
        imageUrl={pageData.hero.image.url}
        imageAlt={pageData.hero.image.alt}
        buttonurl={pageData.hero.donateUrl}
      ></DonationsHero>
      <SupportSection heading={pageData.supportSection.heading}></SupportSection>
      <StatsSection
        title={pageData.stats.title}
        description={pageData.stats.description}
        stats={pageData.stats.stats}
      ></StatsSection>
      {partnersBlock && <PartnersSection data={partnersBlock} />}

      <DonationSection />
    </div>
  )
}
