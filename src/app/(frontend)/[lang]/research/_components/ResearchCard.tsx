import { ResearchDTO } from '@/features/research'
import { ArrowUpRight, CalendarDays, FileText, Tags } from 'lucide-react'

type UnknownRelation =
  | string
  | number
  | {
      id?: string | number
      title?: string | null
      name?: string | null
      fullName?: string | null
      displayName?: string | null
      slug?: string | null
    }

type ResearchCardItem = ResearchDTO & {
  doi?: string | null
  link?: string | null
  date?: string | null
  categories?: UnknownRelation[] | null
}

type Props = {
  item: ResearchDTO
}

function getRelationLabel(relation: UnknownRelation) {
  if (typeof relation === 'string' || typeof relation === 'number') {
    return String(relation)
  }

  return (
    relation.title ||
    relation.name ||
    relation.fullName ||
    relation.displayName ||
    relation.slug ||
    ''
  )
}

export default function ResearchCard({ item }: Props) {
  const research = item as ResearchCardItem

  const categories = Array.isArray(research.categories)
    ? research.categories.map(getRelationLabel).filter(Boolean)
    : []

  const href = research.link || '#'

  return (
    <article className="group rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-900/10">
      <div className="rounded-3xl p-5 md:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 flex-1">
            {categories.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2" aria-label="Categories">
                {categories.slice(0, 4).map((category) => (
                  <span
                    key={category}
                    className="rounded-full bg-[#090936]/10 px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-[#090936]"
                  >
                    {category}
                  </span>
                ))}
              </div>
            )}

            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-[#090936]/20"
            >
              <h3 className="max-w-4xl text-base font-semibold leading-7 text-slate-900 transition group-hover:text-[#090936] md:text-lg">
                {research.title}
              </h3>
            </a>

            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
              {research.date && (
                <p className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
                  <span>{research.date}</span>
                </p>
              )}

              {research.doi && (
                <p className="flex min-w-0 items-start gap-2 break-all">
                  <FileText className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
                  <span>DOI: {research.doi}</span>
                </p>
              )}

              {categories.length === 0 && (
                <p className="flex items-center gap-2">
                  <Tags className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
                  <span>Uncategorised publication</span>
                </p>
              )}
            </div>
          </div>

          {href !== '#' && (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-black text-[#090936] transition hover:bg-[#090936] hover:text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-[#090936]/20"
            >
              View publication
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
