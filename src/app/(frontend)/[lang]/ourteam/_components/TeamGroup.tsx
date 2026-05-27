import { StaffDTO } from '@/features/our-team'
import ProfileCard from './Profile'

export default function TeamGroup({
  title,
  people,
  onSelect,
  columns,
}: {
  title: string
  people: StaffDTO[]
  onSelect: (p: StaffDTO) => void
  columns: 3 | 4
}) {
  const gridCols =
    columns === 3
      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'

  return (
    <section>
      <div className="flex items-end justify-between">
        <div>
          <h2 className="mt-2 text-3xl font-bold text-[#0C0C48] md:text-4xl">{title}</h2>
        </div>
        <p className="text-sm text-gray-500">
          {people.length} {people.length === 1 ? 'person' : 'people'}
        </p>
      </div>
      <div className="mt-4 mb-8 h-px w-full bg-gray-200" />

      {people.length === 0 ? (
        <p className="py-12 text-center text-sm text-gray-500">No people match your search.</p>
      ) : (
        <div className={`grid gap-6 ${gridCols}`}>
          {people.map((profile, idx) => (
            <ProfileCard
              key={`${profile.firstname}-${profile.lastname}-${idx}`}
              profile={profile}
              variantIndex={idx}
              action={() => onSelect(profile)}
            />
          ))}
        </div>
      )}
    </section>
  )
}
