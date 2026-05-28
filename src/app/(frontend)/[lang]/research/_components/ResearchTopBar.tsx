type ActiveStaff = {
  id: string
  label: string
}

type Props = {
  itemCount: number
  page: number
  itemsPerPage: number
  selectedCategoryLabel: string | null
  selectedStaff: ActiveStaff | null
  onClearStaff: () => void
}

export default function ResearchTopBar({
  itemCount,
  page,
  itemsPerPage,
  selectedCategoryLabel,
  selectedStaff,
  onClearStaff,
}: Props) {
  const start = itemCount === 0 ? 0 : (page - 1) * itemsPerPage + 1
  const end = Math.min(page * itemsPerPage, itemCount)

  return (
    <div className="mb-5 rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Archive index</p>
      <div className="mt-1 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-950">
            {itemCount === 0
              ? 'No publications found'
              : `Showing ${start}-${end} of ${itemCount} publications`}
          </h2>

          <div className="mt-2 flex flex-wrap gap-2 text-sm font-medium text-slate-500">
            {selectedCategoryLabel && <span>Category: {selectedCategoryLabel}</span>}
            {selectedStaff && (
              <button
                type="button"
                onClick={onClearStaff}
                className="rounded-full bg-[#090936]/10 px-3 py-1 text-xs font-bold text-[#090936] transition hover:bg-[#090936] hover:text-white"
                title="Clear staff filter"
              >
                Staff: {selectedStaff.label} ×
              </button>
            )}
          </div>
        </div>

        <p className="text-sm font-medium text-slate-500">
          Browse by category, staff member, title, or DOI.
        </p>
      </div>
    </div>
  )
}
