type ParticipationItem = {
  id?: string
  title: string
  description: string
}

type ParticipationListProps = {
  eyebrow: string
  heading: string
  items: ParticipationItem[]
}

export default function ParticipationList({ eyebrow, heading, items }: ParticipationListProps) {
  if (!items || items.length === 0) return null

  return (
    <section>
      <p className="text-xs font-semibold uppercase tracking-wider text-[#2448FF]">{eyebrow}</p>

      <h2 className="mt-2 text-2xl font-bold text-[#05083D] md:text-3xl">{heading}</h2>

      <ul className="mt-6 space-y-5">
        {items.map((item, index) => (
          <li key={item.id ?? index} className="flex items-start gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2448FF]" />
            <div>
              <h3 className="text-lg font-bold text-[#2448FF]">{item.title}</h3>
              <p className="mt-1 leading-relaxed text-gray-700">{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
