import { z } from 'zod'
import { mediaSchema } from './media.schema'

const DEFAULT_PROFILE_PIC = {
  url: 'https://cdn.prod.website-files.com/674c49348dfb73429320f17d/674e546a138ff27bf1f94bd3_default-avatar.png',
  alt: 'Default Profile Picture',
}

export const staffSchema = z.object({
  id: z.union([z.string(), z.number()]),
  firstname: z.string().min(1),
  lastname: z.string().min(1),
  jobTitle: z.string().min(1),
  intro: z.string().nullable().optional(),
  manager: z.boolean().optional(),
  uoaProfileLink: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  photo: z.union([mediaSchema, z.number()]).nullable().optional(),
  sortOrder: z.number().optional(),
})

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

export type StaffDTO = z.infer<typeof staffDTOSchema>
