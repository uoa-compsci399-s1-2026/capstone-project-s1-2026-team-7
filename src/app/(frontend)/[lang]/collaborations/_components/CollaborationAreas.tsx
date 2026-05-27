'use client'

export type CollaborationArea = {
  items: {
    title: string
    description: string
  }[]
}

export default function CollaborationAreas({ items }: CollaborationArea) {
  return (
    <section className="w-full bg-[#F5F9FF] py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-[#003366] text-center">Collaboration Areas</h2>

        <div className="mt-12 grid md:grid-cols-2 gap-10">
          {items.map((item) => (
            <div
              key={item.title}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
            >
              <h3 className="text-xl font-semibold text-[#003366]">{item.title}</h3>
              <p className="mt-3 text-gray-700 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
