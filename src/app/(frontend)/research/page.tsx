import React from 'react'
import { getResearchPage } from '@/queries/researchpage'
import { getAllResearch } from '@/queries/research'

async function page() {
  const researchpage = await getResearchPage()
  const research = await getAllResearch()

  return (
    <div>
      {' '}
      <h1>{researchpage.title}</h1> <p>{researchpage.description}</p>
      <div>
        {researchpage.researchCatagoriesDisplay.map((category) => (
          <p key={category.id}>{category.title}</p>
        ))}
      </div>
      <div>
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
