import { z } from 'zod'

export const mediaSchema = z.object({
  url: z.string(),
  alt: z.string(),
})
