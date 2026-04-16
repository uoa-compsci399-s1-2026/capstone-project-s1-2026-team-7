import { z } from 'zod'
import { seoSchema } from '../common'
import { researchCategorySchema } from './research-catagory'

export const researchPageDTOSchema = z.object({
  title: z.string().default(''),
  description: z.string().default(''),
  researchCatagoriesDisplay: z.array(researchCategorySchema).default([]),
  seo: seoSchema,
})

export type ResearchPageDTO = z.infer<typeof researchPageDTOSchema>
