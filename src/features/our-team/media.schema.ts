import { z } from 'zod'

export const mediaSchema = z.object({
  url: z.string().optional(),
  alt: z.string().optional(),
})
