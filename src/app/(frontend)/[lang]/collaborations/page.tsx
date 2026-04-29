import Banner from '../_components/Banner'
import CollabIntro from './_components/CollabIntro'
import CollabPathway from './_components/CollabPathway'
import CollabCategoryGrid from './_components/CollabCategoryGrid'

export default function Collaborations() {
  return (
    <div>
      <Banner
        title="Collaborations"
        imageUrl="/collaborations.svg"
        imageAlt="Collaboration Banner"
      />

      <CollabIntro />
      <CollabPathway />
      <CollabCategoryGrid />
    </div>
  )
}
