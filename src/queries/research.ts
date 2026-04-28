import type { PaginatedDocs } from 'payload'
import type { ResearchDTO } from '@/validation'

export const getAllResearch = async (): Promise<PaginatedDocs<ResearchDTO>> => {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

  const res = await fetch(`${baseUrl}/api/research?depth=1&sort=order`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    const text = await res.text()
    console.error('Fetch failed:', res.status, text)
    throw new Error(`Failed to fetch research: ${res.status}`)
  }

  return res.json()
}
