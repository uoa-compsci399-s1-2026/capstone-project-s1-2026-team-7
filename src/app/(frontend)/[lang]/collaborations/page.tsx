import Banner from '../_components/Banner'
import CollabIntro from './_components/CollabIntro'
import CollabPathway from './_components/CollabPathway'
import ExploreOur from './_components/ExploreOur'

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
      <ExploreOur />
    </div>
  )
}
