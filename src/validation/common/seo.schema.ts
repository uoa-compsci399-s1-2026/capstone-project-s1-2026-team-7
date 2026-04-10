import { z } from 'zod'

export const SeoSchema = z.object({
  metaTitle: z.string().optional().nullable(),
  metaDescription: z.string().optional().nullable(),
})

export type SeoDTO = z.infer<typeof SeoSchema>
