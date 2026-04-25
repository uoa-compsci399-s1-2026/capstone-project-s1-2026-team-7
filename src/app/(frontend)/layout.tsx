import React from 'react'
import './global.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Human Nutrition Unit',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
