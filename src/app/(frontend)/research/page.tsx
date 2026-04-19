import { getResearchPage } from '@/queries/researchpage'
import { searchResearch } from '@/queries/searchResearch'
import ResearchHero from './_components/ResearchHero'
import ResearchFilters from './_components/ResearchFilters'
import ResearchPageClient from './_components/ResearchPageClient'

async function page() {
  const researchpage = await getResearchPage()
  const research = await searchResearch('', 1) // must contain docs[]

  return (
    <div>
      <ResearchHero title={researchpage.title} backgroundImage="/research/hero_desktop.jpg" />

      <p>{researchpage.description}</p>

      <ResearchFilters />

      <div className="mt-8">
        {researchpage.researchCatagoriesDisplay.map((category) => (
          <p key={category.id}>{category.title}</p>
        ))}
      </div>

      <ResearchPageClient pdfCount={research.length}>
        {(viewMode: string) => (
          <div className="mt-8">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {research.map((entry) => (
                  <div key={entry.id}>
                    <h3>{entry.title}</h3>
                    <a href={entry['Your Research File']?.url} target="_blank">
                      View PDF
                    </a>
                    <p>{entry.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {research.map((entry) => (
                  <div key={entry.id} className="border p-4 rounded-md">
                    <h3>{entry.title}</h3>
                    <a href={entry['Your Research File']?.url} target="_blank">
                      View PDF
                    </a>
                    <p>{entry.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </ResearchPageClient>
    </div>
  )
}

export default page
