import type { ComponentProps } from 'react'
import { RichTextRenderer } from '@/lib/richTextRenderer'

type RichTextData = ComponentProps<typeof RichTextRenderer>['data']

type AboutSectionProps = {
  eyebrow: string
  heading: string
  body: RichTextData
}

export default function AboutSection({ eyebrow, heading, body }: AboutSectionProps) {
  return (
    <section>
      <p className="text-xs font-semibold uppercase tracking-wider text-[#2448FF]">{eyebrow}</p>

      <h2 className="mt-2 text-2xl font-bold text-[#05083D] md:text-3xl">{heading}</h2>

      <div className="mt-4 space-y-3 leading-relaxed text-gray-700">
        <RichTextRenderer data={body} />
      </div>
    </section>
  )
}
