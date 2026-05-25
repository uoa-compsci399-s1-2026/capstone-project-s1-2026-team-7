import { z } from 'zod'
import { mediaSchema } from '../our-team'

export const statSchema = z.object({
  key: z.string(),
  value: z.number(),
  label: z.string(),
})

export const DonationsPageDTOSchema = z.object({
  hero: z.object({
    title: z.string(),
    blurb: z.string(),
    buttonLabel: z.string(),
    donateUrl: z.string(),
    image: mediaSchema,
  }),

  supportSection: z.object({
    heading: z.string(),
  }),

  stats: z.object({
    title: z.string(),
    description: z.string(),
    stats: z.array(statSchema),
  }),
})

export type DonationsPageDTO = z.infer<typeof DonationsPageDTOSchema>
