import React from 'react'
import MainButton from './MainButton'

export const StudiesSection = () => {
  return (
    <section className="bg-[#f8f8f8] px-6 pt-18 pb-20 md:px-12 md:pt-32 xl:px-20">
      <div className="mx-auto max-w-5xl">
        {/* Top stats */}
        <div className="mx-auto grid max-w-5xl grid-cols-1 text-center sm:grid-cols-3">
          <div className="flex flex-col items-center border-b border-dotted border-gray-400 px-4 py-6 sm:border-r sm:border-b-0 sm:px-6 sm:py-0 md:px-10">
            <h2 className="text-3xl font-semibold text-black sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
              1000+
            </h2>
            <p className="mx-auto mt-3 max-w-xs text-sm leading-snug text-black sm:text-base md:mt-4 md:text-lg lg:text-xl xl:text-2xl">
              Participants involved in HNU studies
            </p>
          </div>

          <div className="flex flex-col items-center border-b border-dotted border-gray-400 px-4 py-6 sm:border-r sm:border-b-0 sm:px-6 sm:py-0 md:px-10">
            <h2 className="text-3xl font-semibold text-black sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
              4+
            </h2>
            <p className="mx-auto mt-3 max-w-xs text-sm leading-snug text-black sm:text-base md:mt-4 md:text-lg lg:text-xl xl:text-2xl">
              Weeks of purpose-built residential study capability
            </p>
          </div>

          <div className="flex flex-col items-center px-4 py-6 sm:px-6 sm:py-0 md:px-10">
            <h2 className="text-3xl font-semibold text-black sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
              1
            </h2>
            <p className="mx-auto mt-3 max-w-xs text-sm leading-snug text-black sm:text-base md:mt-4 md:text-lg lg:text-xl xl:text-2xl">
              New Zealand’s only long-stay nutrition research facility
            </p>
          </div>
        </div>

        {/* Main content */}
        <div className="mt-14 text-center md:mt-24">
          <h2 className="text-2xl font-bold text-[#08084f] sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
            Participate in a Study
          </h2>

          <p className="mx-auto mt-6 max-w-6xl text-sm leading-relaxed text-[#08084f] sm:text-base md:text-lg lg:text-xl xl:text-2xl">
            Join world-leading nutrition research at the Human Nutrition Unit Australasia’s only
            residential nutrition trial facility. Participants help researchers understand how food
            affects metabolism, health, and wellbeing.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-4 [&_button]:h-10 [&_button]:w-50 [&_button]:py-0 sm:[&_button]:h-10 sm:[&_button]:w-37.5 md:[&_button]:h-12 lg:[&_button]:h-13 lg:[&_button]:w-50">
            <MainButton title="Check Eligibility" variant="primary" />
            <MainButton title="Current Studies" variant="grey" />
            <MainButton title="Register Interest" variant="grey" />
          </div>
        </div>

        {/* Feature cards */}
        <div className="mt-18 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-4 md:gap-5 lg:gap-8 xl:gap-10 max-[346px]:gap-4">
          <div className="h-44 rounded-[20px] bg-[#dbe1f0] px-6 py-5 text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-lg sm:h-58 sm:px-4 sm:py-4 md:h-60 md:px-5 md:py-5 lg:h-64 lg:rounded-3xl lg:px-8 lg:py-7 xl:h-72 xl:px-9 xl:py-8 max-[346px]:h-44 max-[346px]:rounded-2xl max-[346px]:px-4 max-[346px]:py-4">
            <h3 className="text-lg font-bold text-black sm:text-base md:text-lg lg:text-xl xl:text-2xl max-[346px]:text-lg">
              Residential Studies
            </h3>
            <p className="mt-3 text-base leading-relaxed text-black sm:text-base md:text-lg lg:mt-4 lg:text-xl xl:text-2xl max-[346px]:text-base">
              Purpose-built long-stay rooms for 4+ week controlled nutrition trials.
            </p>
          </div>

          <div className="h-44 rounded-[20px] bg-[#dbe1f0] px-6 py-5 text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-lg sm:h-58 sm:px-4 sm:py-4 md:h-60 md:px-5 md:py-5 lg:h-64 lg:rounded-3xl lg:px-8 lg:py-7 xl:h-72 xl:px-9 xl:py-8 max-[346px]:h-44 max-[346px]:rounded-2xl max-[346px]:px-4 max-[346px]:py-4">
            <h3 className="text-lg font-bold text-black sm:text-base md:text-lg lg:text-xl xl:text-2xl max-[346px]:text-lg">
              Metabolic Facilities
            </h3>
            <p className="mt-3 text-base leading-relaxed text-black sm:text-base md:text-lg lg:mt-4 lg:text-xl xl:text-2xl max-[346px]:text-base">
              Indirect calorimetry suites and full metabolic kitchens for precise measurements.
            </p>
          </div>

          <div className="h-44 rounded-[20px] bg-[#dbe1f0] px-6 py-5 text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-lg sm:h-58 sm:px-4 sm:py-4 md:h-60 md:px-5 md:py-5 lg:h-64 lg:rounded-3xl lg:px-8 lg:py-7 xl:h-72 xl:px-9 xl:py-8 max-[346px]:h-44 max-[346px]:rounded-2xl max-[346px]:px-4 max-[346px]:py-4">
            <h3 className="text-lg font-bold text-black sm:text-base md:text-lg lg:text-xl xl:text-2xl max-[346px]:text-lg">
              Controlled Diet
            </h3>
            <p className="mt-3 text-base leading-relaxed text-black sm:text-base md:text-lg lg:mt-4 lg:text-xl xl:text-2xl max-[346px]:text-base">
              Complete diet control with commercial-grade kitchens and duplicate diet capability.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
