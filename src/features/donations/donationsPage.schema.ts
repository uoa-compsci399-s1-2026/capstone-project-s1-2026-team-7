import { z } from 'zod'
import { mediaSchema } from '../our-team'
import { seoMetaSchema } from '../common'

export const statSchema = z.object({
  key: z.string(),
  value: z.number(),
  label: z.string(),
})

export const supportItemSchema = z.object({
  icon: z.string(),
  title: z.string(),
  description: z.string(),
})

export const DonationsPageDTOSchema = z.object({
  hero: z.object({
    title: z.string(),
    blurb: z.string(),
    buttonLabel: z.string(),
    donateUrl: z.string(),
    image: mediaSchema,
    backgroundImage: mediaSchema.nullish(),
  }),

  supportSection: z.object({
    heading: z.string(),
    items: z.array(supportItemSchema).default([]),
  }),

  stats: z.object({
    title: z.string(),
    description: z.string(),
    stats: z.array(statSchema),
  }),
  meta: seoMetaSchema,
})

export type DonationsPageDTO = z.infer<typeof DonationsPageDTOSchema>
