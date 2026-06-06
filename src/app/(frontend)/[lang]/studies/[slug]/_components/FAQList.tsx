import type { ComponentProps } from 'react'
import { RichTextRenderer } from '@/lib/richTextRenderer'

type RichTextData = ComponentProps<typeof RichTextRenderer>['data']

type FaqItem = {
  id?: string
  question: string
  answer: RichTextData
}

type FAQListProps = {
  eyebrow: string
  heading: string
  items: FaqItem[]
}

export default function FAQList({ eyebrow, heading, items }: FAQListProps) {
  if (!items || items.length === 0) return null

  return (
    <section>
      <p className="text-xs font-semibold uppercase tracking-wider text-[#2448FF]">{eyebrow}</p>

      <h2 className="mt-2 text-2xl font-bold text-[#05083D] md:text-3xl">{heading}</h2>

      <div className="mt-6 space-y-3">
        {items.map((faq, index) => (
          <details
            key={faq.id ?? index}
            className="group rounded-2xl border border-gray-200 bg-[#F2F4F7] p-5 open:bg-[#D0D6E7]"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-3 text-base font-bold text-[#05083D]">
              <span>{faq.question}</span>
              <span className="text-xl text-[#05083D] transition group-open:rotate-45">+</span>
            </summary>

            <div className="mt-3 leading-relaxed text-gray-700">
              <RichTextRenderer data={faq.answer} />
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}
