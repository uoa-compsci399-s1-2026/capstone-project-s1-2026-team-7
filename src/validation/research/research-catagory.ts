import { z } from 'zod'

export const researchCategorySchema = z.object({
  id: z.string(),
  title: z.string(),
})

export type ResearchCategoryDTO = z.infer<typeof researchCategorySchema>
