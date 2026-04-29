import { z } from 'zod'
import { mediaSchema, DEFAULT_PROFILE_PIC } from '../common/media.schema'

export const staffSchema = z.object({
  id: z.number(),
  firstname: z.string().default(''),
  lastname: z.string().default(''),
  jobTitle: z.string().default(''),
  orcid: z.string().default(''),
  intro: z
    .string()
    .nullish()
    .transform(() => ''),
  manager: z.boolean().default(false),
  uoaProfileLink: z.string().nullable().default(''),
  email: z.string().nullable().default(''),
  photo: mediaSchema.default(DEFAULT_PROFILE_PIC),
  sortOrder: z
    .number()
    .nullish()
    .transform(() => 0),
})

export type StaffDTO = z.infer<typeof staffSchema>
