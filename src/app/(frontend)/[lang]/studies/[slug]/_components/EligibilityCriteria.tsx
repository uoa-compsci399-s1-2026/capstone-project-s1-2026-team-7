type Criterion = {
  id?: string
  item: string
}

type EligibilityCriteriaProps = {
  eyebrow: string
  heading: string
  inclusionHeading: string
  exclusionHeading: string
  inclusion: Criterion[]
  exclusion: Criterion[]
}

export default function EligibilityCriteria({
  eyebrow,
  heading,
  inclusionHeading,
  exclusionHeading,
  inclusion,
  exclusion,
}: EligibilityCriteriaProps) {
  return (
    <section>
      <p className="text-xs font-semibold uppercase tracking-wider text-[#2448FF]">{eyebrow}</p>

      <h2 className="mt-2 text-2xl font-bold text-[#05083D] md:text-3xl">{heading}</h2>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <CriteriaCard label={inclusionHeading} labelColor="text-green-700" items={inclusion} />
        <CriteriaCard label={exclusionHeading} labelColor="text-red-600" items={exclusion} />
      </div>
    </section>
  )
}

type CardProps = {
  label: string
  labelColor: string
  items: Criterion[]
}

function CriteriaCard({ label, labelColor, items }: CardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
      <p className={`text-xs font-semibold uppercase tracking-wider ${labelColor}`}>{label}</p>

      {items && items.length > 0 ? (
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-gray-700">
          {items.map((criterion, index) => (
            <li key={criterion.id ?? index}>{criterion.item}</li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-sm italic text-gray-400">No criteria listed.</p>
      )}
    </div>
  )
}
