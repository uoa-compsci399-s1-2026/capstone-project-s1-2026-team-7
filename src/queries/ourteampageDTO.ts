import { Staff } from '@/payload-types'

export type ourteampageDTO = {
  title: string
  boardTabLabel: string
  staffTabLabel: string
  staff: StaffDTO[]
}

export type StaffDTO = {
  firstname: string
  lastname: string
  jobTitle: string
  intro: string
  manager: boolean
  uoaProfileLink: string
  email: string
  photo: ImageDTO
  sortOrder: number
}

export type ImageDTO = {
  url: string
  alt: string
}
