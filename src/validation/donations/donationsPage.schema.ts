import { z } from 'zod'
import { mediaSchema } from '../our-team'

export const DonationsPageDTOSchema = z.object({
  title: z.string().default(''),
  heroImage: mediaSchema.required(),
  industries: z.array(mediaSchema).default([]),
})

export type DonationsPageDTO = z.infer<typeof DonationsPageDTOSchema>
