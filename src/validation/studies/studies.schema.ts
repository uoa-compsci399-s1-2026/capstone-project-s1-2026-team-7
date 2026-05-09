import { z } from 'zod'
import { mediaSchema } from '@/validation'

export const studySchema = z.object({
  id: z.number(),
  title: z.string().default(''),
  subtitle: z.string().default(''),
  studyCode: z.string().default(''),
  duration: z.string().default(''),
  eligibility: z.string().default(''),
  slug: z.string().default(''),
  banner: mediaSchema,
  description: z.any().default(''),
  sortOrder: z.number().default(100000),
})

export type StudyDTO = z.infer<typeof studySchema>

export const studiesDTOSchema = z.object({
  title: z.string().default(''),
  banner: mediaSchema,
  studiesDisplay: z.array(studySchema).default([]),
})

export type StudiesPageDTO = z.infer<typeof studiesDTOSchema>
