export default function ParticipantsStats() {
  return (
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
  )
}
