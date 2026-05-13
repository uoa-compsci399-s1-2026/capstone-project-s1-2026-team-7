// validation/common/image.schema.ts
import { z } from 'zod'

export const imageSchema = z.object({
  url: z.string().url(),
  alt: z.string().default('Profile Picture'),
})

export type ImageDTO = z.infer<typeof imageSchema>
