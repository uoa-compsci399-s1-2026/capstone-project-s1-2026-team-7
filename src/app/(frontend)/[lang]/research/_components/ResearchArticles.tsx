import { ResearchDTO } from '@/features'
import ResearchCard from './ResearchCard'

type Props = {
  research: ResearchDTO[]
  viewMode: 'grid' | 'list'
}

export default function ResearchArticles({ research, viewMode }: Props) {
  return (
    <div
      className={
        viewMode === 'grid'
          ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
          : 'flex flex-col gap-4 mt-4'
      }
    >
      {research.map((item) => (
        <ResearchCard key={item.id} item={item} viewMode={viewMode} />
      ))}
    </div>
  )
}
