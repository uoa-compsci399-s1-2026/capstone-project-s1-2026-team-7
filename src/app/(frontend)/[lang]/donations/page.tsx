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
import MakeDonationBlock from './_components/MakeDonationBlock'

export default async function Donations() {
  {
    /* Import from backend*/
  }

  //const pageData: DonationsPageDTO = await getDonationsPage('en')
  const pageData = {
    title: 'Hello',
    heroImage: { url: '/donopic.png', alt: 'donopic' },
  }
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
        title="Donations That Change The World"
        blurb="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas dictum imperdiet ornare. Cras elementum mauris nec leo consectetur scelerisque. Nulla dictum ipsum ut quam mollis, eget feugiat quam consectetur. Mauris ut lacinia arcu. Quisque a fringilla sapien. Cras vestibulum ex vitae tempus gravida. Cras vel eros quis massa eleifend elementum. Suspendisse lacinia velit massa, non finibus lorem dignissim quis. Nullam placerat diam nunc, vitae placerat justo ultrices quis. Sed sit amet dolor sed nunc commodo facilisis."
        donobutton="Make a donation"
      ></DonationsHero>
      <SupportSection heading={'What Your Support Enables'}></SupportSection>
      <StatsSection></StatsSection>
      <PartnersSection data={partnersBlockData}></PartnersSection>
      <MakeDonationBlock></MakeDonationBlock>
    </div>
  )
}
