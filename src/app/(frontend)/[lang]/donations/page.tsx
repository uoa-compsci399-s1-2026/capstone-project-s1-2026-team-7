import type { Metadata } from 'next'
import React from 'react'
import { getDonationsPage } from '@/features/donations/donationpage.query'
import { DonationsPageDTO } from '@/features/donations/donationsPage.schema'
import { getHomePage } from '@/features/homepage/homepage.query'
import DonationsHero from './_components/DonationsHero'
import SupportSection from './_components/SupportSection'
import StatsSection from './_components/StatsSection'
import { PartnersSection } from '../_components/homepage/PartnersSection'
import DonationSection from '../_components/homepage/DonationSection'
import { PageProps } from '@/types/pageprops'

function getImageUrl(image: unknown): string | undefined {
  if (!image || typeof image !== 'object') {
    return undefined
  }
  const url = (image as { url?: string | null }).url
  return url ?? undefined
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params
  const pageData: DonationsPageDTO = await getDonationsPage(lang)
  const title = pageData.meta?.title || pageData.hero.title || 'Donations'
  const description =
    pageData.meta?.description || pageData.hero.blurb || 'Support the Human Nutrition Unit.'
  const imageUrl = getImageUrl(pageData.meta?.image) || getImageUrl(pageData.hero.image)
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: imageUrl
        ? [
            {
              url: imageUrl,
              alt: title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: imageUrl ? 'summary_large_image' : 'summary',
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  }
}

export default async function Donations({ params }: PageProps) {
  const { lang } = await params
  const [pageData, homeData]: [DonationsPageDTO, Awaited<ReturnType<typeof getHomePage>>] =
    await Promise.all([getDonationsPage(lang), getHomePage(lang)])
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
        backgroundImageUrl={pageData.hero.backgroundImage?.url}
        backgroundImageAlt={pageData.hero.backgroundImage?.alt}
      />
      <SupportSection
        heading={pageData.supportSection.heading}
        items={pageData.supportSection.items}
      />
      <StatsSection
        title={pageData.stats.title}
        description={pageData.stats.description}
        stats={pageData.stats.stats}
      />
      {partnersBlock && <PartnersSection data={partnersBlock} />}
      <DonationSection />
    </div>
  )
}
