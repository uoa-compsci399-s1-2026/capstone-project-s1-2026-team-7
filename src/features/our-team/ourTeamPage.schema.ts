import { z } from 'zod'
import { staffSchema } from './staff.schema'
import { mediaSchema, seoMetaSchema } from '../common'

export const ourTeamPageDTOSchema = z
  .object({
    title: z.string().default(''),
    banner: mediaSchema.nullish(),
    boardTabLabel: z.string().default(''),
    staffTabLabel: z.string().default(''),
    staffMembers: z.array(staffSchema),
    meta: seoMetaSchema,
  })
  .transform((data) => ({
    title: data.title,
    banner: data.banner,
    boardTabLabel: data.boardTabLabel,
    staffTabLabel: data.staffTabLabel,
    staff: data.staffMembers.sort((a, b) => a.sortOrder - b.sortOrder),
    meta: data.meta,
  }))

export type OurTeamPageDTO = z.infer<typeof ourTeamPageDTOSchema>
