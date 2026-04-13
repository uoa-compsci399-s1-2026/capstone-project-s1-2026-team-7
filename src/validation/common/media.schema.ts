import { z } from 'zod'

export const mediaSchema = z.object({
  url: z.string(),
  alt: z.string(),
})

export type Media = z.infer<typeof mediaSchema>
