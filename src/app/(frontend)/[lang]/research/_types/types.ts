import { Url } from 'next/dist/shared/lib/router/router'
import { ResearchCategoryDTO, StaffDTO } from '@/validation'
import { ResearchCategory } from '@/payload-types'

export type ResearchPageProps = {
  title: string
  researchCategoriesDisplay: {
    id: string
    title: string
  }[]
  listOfResearch: ResearchEntry[]
}

export type ResearchEntry = {
  id: number
  title: string
  link: string
  image: {
    url: string
    alt: string
  }
  date: string
  staff: StaffDTO[]
  categories: ResearchCategoryDTO[]
}
