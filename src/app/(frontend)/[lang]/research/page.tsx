import ResearchHero from './_components/ResearchHero'
import { ResearchClient } from './_components/ResearchClient'
import { getResearchPage } from '@/features/research/researchpage.query'
import { getResearchStaffOptions, searchResearch } from '@/features/research/searchResearch'
import { PageProps } from '@/types/pageprops'

export const revalidate = 300

export default async function Page({ params }: PageProps) {
  const { lang } = await params

  const [researchpage, researchResult, staffOptions] = await Promise.all([
    getResearchPage(lang),
    searchResearch({
      page: 1,
      limit: 12,
    }),
    getResearchStaffOptions(),
  ])

  return (
    <div className="w-full bg-slate-50">
      <ResearchHero title={researchpage.title} />

      <ResearchClient
        categories={researchpage.researchCategoriesDisplay ?? []}
        staffOptions={staffOptions}
        initialResearch={researchResult.docs}
        initialTotalDocs={researchResult.totalDocs}
      />
    </div>
  )
}
