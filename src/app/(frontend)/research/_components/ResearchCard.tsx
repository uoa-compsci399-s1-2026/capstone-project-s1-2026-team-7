import { ResearchEntry } from '../_types/types'

type Props = {
  item: ResearchEntry
  viewMode: 'grid' | 'list'
}

export default function ResearchCard({ item, viewMode }: Props) {
  return (
    <div
      className={
        viewMode === 'grid'
          ? 'w-full rounded-lg p-4 transition-transform duration-200 hover:scale-102'
          : 'w-full  rounded-lg p-4 flex gap-4 transition-transform duration-200 hover:scale-102'
      }
    >
      <img
        src={item.image}
        alt={item.title}
        className={
          viewMode === 'grid'
            ? 'w-full h-48 object-cover rounded-2xl'
            : 'w-40 h-28 object-cover rounded-2xl'
        }
      />
      <div className={viewMode === 'grid' ? 'mt-3' : 'flex flex-col justify-between'}>
        <h3 className="font-semibold">{item.title}</h3>
        <p className="text-lg text-gray-400 mt-2">{item.date}</p>
      </div>
    </div>
  )
}
