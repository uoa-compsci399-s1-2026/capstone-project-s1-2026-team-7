import { z } from 'zod'
import { mediaSchema, DEFAULT_GENERAL_PIC } from '../common/media.schema'
import { studySchema } from '../studies'
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
    featuredImage: mediaWithDefault,

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
    featuredImage: block.featuredImage,

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
const currentStudiesLinkSchema = z
  .object({
    title: stringWithDefault,
    href: stringWithDefault,
  })
  .default({
    title: 'View all studies',
    href: '/studies',
  })

const studyRelationshipSchema = z.union([z.number(), studySchema])

const currentStudiesBlockSchema = blockBaseSchema
  .extend({
    blockType: z.literal('current-studies'),

    title: stringWithDefault,

    link: currentStudiesLinkSchema,

    studies: z
      .array(studyRelationshipSchema)
      .nullish()
      .transform((value) => value ?? []),
  })
  .transform((block) => ({
    id: block.id,
    blockType: block.blockType,

    title: block.title,
    link: block.link,

    studies: block.studies.filter(
      (study): study is z.infer<typeof studySchema> => typeof study !== 'number',
    ),
  }))

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

const timelineItemSchema = z.object({
  id: z
    .string()
    .nullish()
    .transform((value) => value ?? ''),
  year: stringWithDefault,
  description: stringWithDefault,
})

const timelineBlockSchema = blockBaseSchema
  .extend({
    blockType: z.literal('timeline'),

    eyebrow: stringWithDefault,
    title: stringWithDefault,
    description: stringWithDefault,

    items: z
      .array(timelineItemSchema)
      .nullish()
      .transform((value) => value ?? []),
  })
  .transform((block) => ({
    id: block.id,
    blockType: block.blockType,

    eyebrow: block.eyebrow,
    title: block.title,
    description: block.description,

    items: block.items,
  }))

const whoWeAreBlockSchema = blockBaseSchema
  .extend({
    blockType: z.literal('who-we-are'),

    title: stringWithDefault,
    description: stringWithDefault,
    image: mediaWithDefault,
  })
  .transform((block) => ({
    id: block.id,
    blockType: block.blockType,

    title: block.title,
    description: block.description,
    image: block.image,
  }))

const whatWeDoItemSchema = z.object({
  id: z
    .string()
    .nullish()
    .transform((value) => value ?? ''),
  text: stringWithDefault,
})

const whatWeDoSectionSchema = z.object({
  id: z
    .string()
    .nullish()
    .transform((value) => value ?? ''),
  heading: stringWithDefault,
  items: z
    .array(whatWeDoItemSchema)
    .nullish()
    .transform((value) => value ?? []),
})

const whatWeDoBlockSchema = blockBaseSchema
  .extend({
    blockType: z.literal('what-we-do'),

    title: stringWithDefault,

    sections: z
      .array(whatWeDoSectionSchema)
      .nullish()
      .transform((value) => value ?? []),

    image: mediaWithDefault,
  })
  .transform((block) => ({
    id: block.id,
    blockType: block.blockType,

    title: block.title,
    sections: block.sections,
    image: block.image,
  }))

const donationSectionBlockSchema = blockBaseSchema.extend({
  blockType: z.literal('donation-section'),
})

const videoItemSchema = z.object({
  id: z
    .string()
    .nullish()
    .transform((value) => value ?? ''),
  url: stringWithDefault,
  title: stringWithDefault,
  caption: stringWithDefault,
})

const videoBlockSchema = blockBaseSchema
  .extend({
    blockType: z.literal('video'),

    title: stringWithDefault,
    description: stringWithDefault,

    videos: z
      .array(videoItemSchema)
      .nullish()
      .transform((value) => value ?? []),
  })
  .transform((block) => ({
    id: block.id,
    blockType: block.blockType,

    title: block.title,
    description: block.description,

    videos: block.videos,
  }))

export const homepageBlockSchema = z.discriminatedUnion('blockType', [
  heroBlockSchema,
  researchBlockSchema,
  partnersBlockSchema,
  cardBlockSchema,
  infoBlockSchema,
  statsBlockSchema,
  timelineBlockSchema,
  whoWeAreBlockSchema,
  whatWeDoBlockSchema,
  donationSectionBlockSchema,
  currentStudiesBlockSchema,
  videoBlockSchema,
])

export const homepageSchema = z.object({
  id: z.number(),

  layout: z
    .array(homepageBlockSchema)
    .nullish()
    .transform((value) => value ?? []),

  seo: seoMetaSchema,
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
export type WhoWeAreBlockDTO = Extract<HomepageBlockDTO, { blockType: 'who-we-are' }>
export type WhatWeDoBlockDTO = Extract<HomepageBlockDTO, { blockType: 'what-we-do' }>
export type DonationSectionBlockDTO = Extract<HomepageBlockDTO, { blockType: 'donation-section' }>
export type CurrentStudiesBlockDTO = Extract<HomepageBlockDTO, { blockType: 'current-studies' }>
export type VideoBlockDTO = Extract<HomepageBlockDTO, { blockType: 'video' }>
