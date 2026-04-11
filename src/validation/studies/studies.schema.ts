import { z } from 'zod'

export const studySchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.any(),
  sortOrder: z.number().nullable().optional(),
})

export type StudyDTO = z.infer<typeof studySchema>

export const studiesDTOSchema = z.object({
  title: z.string(),
  studiesDisplay: z.array(studySchema).default([]),
})

export type StudiesPageDTO = z.infer<typeof studiesDTOSchema>
