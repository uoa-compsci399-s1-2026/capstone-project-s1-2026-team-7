/*import { z } from 'zod'
import { SeoSchema } from '../common'
import { researchCategorySchema } from './research-catagory'

const researchCategoryDisplaySchema = z.union([z.string(), researchCategorySchema])

export const researchPageDTOSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  researchCatagoriesDisplay: z.array(researchCategoryDisplaySchema).default([]),
  seo: SeoSchema.optional(),
})

export type ResearchPageDTO = z.infer<typeof researchPageDTOSchema>
export type ResearchCategoryDisplayDTO = z.infer<typeof researchCategoryDisplaySchema>*/

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
