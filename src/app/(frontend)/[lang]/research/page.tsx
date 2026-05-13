import ResearchHero from './_components/ResearchHero'
import ResearchFilters from './_components/ResearchFilters'
import { ResearchClient } from './_components/ResearchClient'
import { getResearchPage } from '@/features/research/researchpage.query'
import { searchResearch } from '@/features/research/searchResearch'

export default async function page() {
  const researchpage = await getResearchPage()
  const research = await searchResearch('')

  return (
    <div className="w-full mx-auto">
      <ResearchHero title={researchpage.title} backgroundImage="/research/hero_desktop.jpg" />
      <ResearchClient categories={researchpage.researchCategoriesDisplay} research={research} />
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
