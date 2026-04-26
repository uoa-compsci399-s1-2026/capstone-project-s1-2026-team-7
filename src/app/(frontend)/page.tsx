import React from 'react'
import { getHomePage } from '@/queries/homepage'
import HeroSection from './HeroSection'
import { HomepageDTO } from '@/validation'

export default async function HomePage() {
  const data: HomepageDTO = await getHomePage('en')
  console.log('homepage data:', data)
  return (
    <main>
      <HeroSection prop={data.hero} />
    </main>
  )
}
