'use client'

import Link from 'next/link'

export type ResearchEnquiriesProps = {
  heading: string
  description: string
  buttonLabel: string
  buttonUrl: string
}

export default function ResearchEnquiries({
  heading,
  description,
  buttonLabel,
  buttonUrl,
}: ResearchEnquiriesProps) {
  return (
    <section className="w-full bg-[#F5F9FF] py-20 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-semibold text-[#003366]">{heading}</h2>

        <p className="mt-6 text-gray-700 leading-relaxed">{description}</p>

        <Link
          href={buttonUrl}
          className="inline-block mt-8 bg-[#003366] text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-[#002244] transition"
        >
          {buttonLabel}
        </Link>
      </div>
    </section>
  )
}
