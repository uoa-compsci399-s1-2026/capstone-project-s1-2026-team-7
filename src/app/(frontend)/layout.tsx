import React from 'react'
import './global.css'
import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'HNU',
    template: '%s | Human Nutrition Unit',
  },
  description: 'Human Nutrition Unit research, studies, and public information.',
  icons: {
    icon: '/HNU%20logo%20HD.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
