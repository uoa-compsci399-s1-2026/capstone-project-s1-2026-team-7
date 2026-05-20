import type { StaffDTO } from '@/features/our-team/staff.schema'

const dummydata: StaffDTO[] = [
  {
    id: 1,
    firstname: 'Jennifer',
    lastname: 'Miles-Chan',
    jobTitle: 'Professor',
    orcid: '0000-0003-0313-7048',
    intro: 'Professor, Biological Sciences',
    manager: false,
    uoaProfileLink: '',
    email: 'j.miles-chan@auckland.ac.nz',
    photo: {
      url: '',
      alt: 'Professor Jennifer Miles-Chan',
    },
    sortOrder: 1,
  },
]

export default dummydata
