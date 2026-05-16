type Criterion = {
  id?: string
  item: string
}

type EligibilityCriteriaProps = {
  inclusion: Criterion[]
  exclusion: Criterion[]
}

export default function EligibilityCriteria({ inclusion, exclusion }: EligibilityCriteriaProps) {
  return (
    <section>
      <p className="text-xs font-semibold uppercase tracking-wider text-[#2448FF]">Eligibility</p>
      <h2 className="mt-2 text-2xl font-bold text-[#05083D] md:text-3xl">
        Who we&apos;re looking for
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <CriteriaCard label="You can join if" labelColor="text-green-700" items={inclusion} />
        <CriteriaCard label="You cannot join if" labelColor="text-red-600" items={exclusion} />
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
          {items.map((c, index) => (
            <li key={c.id ?? index}>{c.item}</li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-sm italic text-gray-400">No criteria listed.</p>
      )}
    </div>
  )
}
