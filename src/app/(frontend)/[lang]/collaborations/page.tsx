import type { Metadata } from 'next'
import { getCollaborationsPage } from '@/features/collaboration/collaborationpage.query'
import { PageProps } from '@/types/pageprops'
import { CollaborationsPageDTO } from '@/features/collaboration/collaboration.schema'
import CollaborationsRenderer from './_components/CollaborationsRenderer'

function getImageUrl(image: unknown): string | undefined {
  if (!image || typeof image !== 'object') {
    return undefined
  }

  const url = (image as { url?: string | null }).url

  return url ?? undefined
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params
  const collaborationsPage: CollaborationsPageDTO = await getCollaborationsPage(lang)

  const heroBlock = collaborationsPage.layout.find(
    (block) => block.blockType === 'collaborationHero',
  )

  const title = collaborationsPage.meta?.title || heroBlock?.title || 'Collaborations'
  const description =
    collaborationsPage.meta?.description ||
    heroBlock?.description ||
    'Collaborate with the Human Nutrition Unit.'

  const imageUrl = getImageUrl(collaborationsPage.meta?.image) || getImageUrl(heroBlock?.image)

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

export default async function Collaborations({ params }: PageProps) {
  const { lang } = await params
  const collaborationsPage: CollaborationsPageDTO = await getCollaborationsPage(lang)

  return (
    <div>
      <CollaborationsRenderer blocks={collaborationsPage.layout} />
    </div>
  )
}
