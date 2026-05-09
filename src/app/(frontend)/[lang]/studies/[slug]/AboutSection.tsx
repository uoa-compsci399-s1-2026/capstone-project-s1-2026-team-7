import { RichTextRenderer } from '@/lib/richTextRenderer'

type AboutSectionProps = {
  body: any
}

export default function AboutSection({ body }: AboutSectionProps) {
  return (
    <section>
      <p className="text-xs font-semibold uppercase tracking-wider text-[#2448FF]">About</p>
      <h2 className="mt-2 text-2xl font-bold text-[#05083D] md:text-3xl">Why this study matters</h2>
      <div className="mt-4 space-y-3 leading-relaxed text-gray-700">
        <RichTextRenderer data={body} />
      </div>
    </section>
  )
}
