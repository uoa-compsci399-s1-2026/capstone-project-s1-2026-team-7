import ResearchHero from './_components/ResearchHero'
import { ResearchClient } from './_components/ResearchClient'
import { getResearchPage } from '@/features/research/researchpage.query'
import { getAllCategories } from '@/features/research/getCatagories.query'
import { searchResearch } from '@/features/research/searchResearch'
import { PageProps } from '@/types/pageprops'

type StaffRelationship =
  | number
  | {
      id: number | string
      firstname?: string | null
      lastname?: string | null
      email?: string | null
    }

export type ResearchStaffSidebarOption = {
  id: string
  label: string
  firstname: string
  lastname: string
  email: string
}

function getStaffDisplayName(staff: {
  firstname?: string | null
  lastname?: string | null
  email?: string | null
  id?: string | number
}) {
  const firstname = staff.firstname ?? ''
  const lastname = staff.lastname ?? ''
  const fullName = `${firstname} ${lastname}`.trim()

  return fullName || staff.email || `Staff member ${staff.id}`
}

function getSelectedStaffOptions(
  staffDisplay: StaffRelationship[] | null | undefined,
): ResearchStaffSidebarOption[] {
  return (staffDisplay ?? []).flatMap((staff) => {
    if (!staff || typeof staff !== 'object') {
      return []
    }

    return [
      {
        id: String(staff.id),
        label: getStaffDisplayName(staff),
        firstname: staff.firstname ?? '',
        lastname: staff.lastname ?? '',
        email: staff.email ?? '',
      },
    ]
  })
}

export default async function Page({ params }: PageProps) {
  const { lang } = await params

  const [researchpage, researchResult, categories] = await Promise.all([
    getResearchPage(lang),
    searchResearch({
      page: 1,
      limit: 16,
    }),
    getAllCategories(),
  ])

  const staffOptions = getSelectedStaffOptions(researchpage.researchStaffDisplay)

  return (
    <div className="w-full mx-auto">
      <ResearchHero
        title={researchpage.title}
        imageUrl={researchpage.portraitImage.url}
        alt={researchpage.portraitImage.alt}
      />

      <ResearchClient
        categories={categories}
        staffOptions={staffOptions}
        initialResearch={researchResult.docs}
        initialTotalDocs={researchResult.totalDocs}
      />
    </div>
  )
}
