import { getCollaborationsPage } from '@/features/collaboration/collaborationpage.query'
import { PageProps } from '@/types/pageprops'
import { CollaborationsPageDTO } from '@/features/collaboration/collaboration.schema'
import CollaborationsRenderer from './_components/CollaborationsRenderer'

export default async function Collaborations({ params }: PageProps) {
  const { lang } = await params
  const collaborationsPage: CollaborationsPageDTO = await getCollaborationsPage(lang)
  return (
    <div>
      <CollaborationsRenderer blocks={collaborationsPage.layout} />
    </div>
  )
}
