import type { Metadata } from 'next'
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

function getImageUrl(image: unknown): string | undefined {
  if (!image || typeof image !== 'object') {
    return undefined
  }

  const url = (image as { url?: string | null }).url

  return url ?? undefined
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params
  const researchpage = await getResearchPage(lang)

  const title = researchpage.seo?.title || researchpage.title || 'Research'
  const description =
    researchpage.seo?.description || 'Explore research from the Human Nutrition Unit.'

  const imageUrl = getImageUrl(researchpage.seo?.image) || getImageUrl(researchpage.portraitImage)

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: imageUrl
        ? [
            {
              url: imageUrl,
              alt: title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: imageUrl ? 'summary_large_image' : 'summary',
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  }
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
