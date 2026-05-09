import Link from 'next/link'

type ApplyCardProps = {
  surveyUrl: string
}

export default function ApplyCard({ surveyUrl }: ApplyCardProps) {
  return (
    <div className="rounded-2xl bg-[#05083D] p-6 text-white">
      <p className="text-xs font-semibold uppercase tracking-wider text-[#7C8DFF]">Apply</p>
      <h3 className="mt-2 text-lg font-bold">Check if you&apos;re eligible</h3>
      <Link
        href={surveyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center justify-center rounded-full bg-[#2448FF] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#355CFF]"
      >
        Take eligibility Survey →
      </Link>
      <p className="mt-4 text-xs leading-relaxed text-white/70">
        Survey takes ~5 min. We&apos;ll contact you within 2 working days if you qualify for
        screening.
      </p>
    </div>
  )
}
