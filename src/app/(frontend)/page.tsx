import React from 'react'
import { getHomePage } from '@/queries/homepage'
import type { HomePage as HomePageData, Media } from '@/payload-types'
import HeroSection from './HeroSection'
import { homepageDTO } from '@/dto/homepagedto'
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
  const data: homepageDTO = await getHomePage('en')
  console.log('homepage data:', data)
  return (
    <main>
      <HeroSection prop={data.hero} />
    </main>
  )
}
