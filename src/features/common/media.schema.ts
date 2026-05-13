import { z } from 'zod'

export const mediaSchema = z.object({
  url: z.string().default(''),
  alt: z.string().default(''),
})

export type MediaDTO = z.infer<typeof mediaSchema>

export const DEFAULT_GENERAL_PIC = {
  url: 'https://human-nutrition-unit-s3-bucket.s3.ap-southeast-2.amazonaws.com/Rectangle+32.png',
  alt: 'Default Picture',
}

export const DEFAULT_PROFILE_PIC = {
  url: 'https://human-nutrition-unit-s3-bucket.s3.ap-southeast-2.amazonaws.com/Rectangle+32.png',
  alt: 'The Profile Picture  ',
}
