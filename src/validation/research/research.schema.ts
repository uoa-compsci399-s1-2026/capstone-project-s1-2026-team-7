import { z } from 'zod'
import { SeoSchema } from '../common'
import { researchCategorySchema } from './research-catagory'

export const researchPageDTOSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  researchCatagoriesDisplay: z.array(researchCategorySchema).default([]),
  seo: SeoSchema.optional(),
})

export type ResearchPageDTO = z.infer<typeof researchPageDTOSchema>
