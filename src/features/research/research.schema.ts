import { z } from 'zod'
import { seoSchema } from '../../features/common'
import { researchCategorySchema } from './research-catagory.schema'
import { mediaSchema, DEFAULT_GENERAL_PIC } from '../../features/common/media.schema'

export const researchPageDTOSchema = z.object({
  title: z.string().default(''),
  description: z.string().default(''),
  mobileImage: mediaSchema.default(DEFAULT_GENERAL_PIC),
  portraitImage: mediaSchema.default(DEFAULT_GENERAL_PIC),
  researchCategoriesDisplay: z.array(researchCategorySchema).default([]),
  seo: seoSchema,
})

export type ResearchPageDTO = z.infer<typeof researchPageDTOSchema>
