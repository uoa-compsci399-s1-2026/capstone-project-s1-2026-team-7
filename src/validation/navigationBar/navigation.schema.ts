import { z } from 'zod'
import { imageSchema } from './image.schema'

const navbarLinkSchema = z.object({
  navTitle: z.string(),
  navURL: z.string(),
})

export const navigationBarSchema = z.object({
  uoaLogo: imageSchema.required(),
  hnuLogo: imageSchema.required(),
  navbarLinks: z.array(navbarLinkSchema),
})
export type NavigationBarDTO = z.infer<typeof navigationBarSchema>
