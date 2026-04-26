import { z } from 'zod'
import { seoSchema } from '../common'
import { researchCategorySchema } from './research-catagory'
import { mediaSchema, DEFAULT_GENERAL_PIC } from '../common/media.schema'

export const researchPageDTOSchema = z.object({
  title: z.string().default(''),
  description: z.string().default(''),
  mobileImage: mediaSchema.default(DEFAULT_GENERAL_PIC),
  portraitImage: mediaSchema.default(DEFAULT_GENERAL_PIC),
  researchCatagoriesDisplay: z.array(researchCategorySchema).default([]),
  seo: seoSchema,
})

export type ResearchPageDTO = z.infer<typeof researchPageDTOSchema>
