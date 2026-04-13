import { z } from 'zod'

const imageUrlSchema = z.string().refine(
  (value) => {
    if (value.startsWith('/')) return true
    return z.string().url().safeParse(value).success
  },
  { message: 'Invalid image URL' },
)

export const imageSchema = z.object({
  id: z.string().or(z.number()),
  url: imageUrlSchema,
  alt: z.string(),
})
