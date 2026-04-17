import { getResearchPage } from '@/queries/researchpage'
import { searchResearch } from '@/queries/searchResearch'
import { ResearchDTO } from '@/validation'

async function page() {
  const researchpage = await getResearchPage()
  const categoryID = researchpage.researchCatagoriesDisplay[0].id
  const research = await searchResearch('', categoryID)
  return (
    <div>
      <div>{researchpage.researchCatagoriesDisplay[0].id}</div>
      <h1>{researchpage.title}</h1> <p>{}</p>
      <div>
        {researchpage.researchCatagoriesDisplay.map((category) => (
          <p key={category.id}>{category.title}</p>
        ))}
      </div>
      <div>
        {research.map((entry: ResearchDTO) => (
          <div key={entry.id}>
            <h3>{entry.title}</h3>

            <a href={entry['Your Research File'].url} target="_blank" rel="noopener noreferrer">
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
