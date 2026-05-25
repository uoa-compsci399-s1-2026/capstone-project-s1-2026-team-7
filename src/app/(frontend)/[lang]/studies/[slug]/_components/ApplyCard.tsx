import Link from 'next/link'

type ApplyCardProps = {
  eyebrow: string
  heading: string
  buttonLabel: string
  helperText: string
  surveyUrl: string
}

export default function ApplyCard({
  eyebrow,
  heading,
  buttonLabel,
  helperText,
  surveyUrl,
}: ApplyCardProps) {
  return (
    <div className="rounded-2xl bg-[#05083D] p-6 text-white">
      <p className="text-xs font-semibold uppercase tracking-wider text-[#7C8DFF]">{eyebrow}</p>

      <h3 className="mt-2 text-lg font-bold">{heading}</h3>

      <Link
        href={surveyUrl || '#'}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center justify-center rounded-full bg-[#2448FF] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#355CFF]"
      >
        {buttonLabel} →
      </Link>

      <p className="mt-4 text-xs leading-relaxed text-white/70">{helperText}</p>
    </div>
  )
}
