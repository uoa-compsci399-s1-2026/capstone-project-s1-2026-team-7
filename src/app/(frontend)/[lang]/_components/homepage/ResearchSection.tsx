import React from 'react'
import CurrentStudies from './CurrentStudies'

export const ResearchSection = () => {
  return (
    <section className="bg-[#f8f8f8] px-6 pt-18 pb-20 md:px-12 md:pt-32 xl:px-20">
      <div className="mx-auto max-w-6xl">
        {/* Main content */}
        <CurrentStudies />
        <div className="mt-20 text-left md:mt-28">
          <h2 className="text-3xl font-bold text-[#08084f] sm:text-4xl md:text-5xl">
            How We Conduct Our Studies
          </h2>

          <p className="mt-6 max-w-6xl text-base leading-relaxed text-[#08084f] sm:text-lg md:text-2xl">
            Join world-leading nutrition research at the Human Nutrition Unit Australasia’s only
            residential nutrition trial facility. Participants help researchers understand how food
            affects metabolism, health, and wellbeing.
          </p>
        </div>

        {/* Feature cards */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-4 md:gap-5 lg:gap-8 xl:gap-10">
          <div className="rounded-[20px] bg-[#dbe1f0] px-6 py-5 text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-lg lg:rounded-3xl lg:px-8 lg:py-7">
            <h3 className="text-lg font-bold text-black lg:text-xl xl:text-2xl">
              Residential Studies
            </h3>
            <p className="mt-3 text-base leading-relaxed text-black lg:mt-4 lg:text-xl">
              Purpose-built long-stay rooms for 4+ week controlled nutrition trials.
            </p>
          </div>

          <div className="rounded-[20px] bg-[#dbe1f0] px-6 py-5 text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-lg lg:rounded-3xl lg:px-8 lg:py-7">
            <h3 className="text-lg font-bold text-black lg:text-xl xl:text-2xl">
              Metabolic Facilities
            </h3>
            <p className="mt-3 text-base leading-relaxed text-black lg:mt-4 lg:text-xl">
              Indirect calorimetry suites and full metabolic kitchens for precise measurements.
            </p>
          </div>

          <div className="rounded-[20px] bg-[#dbe1f0] px-6 py-5 text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-lg lg:rounded-3xl lg:px-8 lg:py-7">
            <h3 className="text-lg font-bold text-black lg:text-xl xl:text-2xl">Controlled Diet</h3>
            <p className="mt-3 text-base leading-relaxed text-black lg:mt-4 lg:text-xl">
              Complete diet control with commercial-grade kitchens and duplicate diet capability.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
