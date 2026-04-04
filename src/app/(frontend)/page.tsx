import React from 'react'
import { getHomePage } from '@/queries/homepage'
import type { HomePage as HomePageData, Media } from '@/payload-types'
import HeroSection from './HeroSection'

export type HeroData = {
  title: string
  description: string
  illustration: number | Media
  buttons?:
    | {
        label: string
        url: string
        variant: 'primary' | 'secondary'
        id?: string | null
      }[]
    | null
}

export default async function HomePage() {
  const data: HomePageData = await getHomePage('en')
  const heroData: HeroData = data.hero
  console.log('HomePage data:', data)
  const heroImage =
    data?.hero?.illustration && typeof data.hero.illustration === 'object'
      ? (data.hero.illustration as Media)
      : null

  const aboutImage =
    data?.aboutSection?.image && typeof data.aboutSection.image === 'object'
      ? (data.aboutSection.image as Media)
      : null

  return (
    <main>
      <HeroSection prop={heroData} />

      <section>
        <h1>{data?.hero?.title}</h1>
        <p>{data?.hero?.description}</p>

        {heroImage?.url && <img src={heroImage.url} alt={heroImage.alt || 'Hero image'} />}

        {data?.hero?.buttons?.[0] && (
          <a href={data.hero.buttons[0].url}>{data.hero.buttons[0].label}</a>
        )}

        {data?.hero?.buttons?.[1] && (
          <a href={data.hero.buttons[1].url}>{data.hero.buttons[1].label}</a>
        )}
      </section>

      <section>
        <p>{data?.aboutSection?.eyebrow}</p>
        <h2>{data?.aboutSection?.heading}</h2>
        <p>{data?.aboutSection?.body}</p>

        {aboutImage?.url && <img src={aboutImage.url} alt={aboutImage.alt || 'About image'} />}
      </section>
    </main>
  )
}
