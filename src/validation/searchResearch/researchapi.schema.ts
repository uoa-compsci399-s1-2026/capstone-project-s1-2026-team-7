import { z } from 'zod'
import { mediaSchema, DEFAULT_GENERAL_PIC } from '../common/media.schema'
import { staffSchema } from '../our-team/staff.schema'
import { researchCategorySchema } from '../research/research-catagory'

export const researchDTOSchema = z.object({
  id: z.number(),
  title: z.string().default(''),
  description: z.string().default(''),
  researchLink: z.string().default('https://auckland.ac.nz'), //Default 404 for now
  staff: z.array(staffSchema).default([]),
  categories: z.array(researchCategorySchema).default([]),
  order: z
    .number()
    .nullish()
    .transform((v) => v ?? ''),
})

export type ResearchDTO = z.infer<typeof researchDTOSchema>
