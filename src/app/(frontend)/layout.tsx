import React from 'react'
import Navbar from './Navbar'
import { getNavigationBar } from '@/queries/navigation'
import './global.css'
import { Metadata } from 'next'
export const metadata: Metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Human Nutrition Unit',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  const data = await getNavigationBar()

  return (
    <html lang="en">
      <body>
        <Navbar data={data} />
        <main>{children}</main>
      </body>
    </html>
  )
}
