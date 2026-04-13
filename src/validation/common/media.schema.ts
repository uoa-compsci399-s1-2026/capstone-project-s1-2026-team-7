import { z } from 'zod'

export const mediaSchema = z.object({
  url: z.string(),
  alt: z.string(),
})

export type MediaDTO = z.infer<typeof mediaSchema>
