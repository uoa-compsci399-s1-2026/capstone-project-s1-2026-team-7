import { z } from 'zod'
import { mediaSchema, DEFAULT_GENERAL_PIC } from '../common/media.schema'
import { seoSchema } from '../common/seo.schema'

const stringWithDefault = z
  .string()
  .nullish()
  .transform((value) => value ?? '')

const mediaWithDefault = mediaSchema.nullish().transform((value) => value ?? DEFAULT_GENERAL_PIC)

const buttonSchema = z.object({
  id: z.string(),
  label: stringWithDefault,
  url: stringWithDefault,
  variant: z.enum(['primary', 'secondary']).default('primary'),
})

const heroPayloadSchema = z
  .object({
    title: stringWithDefault,
    description: stringWithDefault,

    'portrait hero image': mediaWithDefault,
    'mobile hero image': mediaWithDefault,

    buttons: z
      .array(buttonSchema)
      .nullish()
      .transform((value) => value ?? []),
  })
  .transform((hero) => ({
    title: hero.title,
    description: hero.description,
    heroHorizontal: hero['portrait hero image'],
    heroMobile: hero['mobile hero image'],
    buttons: hero.buttons,
  }))

const studyDisplaySchema = z.object({
  id: z.number(),
  title: stringWithDefault,
  description: z.unknown().optional(),
  sortOrder: z.number().nullish().optional(),
  updatedAt: z.string().optional(),
  createdAt: z.string().optional(),
})

const studiesSectionPayloadSchema = z
  .object({
    title: stringWithDefault,
    studiesDisplay: z
      .array(studyDisplaySchema)
      .nullish()
      .transform((value) => value ?? []),
  })
  .transform((section) => ({
    title: section.title,
    researchList: section.studiesDisplay,
  }))

const aboutSectionPayloadSchema = z
  .object({
    eyebrow: stringWithDefault,
    heading: stringWithDefault,
    body: stringWithDefault,

    'portrait image': mediaWithDefault,
    'mobile image': mediaWithDefault,
  })
  .transform((section) => ({
    eyebrow: section.eyebrow,
    heading: section.heading,
    body: section.body,
    image: section['portrait image'],
    mobileImage: section['mobile image'],
  }))

const partnerLogoSchema = z.object({
  id: z.string().optional(),
  logo: mediaWithDefault,
  alt: stringWithDefault,
})

export const partnersSectionPayloadSchema = z
  .object({
    partners: z
      .array(partnerLogoSchema)
      .nullish()
      .transform((value) => value ?? []),
  })
  .transform((section) => ({
    partners: section.partners,
  }))

export const homepageSchema = z.object({
  id: z.number(),
  hero: heroPayloadSchema,
  studiesSection: studiesSectionPayloadSchema,
  aboutSection: aboutSectionPayloadSchema,
  partnersSection: partnersSectionPayloadSchema,
  seo: seoSchema,
})

export type HomepageDTO = z.infer<typeof homepageSchema>
export type HeroDTO = HomepageDTO['hero']
export type AboutSectionDTO = HomepageDTO['aboutSection']
export type StudiesSectionDTO = HomepageDTO['studiesSection']
export type PartnersSectionDTO = HomepageDTO['partnersSection']
