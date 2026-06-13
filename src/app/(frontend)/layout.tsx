import React from 'react'
import './global.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  description: '...',
  title: 'Human Nutrition Unit',
  icons: { icon: '/HNU%20logo%20HD.png' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
