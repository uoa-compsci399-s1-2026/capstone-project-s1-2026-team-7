import ResearchHero from './_components/ResearchHero'
import ResearchFilters from './_components/ResearchFilters'
import { ResearchClient } from './_components/ResearchClient'
import { getResearchPage } from '@/features/research/researchpage.query'
import { searchResearch } from '@/features/research/searchResearch'
import { Lang } from '@/types/lang'

type PageProps = {
  params: Promise<{
    lang: Lang
  }>
}

export default async function page({ params }: PageProps) {
  const { lang } = await params
  const researchpage = await getResearchPage(lang)

  const researchResult = await searchResearch({
    page: 1,
    limit: 16,
  })
  return (
    <div className="w-full mx-auto">
      <ResearchHero title={researchpage.title} backgroundImage="/research/hero_desktop.jpg" />
      <ResearchClient
        categories={researchpage.researchCategoriesDisplay}
        initialResearch={researchResult.docs}
        initialTotalDocs={researchResult.totalDocs}
      />
    </div>
  )
}

/*const researchpage: ResearchPageProps = {
  title: 'Our Research',
  researchCategoriesDisplay: [
    { id: '1', title: 'Miscellaneous' },
    { id: '2', title: 'Muscle Health' },
    { id: '3', title: 'Energetics' },
    { id: '4', title: 'Appetite Regulation' },
    { id: '5', title: 'Obesity and Weight Loss' },
    { id: '6', title: 'Diabetites and Pre-diabetes' },
  ],
  listOfResearch: [
    {
      id: '1',
      title: 'Participant insights from SYNERGY – a residential nutrition intervention trial',
      link: 'https://example.com/ai-healthcare.pdf',
      image: '/research/placeholder_wire_image.jpg',
      date: '2024-05-01',
      categoryId: '1',
    },
    {
      id: '2',
      title: 'Sustainable Energy Solutions',
      link: 'https://example.com/sustainable-energy.pdf',
      image: '/research/placeholder_wire_image.jpg',
      date: '2024-04-15',
      categoryId: '2',
    },
  ],
}*/
