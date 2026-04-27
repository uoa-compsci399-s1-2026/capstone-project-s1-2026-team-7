import { getResearchPage } from '@/queries/researchpage'
import { searchResearch } from '@/queries/searchResearch'
import ResearchHero from './_components/ResearchHero'
import ResearchFilters from './_components/ResearchFilters'
import { ResearchClient } from './_components/ResearchClient'
import { ResearchPageProps } from './_types/types'

const researchpage: ResearchPageProps = {
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
    {
      id: '3',
      title: 'Sustainable Energy Solutions',
      link: 'https://example.com/sustainable-energy.pdf',
      image: '/research/placeholder_wire_image.jpg',
      date: '2024-04-15',
      categoryId: '3',
    },
    {
      id: '4',
      title: 'Sustainable Energy Solutions',
      link: 'https://example.com/sustainable-energy.pdf',
      image: '/research/placeholder_wire_image.jpg',
      date: '2024-04-15',
      categoryId: '4',
    },
    {
      id: '5',
      title: 'Sustainable Energy Solutions',
      link: 'https://example.com/sustainable-energy.pdf',
      image: '/research/placeholder_wire_image.jpg',
      date: '2024-04-15',
      categoryId: '1',
    },
    {
      id: '6',
      title: 'Sustainable Energy Solutions',
      link: 'https://example.com/sustainable-energy.pdf',
      image: '/research/placeholder_wire_image.jpg',
      date: '2024-04-15',
      categoryId: '1',
    },
    {
      id: '7',
      title: 'Sustainable Energy Solutions',
      link: 'https://example.com/sustainable-energy.pdf',
      image: '/research/placeholder_wire_image.jpg',
      date: '2024-04-15',
      categoryId: '1',
    },
    {
      id: '8',
      title: 'Sustainable Energy Solutions',
      link: 'https://example.com/sustainable-energy.pdf',
      image: '/research/placeholder_wire_image.jpg',
      date: '2024-04-15',
      categoryId: '4',
    },
    {
      id: '9',
      title: 'Sustainable Energy Solutions',
      link: 'https://example.com/sustainable-energy.pdf',
      image: '/research/placeholder_wire_image.jpg',
      date: '2024-04-15',
      categoryId: '3',
    },
    {
      id: '10',
      title: 'Sustainable Energy Solutions',
      link: 'https://example.com/sustainable-energy.pdf',
      image: '/research/placeholder_wire_image.jpg',
      date: '2024-04-15',
      categoryId: '4',
    },
    {
      id: '11',
      title: 'Sustainable Energy Solutions',
      link: 'https://example.com/sustainable-energy.pdf',
      image: '/research/placeholder_wire_image.jpg',
      date: '2024-04-15',
      categoryId: '1',
    },
    {
      id: '12',
      title: 'Sustainable Energy Solutions',
      link: 'https://example.com/sustainable-energy.pdf',
      image: '/research/placeholder_wire_image.jpg',
      date: '2024-04-15',
      categoryId: '2',
    },
    {
      id: '13',
      title: 'Sustainable Energy Solutions',
      link: 'https://example.com/sustainable-energy.pdf',
      image: '/research/placeholder_wire_image.jpg',
      date: '2024-04-15',
      categoryId: '3',
    },
    {
      id: '14',
      title: 'Sustainable Energy Solutions',
      link: 'https://example.com/sustainable-energy.pdf',
      image: '/research/placeholder_wire_image.jpg',
      date: '2024-04-15',
      categoryId: '3',
    },
    {
      id: '15',
      title: 'Sustainable Energy Solutions',
      link: 'https://example.com/sustainable-energy.pdf',
      image: '/research/placeholder_wire_image.jpg',
      date: '2024-04-15',
      categoryId: '3',
    },
    {
      id: '16',
      title: 'Sustainable Energy Solutions',
      link: 'https://example.com/sustainable-energy.pdf',
      image: '/research/placeholder_wire_image.jpg',
      date: '2024-04-15',
      categoryId: '1',
    },
    {
      id: '17',
      title: 'Sustainable Energy Solutions',
      link: 'https://example.com/sustainable-energy.pdf',
      image: '/research/placeholder_wire_image.jpg',
      date: '2024-04-15',
      categoryId: '1',
    },
    {
      id: '18',
      title: 'Sustainable Energy Solutions',
      link: 'https://example.com/sustainable-energy.pdf',
      image: '/research/placeholder_wire_image.jpg',
      date: '2024-04-15',
      categoryId: '2',
    },
    {
      id: '19',
      title: 'Sustainable Energy Solutions',
      link: 'https://example.com/sustainable-energy.pdf',
      image: '/research/placeholder_wire_image.jpg',
      date: '2024-04-15',
      categoryId: '2',
    },
    {
      id: '20',
      title: 'Sustainable Energy Solutions',
      link: 'https://example.com/sustainable-energy.pdf',
      image: '/research/placeholder_wire_image.jpg',
      date: '2024-04-15',
      categoryId: '1',
    },
    {
      id: '21',
      title: 'Sustainable Energy Solutions',
      link: 'https://example.com/sustainable-energy.pdf',
      image: '/research/placeholder_wire_image.jpg',
      date: '2024-04-15',
      categoryId: '2',
    },
    {
      id: '22',
      title: 'Sustainable Energy Solutions',
      link: 'https://example.com/sustainable-energy.pdf',
      image: '/research/placeholder_wire_image.jpg',
      date: '2024-04-15',
      categoryId: '1',
    },
  ],
}

export default function page() {
  /* const researchpage = await getResearchPage() */
  /*const research = await searchResearch('', 1) */

  return (
    <div className="w-full mx-auto">
      <ResearchHero title={researchpage.title} backgroundImage="/research/hero_desktop.jpg" />

      <ResearchFilters />

      <ResearchClient
        categories={researchpage.researchCategoriesDisplay}
        research={researchpage.listOfResearch}
      />
    </div>
  )
}
