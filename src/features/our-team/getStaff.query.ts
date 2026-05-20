import { getPayloadClient } from '@/lib/payload'
import type { Staff } from '@/payload-types'
import type { PaginatedDocs } from 'payload'
import { staffSchema } from './staff.schema'
import type { StaffDTO } from './staff.schema'

export async function getStaff(): Promise<StaffDTO[]> {
  const payload = await getPayloadClient()
  const data: PaginatedDocs<Staff> = await payload.find({
    collection: 'staff',
    depth: 3,
  })

  return data.docs.map((staff) => staffSchema.parse(staff))
}
