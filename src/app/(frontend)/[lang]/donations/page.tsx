import React from 'react'
import { getDonationsPage } from '@/queries/donationspage'
import {
  DonationsPageDTO,
  DonationsPageDTOSchema,
} from '@/validation/donations/donationsPage.schema'
import DonationsHero from './_components/DonationsHero'
import SupportSection from './_components/SupportSection'
import StatsSection from './_components/StatsSection'
import { PartnersSection } from './_components/PartnersSection'
import { PartnersBlockDTO } from '@/validation'
import DonationLink from './_components/DonationLink'

export default async function Donations() {
  {
    /* Import from backend*/
  }

  const pageData: DonationsPageDTO = await getDonationsPage('en')

  const partnersBlockData: PartnersBlockDTO = {
    id: 'partners-1',
    blockType: 'partners',

    partners: [
      {
        id: 'partner-1',

        logo: {
          url: '/logos/university-auckland.png',
          alt: 'University of Auckland logo',
        },

        alt: 'University of Auckland logo',
      },

      {
        id: 'partner-2',

        logo: {
          url: '/logos/health-nz.png',
          alt: 'Health NZ logo',
        },

        alt: 'Health NZ logo',
      },

      {
        id: 'partner-3',

        logo: {
          url: '/logos/who.png',
          alt: 'World Health Organization logo',
        },

        alt: 'World Health Organization logo',
      },

      {
        id: 'partner-4',

        logo: {
          url: '/logos/diabetes-foundation.png',
          alt: 'Diabetes Research Foundation logo',
        },

        alt: 'Diabetes Research Foundation logo',
      },
    ],
  }
  return (
    <div>
      <DonationsHero
        title={pageData.hero.title}
        blurb={pageData.hero.blurb}
        donobutton={pageData.hero.buttonLabel}
        imageUrl={pageData.hero.image.url}
        imageAlt={pageData.hero.image.alt}
        buttonurl={pageData.donationLink.button.url}
      ></DonationsHero>
      <SupportSection heading={pageData.supportSection.heading}></SupportSection>
      <StatsSection
        title={pageData.stats.title}
        description={pageData.stats.description}
        stats={pageData.stats.stats}
      ></StatsSection>
      <PartnersSection data={partnersBlockData}></PartnersSection>
      <DonationLink
        title={pageData.donationLink.title}
        description={pageData.donationLink.description}
        backgroundImage={pageData.donationLink.backgroundImage}
        button={pageData.donationLink.button}
      ></DonationLink>
    </div>
  )
}
