import { z } from 'zod'
import { mediaSchema, DEFAULT_GENERAL_PIC } from '../../features/common/media.schema'

const footerLinkSchema = z.object({
  footerTitle: z.string(),
  footerURL: z.string(),
})
const socialLinkSchema = z.object({
  footerLogo: mediaSchema.default(DEFAULT_GENERAL_PIC),
  footerURL: z.string(),
})

export const footerSchema = z.object({
  uoaLogo: mediaSchema.default(DEFAULT_GENERAL_PIC),
  hnuLogo: mediaSchema.default(DEFAULT_GENERAL_PIC),
  exploreLinks: z.array(footerLinkSchema),
  supportLinks: z.array(footerLinkSchema),
  legalLinks: z.array(footerLinkSchema),
  socialLinks: z.array(socialLinkSchema),
  footerMotif: mediaSchema.default(DEFAULT_GENERAL_PIC),
})

export type FooterDTO = z.infer<typeof footerSchema>
export type FooterLinkDTO = z.infer<typeof footerLinkSchema>
export type SocialLinkDTO = z.infer<typeof socialLinkSchema>
