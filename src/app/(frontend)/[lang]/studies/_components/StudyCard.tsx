import Image from 'next/image'
import Link from 'next/link'
import { StudyDTO } from '@/features/studies'

export type StudyCardProps = {
  study: StudyDTO
}

type RichTextNode = {
  text?: unknown
  children?: unknown
}

function isRichTextNode(value: unknown): value is RichTextNode {
  return typeof value === 'object' && value !== null
}

function extractText(node: unknown): string {
  if (!node) return ''

  if (typeof node === 'string') {
    return node
  }

  if (!isRichTextNode(node)) {
    return ''
  }

  if (typeof node.text === 'string') {
    return node.text
  }

  if (Array.isArray(node.children)) {
    return node.children.map(extractText).join('')
  }

  return ''
}

export default function StudyCard({ study }: StudyCardProps) {
  return (
    <Link
      href={`studies/${study.slug}`}
      className="block w-full rounded-2xl border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md md:p-5"
    >
      <div className="flex flex-col gap-4 md:flex-row md:gap-6">
        <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-xl md:h-36 md:w-44">
          <Image
            src={study.banner.url}
            alt={study.banner.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 176px"
          />
        </div>

        <div className="flex flex-1 flex-col">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
              <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
              Open
            </span>
          </div>

          <h3 className="mt-2 text-lg font-bold text-gray-900 md:text-xl">{study.title}</h3>

          {study.subtitle && <p className="text-sm italic text-gray-700">{study.subtitle}</p>}

          <p className="mt-2 line-clamp-2 text-sm text-gray-600">
            {extractText(study.description?.root)}
          </p>

          <div className="mt-4 flex flex-col gap-3 border-t border-gray-100 pt-3 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-8">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">
                  Duration
                </div>
                <div className="text-sm text-gray-900">{study.duration}</div>
              </div>

              <div>
                <div className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">
                  Eligibility
                </div>
                <div className="text-sm text-gray-900">{study.eligibility}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
