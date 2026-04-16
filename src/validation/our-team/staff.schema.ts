import { z } from 'zod'
import { mediaSchema, DEFAULT_PROFILE_PIC } from '../common/media.schema'

export const staffSchema = z.object({
  id: z.number(),
  firstname: z.string().default(''),
  lastname: z.string().default(''),
  jobTitle: z.string().default(''),
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

/*
export const staffDTOSchema = staffSchema.transform((staff) => {
  const parsedPhoto = mediaSchema.safeParse(staff.photo)

  const photo =
    parsedPhoto.success && parsedPhoto.data.url
      ? {
          url: parsedPhoto.data.url,
          alt: parsedPhoto.data.alt?.trim() || 'Profile Picture',
        }
      : DEFAULT_PROFILE_PIC

  return {
    firstname: staff.firstname,
    lastname: staff.lastname,
    jobTitle: staff.jobTitle,
    intro: staff.intro ?? '',
    manager: staff.manager ?? false,
    uoaProfileLink: staff.uoaProfileLink ?? '',
    email: staff.email ?? '',
    photo,
    sortOrder: staff.sortOrder ?? 1000000,
  }
})
*/
export type StaffDTO = z.infer<typeof staffSchema>
