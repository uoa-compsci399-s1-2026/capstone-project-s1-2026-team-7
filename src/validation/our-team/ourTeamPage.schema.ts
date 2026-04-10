import { z } from 'zod'
import { staffDTOSchema } from './staff.schema'

export const ourTeamPageDTOSchema = z
  .object({
    title: z.string().min(1),
    boardTabLabel: z.string().min(1),
    staffTabLabel: z.string().min(1),
    staffMembers: z.array(staffDTOSchema),
  })
  .transform((data) => ({
    title: data.title,
    boardTabLabel: data.boardTabLabel,
    staffTabLabel: data.staffTabLabel,
    staff: data.staffMembers.sort((a, b) => a.sortOrder - b.sortOrder),
  }))

export type OurTeamPageDTO = z.infer<typeof ourTeamPageDTOSchema>
