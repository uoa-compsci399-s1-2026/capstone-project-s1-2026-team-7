'use client'

export type CollaborativeApproachProps = {
  items: {
    title: string
    description: string
  }[]
}

export default function CollaborativeApproach({ items }: CollaborativeApproachProps) {
  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-[#003366] text-center">
          Our Collaborative Approach
        </h2>

        <div className="mt-12 grid md:grid-cols-3 gap-10">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-[#F5F9FF] p-8 rounded-xl shadow-sm border border-gray-100"
            >
              {/* Placeholder icon */}
              <div className="w-12 h-12 bg-gray-300 rounded-full mb-6 mx-auto" />

              <h3 className="text-xl font-semibold text-[#003366] text-center">{item.title}</h3>

              <p className="mt-4 text-gray-700 text-center leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
