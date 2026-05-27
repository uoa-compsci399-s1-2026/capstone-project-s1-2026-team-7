import { ResearchDTO } from '@/features'
import ResearchCard from './ResearchCard'

type Props = {
  research: ResearchDTO[]
}

export default function ResearchArticles({ research }: Props) {
  return (
    <div className="flex flex-col gap-4">
      {research.map((item) => (
        <ResearchCard key={item.id} item={item} />
      ))}
    </div>
  )
}
