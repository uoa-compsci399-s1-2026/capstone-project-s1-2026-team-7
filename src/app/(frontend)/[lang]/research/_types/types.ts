import { Url } from 'next/dist/shared/lib/router/router'
import { StaffDTO } from '@/validation'
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
  id: string
  title: string
  link: string
  image: {
    url: string
    alt: string
  }
  date: string
  staff: StaffDTO[]
  categories: ResearchCategory[]
}
