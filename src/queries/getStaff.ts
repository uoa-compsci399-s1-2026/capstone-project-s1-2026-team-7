import { getPayloadClient } from '@/lib/payload'
import { Staff } from '@/payload-types'
import { PaginatedDocs } from 'payload'
import { staffSchema, StaffDTO } from '@/validation'

export async function getStaff(): Promise<StaffDTO[]> {
  const payload = await getPayloadClient()
  const data: PaginatedDocs<Staff> = await payload.find({
    collection: 'staff',
    depth: 3,
  })

  return data.docs.map((staff) => staffSchema.parse(staff))
}
