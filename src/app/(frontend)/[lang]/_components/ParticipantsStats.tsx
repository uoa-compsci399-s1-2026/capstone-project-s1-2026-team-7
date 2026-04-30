export default function ParticipantsStats() {
  return (
    <section className="w-full bg-[#F3F4FF] px-6 py-20 md:px-12 md:py-24 xl:px-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 text-center sm:grid-cols-3">
        <div className="flex flex-col items-center border-b border-dotted border-gray-500 px-4 py-8 sm:border-r sm:border-b-0 sm:px-8 sm:py-0 md:px-12">
          <h2 className="text-5xl font-semibold text-black md:text-6xl lg:text-7xl">1000+</h2>

          <p className="mx-auto mt-5 max-w-xs text-lg leading-snug text-black md:text-xl lg:text-2xl">
            Participants involved in HNU studies
          </p>
        </div>

        <div className="flex flex-col items-center border-b border-dotted border-gray-500 px-4 py-8 sm:border-r sm:border-b-0 sm:px-8 sm:py-0 md:px-12">
          <h2 className="text-5xl font-semibold text-black md:text-6xl lg:text-7xl">4+</h2>

          <p className="mx-auto mt-5 max-w-md text-lg leading-snug text-black md:text-xl lg:text-2xl">
            Weeks of purpose-built residential study capability
          </p>
        </div>

        <div className="flex flex-col items-center px-4 py-8 sm:px-8 sm:py-0 md:px-12">
          <h2 className="text-5xl font-semibold text-black md:text-6xl lg:text-7xl">1</h2>

          <p className="mx-auto mt-5 max-w-md text-lg leading-snug text-black md:text-xl lg:text-2xl">
            New Zealand’s only long-stay nutrition research facility
          </p>
        </div>
      </div>
    </section>
  )
}
