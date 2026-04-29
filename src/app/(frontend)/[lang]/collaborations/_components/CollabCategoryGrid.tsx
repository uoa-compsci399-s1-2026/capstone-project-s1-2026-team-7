import CollabCategoryCard from './CollabCategoryCard'

export default function CollabCategoryGrid() {
  return (
    <section className="max-w-screen-lg mx-auto mt-12 px-4 sm:px-6 md:px-8">
      <h3 className="text-2xl text-[#0C0C48] font-bold mb-6">Explore our:</h3>

      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-6">
        <CollabCategoryCard
          title="Academic"
          imageUrl="/Academic.svg"
          imageAlt="Academic Category"
          href=""
        />
        <CollabCategoryCard
          title="Industry"
          imageUrl="/Industry.svg"
          imageAlt="Industry Category"
          href=""
        />
        <CollabCategoryCard
          title="Funding"
          imageUrl="/Funding.svg"
          imageAlt="Funding Category"
          href=""
        />
      </div>
    </section>
  )
}
