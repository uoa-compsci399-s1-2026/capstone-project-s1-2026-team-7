type HeroStatsProps = {
  durationLabel: string
  compensationLabel: string
  locationLabel: string
  duration: string
  compensation: string
  location: string
}

export default function HeroStats({
  durationLabel,
  compensationLabel,
  locationLabel,
  duration,
  compensation,
  location,
}: HeroStatsProps) {
  return (
    <div className="grid grid-cols-1 divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white sm:grid-cols-3 sm:divide-x sm:divide-y-0">
      <Stat label={durationLabel} value={duration} />
      <Stat label={compensationLabel} value={compensation} />
      <Stat label={locationLabel} value={location} />
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-6 py-4">
      <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
        {label}
      </div>
      <div className="mt-1 text-base font-semibold text-[#05083D]">{value}</div>
    </div>
  )
}
