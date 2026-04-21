import { ResearchEntry } from '../_types/types'
import ResearchCard from './ResearchCard'

type Props = {
  research: ResearchEntry[]
  viewMode: 'grid' | 'list'
}

export default function ResearchArticles({ research, viewMode }: Props) {
  return (
    <div className="grid grid-cols-3 gap-6 min-w-0">
      {research.map((item) => (
        <ResearchCard key={item.id} item={item} />
      ))}
    </div>
  )
}
