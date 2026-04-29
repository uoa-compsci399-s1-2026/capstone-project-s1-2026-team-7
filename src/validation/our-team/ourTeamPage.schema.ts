import { z } from 'zod'
import { staffSchema } from './staff.schema'

export const ourTeamPageDTOSchema = z
  .object({
    title: z.string().default(''),
    banner: z.object(),
    /* boardTabLabel: z.string().default(''),*/
    staffTabLabel: z.string().default(''),
    staffMembers: z.array(staffSchema),
  })
  .transform((data) => ({
    title: data.title,
    banner: data.banner,
    /* boardTabLabel: data.boardTabLabel,*/
    staffTabLabel: data.staffTabLabel,
    staff: data.staffMembers.sort((a, b) => a.sortOrder - b.sortOrder),
  }))

export type OurTeamPageDTO = z.infer<typeof ourTeamPageDTOSchema>
