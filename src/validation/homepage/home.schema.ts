import { z } from 'zod'
import { mediaSchema, DEFAULT_GENERAL_PIC } from '../common/media.schema'
import { seoSchema } from '../common/seo.schema'

const stringWithDefault = z
  .string()
  .nullish()
  .transform((value) => value ?? '')

const optionalBlockId = z
  .string()
  .nullish()
  .transform((value) => value ?? '')

const mediaWithDefault = mediaSchema.nullish().transform((value) => value ?? DEFAULT_GENERAL_PIC)

const blockBaseSchema = z.object({
  id: optionalBlockId,
  blockName: z.string().nullish().optional(),
})

const buttonSchema = z.object({
  id: z
    .string()
    .nullish()
    .transform((value) => value ?? ''),
  label: stringWithDefault,
  url: stringWithDefault,
  variant: z.enum(['primary', 'secondary']).default('primary'),
})

const heroBlockSchema = blockBaseSchema
  .extend({
    blockType: z.literal('hero'),

    title: stringWithDefault,
    description: stringWithDefault,

    portraitHeroImage: mediaWithDefault,
    mobileHeroImage: mediaWithDefault,

    buttons: z
      .array(buttonSchema)
      .nullish()
      .transform((value) => value ?? []),
  })
  .transform((block) => ({
    id: block.id,
    blockType: block.blockType,

    title: block.title,
    description: block.description,

    heroHorizontal: block.portraitHeroImage,
    heroMobile: block.mobileHeroImage,

    buttons: block.buttons,
  }))

const researchItemSchema = z
  .object({
    id: z.number(),
    title: stringWithDefault,
    researchLink: stringWithDefault,
    doi: stringWithDefault,
    date: stringWithDefault,
    order: z
      .number()
      .nullish()
      .transform((value) => value ?? 0),
    updatedAt: z.string().optional(),
    createdAt: z.string().optional(),
  })
  .passthrough()

const researchRelationshipSchema = z.union([z.number(), researchItemSchema])

const researchBlockSchema = blockBaseSchema
  .extend({
    blockType: z.literal('research'),

    title: stringWithDefault,

    researchDisplay: z
      .array(researchRelationshipSchema)
      .nullish()
      .transform((value) => value ?? []),
  })
  .transform((block) => ({
    id: block.id,
    blockType: block.blockType,

    title: block.title,
    researchList: block.researchDisplay,
  }))

const partnerLogoSchema = z.object({
  id: z.string().nullish().optional(),
  logo: mediaWithDefault,
  alt: stringWithDefault,
})

export const partnersBlockSchema = blockBaseSchema
  .extend({
    blockType: z.literal('partners'),

    partners: z
      .array(partnerLogoSchema)
      .nullish()
      .transform((value) => value ?? []),
  })
  .transform((block) => ({
    id: block.id,
    blockType: block.blockType,

    partners: block.partners,
  }))

const cardBlockSchema = blockBaseSchema.extend({
  blockType: z.literal('card'),
})

const infoBlockSchema = blockBaseSchema.extend({
  blockType: z.literal('info'),
})

const statsBlockSchema = blockBaseSchema.extend({
  blockType: z.literal('stats'),
})

const timelineBlockSchema = blockBaseSchema.extend({
  blockType: z.literal('timeline'),
})

export const homepageBlockSchema = z.discriminatedUnion('blockType', [
  heroBlockSchema,
  researchBlockSchema,
  partnersBlockSchema,
  cardBlockSchema,
  infoBlockSchema,
  statsBlockSchema,
  timelineBlockSchema,
])

export const homepageSchema = z.object({
  id: z.number(),

  layout: z
    .array(homepageBlockSchema)
    .nullish()
    .transform((value) => value ?? []),

  seo: seoSchema,
})

export type HomepageDTO = z.infer<typeof homepageSchema>
export type HomepageBlockDTO = z.infer<typeof homepageBlockSchema>

export type HeroBlockDTO = Extract<HomepageBlockDTO, { blockType: 'hero' }>
export type ResearchBlockDTO = Extract<HomepageBlockDTO, { blockType: 'research' }>
export type PartnersBlockDTO = Extract<HomepageBlockDTO, { blockType: 'partners' }>
export type CardBlockDTO = Extract<HomepageBlockDTO, { blockType: 'card' }>
export type InfoBlockDTO = Extract<HomepageBlockDTO, { blockType: 'info' }>
export type StatsBlockDTO = Extract<HomepageBlockDTO, { blockType: 'stats' }>
export type TimelineBlockDTO = Extract<HomepageBlockDTO, { blockType: 'timeline' }>
