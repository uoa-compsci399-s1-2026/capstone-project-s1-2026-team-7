import { z } from 'zod'
import { mediaSchema, DEFAULT_GENERAL_PIC } from '@/features/common/media.schema'

export const seoMetaSchema = z
  .object({
    title: z.string().nullable().optional().default(''),
    description: z.string().nullable().optional().default(''),
    image: mediaSchema.nullable().optional().default(DEFAULT_GENERAL_PIC),
  })
  .default({
    title: '',
    description: '',
    image: DEFAULT_GENERAL_PIC,
  })
