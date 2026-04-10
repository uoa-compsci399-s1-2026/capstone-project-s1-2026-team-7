import type { PaginatedDocs } from 'payload'
import type { ResearchDTO } from '../validation/research'

export const getAllResearch = async (): Promise<PaginatedDocs<ResearchDTO>> => {
  const res = await fetch('http://localhost:3000/api/research?depth=1&sort=order')

  if (!res.ok) {
    const text = await res.text() // 👈 get real error body
    console.error('Fetch failed:', res.status, text)
    throw new Error(`Failed to fetch research: ${res.status}`)
  }

  return res.json()
}
