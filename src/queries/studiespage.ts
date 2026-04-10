import type { ResearchPageDTO } from '@/validation/research'

export const getAllResearch = async (): Promise<ResearchPageDTO[]> => {
  const res = await fetch('/api/research?depth=1&sort=order')

  if (!res.ok) {
    throw new Error('Failed to fetch research')
  }

  const data = await res.json()

  return data.docs
}
