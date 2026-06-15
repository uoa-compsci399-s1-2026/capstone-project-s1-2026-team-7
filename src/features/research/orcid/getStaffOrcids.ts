import type { StaffDTO } from '@/features/our-team/staff.schema'
import type { NameWithOrcid } from './types'

function hasOrcid(staff: StaffDTO): staff is StaffDTO & { orcid: string } {
  return typeof staff.orcid === 'string' && staff.orcid.trim().length > 0
}

export function getStaffOrcids(staff: StaffDTO[]): NameWithOrcid[] {
  return staff.filter(hasOrcid).map((s) => ({
    name: `${s.firstname} ${s.lastname}`.trim(),
    orcid: s.orcid.trim(),
    staffId: s.id,
  }))
}

// Backwards-compatible alias for the previous function name.
export const getOrcidList = getStaffOrcids
