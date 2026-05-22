import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export default function MakeDonationBlock() {
  return (
    <section className="w-full bg-[#F3F3F3] px-4 py-10 md:px-8 lg:px-12">
      <div className="relative mx-auto flex max-w-6xl flex-col items-center justify-between overflow-hidden rounded-3xl bg-[#242B73] px-8 py-8 md:flex-row md:px-12 md:py-10">
        {/* Background image */}
        <Image
          src="/donation-bg.png"
          alt="Nutrition science background"
          fill
          className="object-cover opacity-20 mix-blend-screen"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#242B73]/80" />

        {/* Content */}
        <div className="relative z-10 max-w-sm">
          <h2 className="text-3xl font-bold leading-tight text-white">
            Support the Future of Nutrition Science
          </h2>
        </div>

        <div className="relative z-10 mt-6 max-w-md md:mt-0">
          <p className="text-sm leading-relaxed text-white/90 md:text-base">
            Donations help us advance life-changing research and train the next generation of
            nutrition scientists
          </p>
        </div>

        {/* CTA */}
        <div className="relative z-10 mt-8 md:mt-0">
          <button className="ml-5 flex items-center justify-center gap-3 rounded-full bg-[#2F46FF] w-60 h-10 text-lg font-medium text-white transition hover:bg-[#3D52FF]">
            Make a Donation
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
