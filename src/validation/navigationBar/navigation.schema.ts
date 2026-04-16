import { z } from 'zod'
import { mediaSchema, DEFAULT_GENERAL_PIC } from '../common/media.schema'

const navbarLinkSchema = z.object({
  navTitle: z.string(),
  navURL: z.string(),
})

export const navigationBarSchema = z.object({
  uoaLogo: mediaSchema.default(DEFAULT_GENERAL_PIC),
  hnuLogo: mediaSchema.default(DEFAULT_GENERAL_PIC),
  navbarLinks: z.array(navbarLinkSchema),
})

export type NavigationBarDTO = z.infer<typeof navigationBarSchema>
