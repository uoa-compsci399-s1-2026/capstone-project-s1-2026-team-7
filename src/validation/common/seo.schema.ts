import { z } from 'zod'

export const seoSchema = z.object({
  metaTitle: z
    .string()
    .nullish()
    .transform((v) => v ?? ''),
  metaDescription: z
    .string()
    .nullish()
    .transform((v) => v ?? ''),
})

export type SeoDTO = z.infer<typeof seoSchema>
