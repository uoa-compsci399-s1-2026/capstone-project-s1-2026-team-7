import { getPayloadClient } from '@/lib/payload'
import type { Staff } from '@/payload-types'
import { staffSchema } from './staff.schema'
import type { StaffDTO } from './staff.schema'

export async function getStaff(): Promise<StaffDTO[]> {
  const payload = await getPayloadClient()
  const docs: Staff[] = []
  let page = 1

  while (true) {
    const result = await payload.find({
      collection: 'staff',
      depth: 3,
      limit: 100,
      page,
    })

    docs.push(...result.docs)

    if (!result.hasNextPage) break
    page += 1
  }

  return docs.map((staff) => staffSchema.parse(staff))
}
