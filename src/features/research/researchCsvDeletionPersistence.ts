import { getPayloadClient } from '@/lib/payload'
import type { Research } from '@/payload-types'
import type { Where } from 'payload'

type CsvIdentityInput = {
  title?: string | null
  doi?: string | null
  url?: string | null
  link?: string | null
  publicationDate?: string | null
  date?: string | null
}

type ResearchDocForCsvDeletion = Pick<
  Research,
  'id' | 'title' | 'doi' | 'link' | 'date' | 'csvDeleted'
>

export type CsvResearchIdentity = {
  doi: string
  fallbackKey: string
}

export type CsvDeletedResearchIdentities = {
  dois: Set<string>
  fallbackKeys: Set<string>
}

function normalizeText(value: string | null | undefined): string {
  return (value ?? '').trim().replace(/\s+/g, ' ').toLowerCase()
}

export function normalizeCsvDoi(value: string | null | undefined): string {
  if (!value) return ''

  return value
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\/(dx\.)?doi\.org\//, '')
    .replace(/^doi:/, '')
}

export function buildCsvResearchIdentity(input: CsvIdentityInput): CsvResearchIdentity {
  const title = normalizeText(input.title)
  const url = normalizeText(input.url ?? input.link)
  const date = normalizeText(input.publicationDate ?? input.date)

  return {
    doi: normalizeCsvDoi(input.doi),
    fallbackKey: `${title}|${url}|${date}`,
  }
}

function isSameCsvIdentity(
  candidate: CsvResearchIdentity,
  activeIdentities: CsvDeletedResearchIdentities,
): boolean {
  if (candidate.doi) {
    return activeIdentities.dois.has(candidate.doi)
  }

  return (
    Boolean(candidate.fallbackKey.replace(/\|/g, '').trim()) &&
    activeIdentities.fallbackKeys.has(candidate.fallbackKey)
  )
}

async function getAllResearchDocs(where?: Where): Promise<ResearchDocForCsvDeletion[]> {
  const payload = await getPayloadClient()
  const docs: ResearchDocForCsvDeletion[] = []
  let page = 1

  while (true) {
    const result = await payload.find({
      collection: 'research',
      where,
      depth: 0,
      limit: 100,
      page,
      overrideAccess: true,
    })

    docs.push(...(result.docs as ResearchDocForCsvDeletion[]))

    if (!result.hasNextPage) break
    page += 1
  }

  return docs
}

export async function getCsvDeletedResearchIdentities(): Promise<CsvDeletedResearchIdentities> {
  const deletedDocs = await getAllResearchDocs({
    csvDeleted: {
      equals: true,
    },
  })

  const dois = new Set<string>()
  const fallbackKeys = new Set<string>()

  for (const doc of deletedDocs) {
    const identity = buildCsvResearchIdentity({
      title: doc.title,
      doi: doc.doi,
      link: doc.link,
      date: doc.date,
    })

    if (identity.doi) {
      dois.add(identity.doi)
    } else if (identity.fallbackKey.replace(/\|/g, '').trim()) {
      fallbackKeys.add(identity.fallbackKey)
    }
  }

  return { dois, fallbackKeys }
}

export async function markMissingResearchAsCsvDeleted({
  activeIdentities,
  onDelete,
}: {
  activeIdentities: CsvDeletedResearchIdentities
  onDelete?: (event: { index: number; total: number; title: string }) => void
}): Promise<number> {
  const payload = await getPayloadClient()
  const activeDocs = await getAllResearchDocs({
    csvDeleted: {
      not_equals: true,
    },
  })

  const docsToDelete = activeDocs.filter((doc) => {
    const identity = buildCsvResearchIdentity({
      title: doc.title,
      doi: doc.doi,
      link: doc.link,
      date: doc.date,
    })

    return !isSameCsvIdentity(identity, activeIdentities)
  })

  for (const [index, doc] of docsToDelete.entries()) {
    await payload.update({
      collection: 'research',
      id: doc.id,
      data: {
        csvDeleted: true,
        csvDeletedAt: new Date().toISOString(),
      },
      overrideAccess: true,
    })

    onDelete?.({
      index: index + 1,
      total: docsToDelete.length,
      title: doc.title || `Research record ${doc.id}`,
    })
  }

  return docsToDelete.length
}
