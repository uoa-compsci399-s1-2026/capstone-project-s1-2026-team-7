import React from 'react'
import MainButton from './MainButton'

export const StudiesSection = () => {
  return (
    <section className="bg-[#f8f8f8] px-6 pt-28 pb-20 md:px-12 md:pt-32 xl:px-20">
      <div className="mx-auto max-w-7xl">
        {/* Top stats */}
        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
          <div className="md:border-r md:border-dotted md:border-gray-400">
            <h2 className="text-5xl font-semibold text-black md:text-6xl">1000+</h2>
            <p className="mx-auto mt-4 max-w-xs text-xl leading-snug text-black">
              Participants involved in HNU studies
            </p>
          </div>

          <div className="md:border-r md:border-dotted md:border-gray-400">
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

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <MainButton title="Check Eligibility" variant="primary" />
            <MainButton title="Current Studies" variant="grey" />
            <MainButton title="Register Interest" variant="grey" />
          </div>
        </div>

        {/* Feature cards */}
        <div className="mt-18 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="rounded-[24px] bg-[#dbe1f0] px-8 py-7 text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
            <h3 className="text-2xl font-semibold text-black">Residential Studies</h3>
            <p className="mt-4 text-xl leading-relaxed text-black">
              Purpose-built long-stay rooms for 4+ week controlled nutrition trials.
            </p>
          </div>

          <div className="rounded-[24px] bg-[#dbe1f0] px-8 py-7 text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
            <h3 className="text-2xl font-semibold text-black">Metabolic Facilities</h3>
            <p className="mt-4 text-xl leading-relaxed text-black">
              Indirect calorimetry suites and full metabolic kitchens for precise measurements.
            </p>
          </div>

          <div className="rounded-[24px] bg-[#dbe1f0] px-8 py-7 text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
            <h3 className="text-2xl font-semibold text-black">Controlled Diet</h3>
            <p className="mt-4 text-xl leading-relaxed text-black">
              Complete diet control with commercial-grade kitchens and duplicate diet capability.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
