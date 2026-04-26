import { z } from 'zod'
import { mediaSchema } from '../common/media.schema'
import { staffDTOSchema } from '../our-team/staff.schema'
import { researchCategorySchema } from './research-catagory'

export const researchDTOSchema = z.object({
  id: z.string(),

  title: z.string(),
  description: z.string(),

  // Reuse media schema (PDF)
  'Your Research File': mediaSchema,

  order: z.number().optional(),

  // Use your transformed Staff DTO
  staff: z.array(staffDTOSchema).default([]),

  // Use your category schema directly (no union anymore)
  categories: z.array(researchCategorySchema).default([]),
})

export type ResearchDTO = z.infer<typeof researchDTOSchema>
