import { z } from 'zod'
import { mediaSchema } from '../common/media.schema'
import { DEFAULT_GENERAL_PIC } from '../common/media.schema'
import { seoSchema } from '../common/seo.schema'

const buttonSchema = z.object({
  id: z.string(),
  label: z.string().default(''),
  url: z.string().default(''),
  variant: z.enum(['primary', 'secondary']),
})

const heroSchema = z.object({
  title: z.string().default(''),
  description: z.string().default(''),
  illustration: mediaSchema.default(DEFAULT_GENERAL_PIC),
  buttons: z.array(buttonSchema).default([]),
})

const aboutSectionSchema = z.object({
  eyebrow: z.string().default(''),
  heading: z.string().default(''),
  body: z.string().default(''),
  image: mediaSchema.default(DEFAULT_GENERAL_PIC),
})

export const homepageSchema = z.object({
  //id: z.number(),
  hero: heroSchema,
  aboutSection: aboutSectionSchema,
  seo: seoSchema,
})

export type HomepageDTO = z.infer<typeof homepageSchema>
export type HeroDTO = z.infer<typeof heroSchema>
