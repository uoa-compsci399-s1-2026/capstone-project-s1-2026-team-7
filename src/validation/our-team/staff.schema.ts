import { z } from 'zod'
import { mediaSchema, DEFAULT_PROFILE_PIC } from '../common/media.schema'

const emptyString = z
  .string()
  .nullish()
  .transform((value) => value ?? '')

const zeroNumber = z
  .number()
  .nullish()
  .transform((value) => value ?? 0)

export const staffSchema = z.object({
  id: z.number(),

  firstname: emptyString,
  lastname: emptyString,
  jobTitle: emptyString,

  orcid: emptyString,

  intro: emptyString,

  manager: z.boolean().default(false),

  uoaProfileLink: emptyString,
  email: emptyString,

  photo: mediaSchema.nullish().transform((value) => value ?? DEFAULT_PROFILE_PIC),

  sortOrder: zeroNumber,
})

export type StaffDTO = z.infer<typeof staffSchema>
