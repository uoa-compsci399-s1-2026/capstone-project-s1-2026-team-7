import { z } from 'zod'
import { mediaSchema } from '../our-team'

export const statSchema = z.object({
  key: z.string(),
  value: z.number(),
  label: z.string(),
})

export const partnerSchema = z.object({
  id: z.string(),
  logo: mediaSchema,
  alt: z.string(),
})

export const donationLinkSchema = z.object({
  title: z.string(),
  description: z.string(),
  backgroundImage: mediaSchema,
  button: z.object({
    label: z.string(),
    url: z.string(),
  }),
})

export const DonationsPageDTOSchema = z.object({
  title: z.string(),

  hero: z.object({
    title: z.string(),
    blurb: z.string(),
    buttonLabel: z.string(),
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

  partners: z.array(partnerSchema),

  donationLink: donationLinkSchema,
})

export type DonationsPageDTO = z.infer<typeof DonationsPageDTOSchema>
