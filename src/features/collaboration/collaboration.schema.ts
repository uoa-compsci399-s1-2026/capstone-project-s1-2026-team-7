import { z } from 'zod'
import { mediaSchema, DEFAULT_GENERAL_PIC } from '../common/media.schema'
import { seoMetaSchema } from '../common'

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

// --- Block Schemas ---

// 1. Collaboration Hero Block
const collaborationHeroBlockSchema = blockBaseSchema
  .extend({
    blockType: z.literal('collaborationHero'),
    title: stringWithDefault,
    description: stringWithDefault,
    image: mediaWithDefault,
    backgroundImage: mediaSchema.nullish().transform((value) => value ?? null),
  })
  .transform((block) => ({
    id: block.id,
    blockType: block.blockType,
    title: block.title,
    description: block.description,
    image: block.image,
    backgroundImage: block.backgroundImage,
  }))

// 2. Partner Logos Block
const partnerLogoItemSchema = z.object({
  id: z.string().nullish().optional(),
  logo: mediaWithDefault,
})

const partnerLogosBlockSchema = blockBaseSchema
  .extend({
    blockType: z.literal('partnerLogos'),
    logos: z
      .array(partnerLogoItemSchema)
      .nullish()
      .transform((value) => value ?? []),
  })
  .transform((block) => ({
    id: block.id,
    blockType: block.blockType,
    logos: block.logos,
  }))

// 3. Collaboration Areas Block
const collaborationAreaItemSchema = z.object({
  id: z.string().nullish().optional(),
  title: stringWithDefault,
  description: stringWithDefault,
})

const collaborationAreasBlockSchema = blockBaseSchema
  .extend({
    blockType: z.literal('collaborationAreas'),
    items: z
      .array(collaborationAreaItemSchema)
      .nullish()
      .transform((value) => value ?? []),
  })
  .transform((block) => ({
    id: block.id,
    blockType: block.blockType,
    items: block.items,
  }))

// 4. Collaborative Approach Block
const collaborativeApproachItemSchema = z.object({
  id: z.string().nullish().optional(),
  title: stringWithDefault,
  description: stringWithDefault,
})

const collaborativeApproachBlockSchema = blockBaseSchema
  .extend({
    blockType: z.literal('collaborativeApproach'),
    items: z
      .array(collaborativeApproachItemSchema)
      .nullish()
      .transform((value) => value ?? []),
  })
  .transform((block) => ({
    id: block.id,
    blockType: block.blockType,
    items: block.items,
  }))

// 5. Research Enquiries Block
const researchEnquiriesBlockSchema = blockBaseSchema
  .extend({
    blockType: z.literal('researchEnquiries'),
    heading: stringWithDefault,
    description: stringWithDefault,
    buttonLabel: stringWithDefault,
    buttonUrl: stringWithDefault,
  })
  .transform((block) => ({
    id: block.id,
    blockType: block.blockType,
    heading: block.heading,
    description: block.description,
    buttonLabel: block.buttonLabel,
    buttonUrl: block.buttonUrl,
  }))

const statsSectionItemSchema = z.object({
  id: z.string().nullish().optional(),
  value: z.number(),
  label: z.string(),
  icon: z.string(),
})

const statsSectionBlockSchema = blockBaseSchema
  .extend({
    blockType: z.literal('statsSection'),
    title: stringWithDefault,
    stats: z
      .array(statsSectionItemSchema)
      .nullish()
      .transform((v) => v ?? []),
  })
  .transform((block) => ({
    id: block.id,
    blockType: block.blockType,
    title: block.title,
    stats: block.stats,
  }))

// --- Composite Layout & Page Schemas ---

export const collaborationsPageBlockSchema = z.discriminatedUnion('blockType', [
  collaborationHeroBlockSchema,
  partnerLogosBlockSchema,
  collaborationAreasBlockSchema,
  collaborativeApproachBlockSchema,
  researchEnquiriesBlockSchema,
  statsSectionBlockSchema,
])

export const collaborationsPageSchema = z.object({
  id: z.number(),
  layout: z
    .array(collaborationsPageBlockSchema)
    .nullish()
    .transform((value) => value ?? []),
  meta: seoMetaSchema,
})

// --- Type Definitions (DTOs) ---

export type CollaborationsPageDTO = z.infer<typeof collaborationsPageSchema>
export type CollaborationsPageBlockDTO = z.infer<typeof collaborationsPageBlockSchema>

export type CollaborationHeroBlockDTO = Extract<
  CollaborationsPageBlockDTO,
  { blockType: 'collaborationHero' }
>
export type PartnerLogosBlockDTO = Extract<
  CollaborationsPageBlockDTO,
  { blockType: 'partnerLogos' }
>
export type CollaborationAreasBlockDTO = Extract<
  CollaborationsPageBlockDTO,
  { blockType: 'collaborationAreas' }
>
export type CollaborativeApproachBlockDTO = Extract<
  CollaborationsPageBlockDTO,
  { blockType: 'collaborativeApproach' }
>
export type ResearchEnquiriesBlockDTO = Extract<
  CollaborationsPageBlockDTO,
  { blockType: 'researchEnquiries' }
>

export interface StatsSectionBlockDTO {
  blockType: 'statsSection'
  title: string
  stats: {
    value: number
    label: string
    icon: string
  }[]
}
