'use client'

import { UserRound, X } from 'lucide-react'

export type StaffFilter = {
  id: string
  label: string
}

export type StaffOption = {
  id: string
  label: string
  firstname?: string | null
  lastname?: string | null
  email?: string | null
}

type Props = {
  staff: StaffOption[]
  selectedStaffId: string | null
  onSelect: (staff: StaffFilter | null) => void
}

function getStaffLabel(staff: StaffOption) {
  const firstname = staff.firstname ?? ''
  const lastname = staff.lastname ?? ''
  const fullName = `${firstname} ${lastname}`.trim()

  return fullName || staff.label || staff.email || `Staff member ${staff.id}`
}

export default function StaffSidebar({ staff, selectedStaffId, onSelect }: Props) {
  const staffOptions = staff
    .map((member) => ({
      id: String(member.id),
      label: getStaffLabel(member),
    }))
    .filter((member) => member.id && member.label)

  if (staffOptions.length === 0) {
    return null
  }

  return (
    <aside className="w-full rounded-3xl border border-slate-200 bg-white p-4 shadow-sm lg:p-5">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Filter by</p>
          <h2 className="mt-1 text-lg font-black text-slate-950">Staff</h2>
        </div>

        <div className="rounded-2xl bg-slate-100 p-2 text-slate-600">
          <UserRound className="h-4 w-4" aria-hidden="true" />
        </div>
      </div>

      <div className="space-y-2">
        <button
          type="button"
          onClick={() => onSelect(null)}
          className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-semibold transition-all duration-200 cursor-pointer ${
            selectedStaffId === null
              ? 'bg-[#090936] text-white shadow-sm'
              : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
          }`}
        >
          <span>All staff</span>
          {selectedStaffId === null && <span className="text-xs text-white/70">Active</span>}
        </button>

        {staffOptions.map((member) => {
          const isActive = selectedStaffId === member.id

          return (
            <button
              key={member.id}
              type="button"
              onClick={() => onSelect(isActive ? null : member)}
              className={`group flex w-full items-center justify-between gap-3 rounded-2xl px-4 py-3 text-left text-sm transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-[#090936] font-bold text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-950'
              }`}
            >
              <span>{member.label}</span>

              {isActive ? (
                <X className="h-4 w-4 text-white/80" aria-hidden="true" />
              ) : (
                <span className="h-2 w-2 rounded-full bg-slate-200 transition group-hover:bg-[#090936]" />
              )}
            </button>
          )
        })}
      </div>
    </aside>
  )
}
