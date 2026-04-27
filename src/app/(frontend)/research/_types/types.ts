export type ResearchPageProps = {
  title: string
  researchCategoriesDisplay: {
    id: string
    title: string
  }[]
  listOfResearch: ResearchEntry[]
}

export type ResearchEntry = {
  id: string
  title: string
  link: string
  image: string
  date: string
  categoryId: string
}
