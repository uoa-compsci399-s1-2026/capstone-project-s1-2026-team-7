import { z } from 'zod'
import { mediaSchema } from '@/validation'

const participationItemSchema = z.object({
  id: z.string().optional(),
  title: z.string().default(''),
  description: z.string().default(''),
})

const eligibilityCriterionSchema = z.object({
  id: z.string().optional(),
  item: z.string().default(''),
})

const faqItemSchema = z.object({
  id: z.string().optional(),
  question: z.string().default(''),

  answer: z.any().default(''),
})

const contactSchema = z.object({
  email: z.string().default(''),
  address: z.string().default(''),
  phone: z.string().default(''),
})

export const studySchema = z.object({
  id: z.number(),
  title: z.string().default(''),
  subtitle: z.string().default(''),
  studyCode: z.string().default(''),
  duration: z.string().default(''),
  compensation: z.string().default(''),
  location: z.string().default(''),
  eligibility: z.string().default(''),
  slug: z.string().default(''),
  banner: mediaSchema,
  description: z.any().default(''),
  participationItems: z.array(participationItemSchema).default([]),
  eligibilityInclusion: z.array(eligibilityCriterionSchema).default([]),
  eligibilityExclusion: z.array(eligibilityCriterionSchema).default([]),
  faqs: z.array(faqItemSchema).default([]),
  surveyUrl: z.string().default(''),
  ethicsApprovalRef: z.string().default(''),
  sortOrder: z.number().default(100000),
})

export type StudyDTO = z.infer<typeof studySchema>

export const studiesDTOSchema = z.object({
  title: z.string().default(''),
  banner: mediaSchema,
  studiesDisplay: z.array(studySchema).default([]),
  contact: contactSchema.default({ email: '', address: '', phone: '' }),
})

export type StudiesPageDTO = z.infer<typeof studiesDTOSchema>
