import { z } from 'zod'

export const studySchema = z.object({
  id: z.number(),
  title: z.string().default(''),
  description: z.any().default(''),
  sortOrder: z.number().default(100000),
})

export type StudyDTO = z.infer<typeof studySchema>

export const studiesDTOSchema = z.object({
  title: z.string().default(''),
  studiesDisplay: z.array(studySchema).default([]),
})

export type StudiesPageDTO = z.infer<typeof studiesDTOSchema>
