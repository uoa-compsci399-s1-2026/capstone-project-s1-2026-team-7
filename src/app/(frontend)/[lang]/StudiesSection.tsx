import React from 'react'
import MainButton from './MainButton'

export const StudiesSection = () => {
  return (
    <section className="bg-[#f8f8f8] px-6 pt-28 pb-20 md:px-12 md:pt-32 xl:px-20">
      <div className="mx-auto max-w-7xl">
        {/* Top stats */}
        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
          <div className="border-b border-dotted border-gray-400 pb-8 md:border-b-0 md:border-r md:pb-0">
            <h2 className="text-5xl font-semibold text-black md:text-6xl">1000+</h2>
            <p className="mx-auto mt-4 max-w-xs text-xl leading-snug text-black">
              Participants involved in HNU studies
            </p>
          </div>

          <div className="border-b border-dotted border-gray-400 pb-8 md:border-b-0 md:border-r md:pb-0">
            <h2 className="text-5xl font-semibold text-black md:text-6xl">4+</h2>
            <p className="mx-auto mt-4 max-w-xs text-xl leading-snug text-black">
              Weeks of purpose-built residential study capability
            </p>
          </div>

          <div>
            <h2 className="text-5xl font-semibold text-black md:text-6xl">1</h2>
            <p className="mx-auto mt-4 max-w-xs text-xl leading-snug text-black">
              New Zealand’s only long-stay nutrition research facility
            </p>
          </div>
        </div>

        {/* Main content */}
        <div className="mt-24 text-center">
          <h2 className="text-4xl font-bold text-[#08084f] md:text-6xl">Participate in a Study</h2>

          <p className="mx-auto mt-6 max-w-6xl text-lg leading-relaxed text-[#08084f] md:text-2xl">
            Join world-leading nutrition research at the Human Nutrition Unit Australasia’s only
            residential nutrition trial facility. Participants help researchers understand how food
            affects metabolism, health, and wellbeing.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-4 [&_button]:h-[34px] [&_button]:w-[180px] [&_button]:py-0 sm:[&_button]:h-[40px] sm:[&_button]:w-[150px] lg:[&_button]:h-[46px] lg:[&_button]:w-[170px]">
            <MainButton title="Check Eligibility" variant="primary" />
            <MainButton title="Current Studies" variant="grey" />
            <MainButton title="Register Interest" variant="grey" />
          </div>
        </div>

        {/* Feature cards */}
        <div className="mt-[72px] grid grid-cols-1 gap-6 sm:grid-cols-3 md:gap-5 lg:gap-8 max-[346px]:gap-4">
          <div className="min-h-[140px] rounded-[20px] bg-[#dbe1f0] px-6 py-5 text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-lg lg:rounded-[24px] lg:px-8 lg:py-7 max-[346px]:min-h-[126px] max-[346px]:rounded-[16px] max-[346px]:px-4 max-[346px]:py-4">
            <h3 className="text-xl font-bold text-black lg:text-2xl max-[346px]:text-lg">
              Residential Studies
            </h3>
            <p className="mt-3 text-base leading-relaxed text-black lg:mt-4 lg:text-xl max-[346px]:text-sm">
              Purpose-built long-stay rooms for 4+ week controlled nutrition trials.
            </p>
          </div>

          <div className="min-h-[140px] rounded-[20px] bg-[#dbe1f0] px-6 py-5 text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-lg lg:rounded-[24px] lg:px-8 lg:py-7 max-[346px]:min-h-[126px] max-[346px]:rounded-[16px] max-[346px]:px-4 max-[346px]:py-4">
            <h3 className="text-xl font-bold text-black lg:text-2xl max-[346px]:text-lg">
              Metabolic Facilities
            </h3>
            <p className="mt-3 text-base leading-relaxed text-black lg:mt-4 lg:text-xl max-[346px]:text-sm">
              Indirect calorimetry suites and full metabolic kitchens for precise measurements.
            </p>
          </div>

          <div className="min-h-[140px] rounded-[20px] bg-[#dbe1f0] px-6 py-5 text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-lg lg:rounded-[24px] lg:px-8 lg:py-7 max-[346px]:min-h-[126px] max-[346px]:rounded-[16px] max-[346px]:px-4 max-[346px]:py-4">
            <h3 className="text-xl font-bold text-black lg:text-2xl max-[346px]:text-lg">
              Controlled Diet
            </h3>
            <p className="mt-3 text-base leading-relaxed text-black lg:mt-4 lg:text-xl max-[346px]:text-sm">
              Complete diet control with commercial-grade kitchens and duplicate diet capability.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
