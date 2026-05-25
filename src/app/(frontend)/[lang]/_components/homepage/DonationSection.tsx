import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

function DonationSection() {
  return (
    <section className="w-full bg-white px-6.5 py-16 md:px-8 md:py-24 lg:px-12">
      <div className="mx-auto w-full max-w-300 min-[500px]:max-w-120 sm:max-w-130 md:max-w-300">
        <div className="relative aspect-300/165 w-full overflow-hidden rounded-xl bg-[#08084f] px-5 py-5 md:aspect-1150/160 md:rounded-[18px] md:px-8 md:py-0 lg:px-16">
          <Image
            src="/donation-section.png"
            alt="Donation background"
            fill
            sizes="(max-width: 499px) calc(100vw - 52px), (max-width: 767px) 520px, 1150px"
            className="object-cover object-center opacity-[0.45]"
          />

          <div className="absolute inset-0 bg-[#08084f]/45" />

          <div className="relative z-10 grid h-full w-full min-w-0 grid-cols-1 items-center justify-items-center gap-2.5 text-center text-white md:grid-cols-[0.9fr_1.55fr_auto] md:justify-items-start md:gap-5 md:text-left lg:grid-cols-[1fr_1.45fr_auto] lg:gap-12">
            <h2 className="min-w-0 max-w-75 wrap-break-word text-[16px] leading-tight font-bold sm:max-w-65 sm:text-lg md:max-w-60 md:text-[18px] lg:max-w-85 lg:text-2xl">
              Support the Future of Nutrition Science
            </h2>

            <p className="min-w-0 max-w-97.5 wrap-break-word text-[10px] leading-snug font-light sm:max-w-90 sm:text-xs md:max-w-92.5 md:text-[13px] lg:max-w-117.5 lg:text-base">
              Donations help us advance life-changing research and train the next generation of
              nutrition scientists
            </p>

            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#1F2BD4] px-5 py-2 text-[11px] font-medium text-white transition hover:bg-[#1720b8] md:px-6 md:py-2.5 md:text-xs lg:gap-3 lg:px-8 lg:py-3 lg:text-base">
              Make a Donation
              <ArrowRight className="h-3 w-3 lg:h-4 lg:w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DonationSection
