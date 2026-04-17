import { getResearchPage } from '@/queries/researchpage'
import { getAllResearch } from '@/queries/research'
import ResearchHero from './_components/ResearchHero'
import ResearchFilters from './_components/ResearchFilters'

async function page() {
  const researchpage = await getResearchPage()
  const research = await getAllResearch()

  return (
    <div>
      <ResearchHero title={researchpage.title} backgroundImage="/research/hero_desktop.jpg" />

      <p className="mt-6">{researchpage.description}</p>
      <ResearchFilters />

      <div className="mt-8">
        {researchpage.researchCatagoriesDisplay.map((category) => (
          <p key={category.id}>{category.title}</p>
        ))}
      </div>

      <div className="mt-8">
        {research.docs.map((entry) => (
          <div key={entry.id}>
            <h3>{entry.title}</h3>

            <a href={entry['Your Research File']?.url} target="_blank" rel="noopener noreferrer">
              View PDF
            </a>

            <p>{entry.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default page
