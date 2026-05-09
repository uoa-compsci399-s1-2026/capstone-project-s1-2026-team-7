import { z } from 'zod'
import { staffSchema } from '../our-team/staff.schema'
import { mediaSchema, DEFAULT_GENERAL_PIC } from '../common/media.schema'
import { researchCategorySchema } from '../research/research-catagory'

export const researchDTOSchema = z.object({
  id: z.number(),
  title: z.string().default(''),
  link: z.string().default('https://auckland.ac.nz'),
  image: mediaSchema.nullish().transform((value) => value ?? DEFAULT_GENERAL_PIC),
  date: z
    .string()
    .nullish()
    .transform((value) => value ?? '1 / 1 / 2050'),
  staff: z.array(staffSchema).default([]),
  categories: z.array(researchCategorySchema).default([]),
  order: z
    .number()
    .nullish()
    .transform((v) => v ?? ''),
})

export type ResearchDTO = z.infer<typeof researchDTOSchema>
