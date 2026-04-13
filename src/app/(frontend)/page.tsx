import React from 'react'
import { getHomePage } from '@/queries/homepage'
import HeroSection from './HeroSection'
import { homepageDTO } from '@/dto/homepagedto'

export default async function HomePage() {
  const data: homepageDTO = await getHomePage('en')
  console.log('homepage data:', data)
  return (
    <main>
      <HeroSection prop={data.hero} />
    </main>
  )
}
