import { z } from 'zod'
import { researchCategorySchema } from './research-catagory.schema'
import { mediaSchema, DEFAULT_GENERAL_PIC } from '../../features/common/media.schema'
import { staffSchema } from '../our-team'
import { seoMetaSchema } from '../../features/common'

export const researchPageDTOSchema = z.object({
  title: z.string().default(''),
  description: z.string().default(''),
  mobileImage: mediaSchema.default(DEFAULT_GENERAL_PIC),
  portraitImage: mediaSchema.default(DEFAULT_GENERAL_PIC),
  researchCategoriesDisplay: z.array(researchCategorySchema).default([]),
  researchStaffDisplay: z.array(staffSchema).default([]),
  meta: seoMetaSchema,
})

export type ResearchPageDTO = z.infer<typeof researchPageDTOSchema>
