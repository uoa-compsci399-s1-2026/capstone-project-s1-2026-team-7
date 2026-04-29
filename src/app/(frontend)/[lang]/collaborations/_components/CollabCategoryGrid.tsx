import CollabCategoryCard from './CollabCategoryCard'

export default function CollabCategoryGrid() {
  return (
    <section className="max-w-screen-lg mx-auto px-4 mt-12">
      <h3 className="text-2xl font-bold mb-6">Explore our:</h3>

      <div className="flex flex-wrap gap-6 justify-center">
        <CollabCategoryCard
          title="Academic"
          imageUrl="/Academic.svg"
          imageAlt="Academic Category"
        />
        <CollabCategoryCard
          title="Industry"
          imageUrl="/Industry.svg"
          imageAlt="Industry Category"
        />
        <CollabCategoryCard title="Funding" imageUrl="/Funding.svg" imageAlt="Funding Category" />
      </div>
    </section>
  )
}
