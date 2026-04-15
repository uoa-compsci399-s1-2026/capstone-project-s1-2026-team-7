import { z } from 'zod'
import { mediaSchema } from '../common/media.schema'

const buttonSchema = z.object({
  label: z.string(),
  url: z.string(),
  variant: z.enum(['primary', 'secondary']),
  id: z.string(),
})

const heroSchema = z.object({
  title: z.string(),
  description: z.string(),
  illustration: mediaSchema,
  buttons: z.array(buttonSchema).min(2),
})

const aboutSectionSchema = z.object({
  eyebrow: z.string(),
  heading: z.string(),
  body: z.string(),
  image: mediaSchema,
})

const seoSchema = z.object({
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
})

export const homepageSchema = z.object({
  id: z.number(),
  hero: heroSchema,
  aboutSection: aboutSectionSchema,
  seo: seoSchema,
})

export type HomepageDTO = z.infer<typeof homepageSchema>
export type HeroDTO = z.infer<typeof heroSchema>
