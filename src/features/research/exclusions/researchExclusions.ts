import { getPayloadClient } from '@/lib/payload'
import type { Payload, PayloadRequest, Where } from 'payload'

export type ResearchIdentityInput = {
  title?: string | null
  doi?: string | null
  url?: string | null
  link?: string | null
  publicationDate?: string | null
  date?: string | null
}

export type ResearchSyncIdentity = {
  doi: string
  fallbackKey: string
}

export type ResearchExclusionIdentities = {
  dois: Set<string>
  fallbackKeys: Set<string>
}

type ResearchDocForSync = {
  id: string | number
  title?: string | Record<string, unknown> | null
  doi?: string | null
  link?: string | null
  date?: string | null
  source?: string | null
  csvDeleted?: boolean | null
}

type ResearchExclusionDoc = {
  id: string | number
  title?: string | null
  doi?: string | null
  normalizedDoi?: string | null
  link?: string | null
  publicationDate?: string | null
  fallbackKey?: string | null
  active?: boolean | null
  timesSeen?: number | null
  restoredAt?: string | null
  restoredResearchId?: string | null
}

const RESEARCH_COLLECTION = 'research' as const
const RESEARCH_EXCLUSIONS_COLLECTION = 'research-exclusions' as const
const ORCID_CSV_SOURCE = 'orcid-csv'

function normalizeText(value: string | null | undefined): string {
  return (value ?? '').trim().replace(/\s+/g, ' ').toLowerCase()
}

function getResearchTitle(value: ResearchDocForSync['title']): string {
  if (typeof value === 'string') return value

  if (value && typeof value === 'object') {
    const maybeEnglish = value.en
    if (typeof maybeEnglish === 'string') return maybeEnglish

    const firstStringValue = Object.values(value).find((entry) => typeof entry === 'string')
    if (typeof firstStringValue === 'string') return firstStringValue
  }

  return ''
}

export function normalizeResearchDoi(value: string | null | undefined): string {
  if (!value) return ''

  return value
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\/(dx\.)?doi\.org\//, '')
    .replace(/^doi:/, '')
}

export function buildResearchSyncIdentity(input: ResearchIdentityInput): ResearchSyncIdentity {
  const title = normalizeText(input.title)
  const url = normalizeText(input.url ?? input.link)
  const date = normalizeText(input.publicationDate ?? input.date)

  return {
    doi: normalizeResearchDoi(input.doi),
    fallbackKey: `${title}|${url}|${date}`,
  }
}

export function hasUsableFallbackKey(fallbackKey: string): boolean {
  return Boolean(fallbackKey.replace(/\|/g, '').trim())
}

export function isSameResearchSyncIdentity(
  candidate: ResearchSyncIdentity,
  activeIdentities: ResearchExclusionIdentities,
): boolean {
  if (candidate.doi) {
    return activeIdentities.dois.has(candidate.doi)
  }

  return (
    hasUsableFallbackKey(candidate.fallbackKey) &&
    activeIdentities.fallbackKeys.has(candidate.fallbackKey)
  )
}

async function getPayload(payload?: Payload): Promise<Payload> {
  return payload ?? (await getPayloadClient())
}

async function getAllResearchDocs(payload: Payload, where?: Where): Promise<ResearchDocForSync[]> {
  const docs: ResearchDocForSync[] = []
  let page = 1

  while (true) {
    const result = await payload.find({
      collection: RESEARCH_COLLECTION,
      where,
      depth: 0,
      limit: 100,
      page,
      overrideAccess: true,
    })

    docs.push(...(result.docs as ResearchDocForSync[]))

    if (!result.hasNextPage) break
    page += 1
  }

  return docs
}

async function getAllActiveResearchExclusions(payload: Payload): Promise<ResearchExclusionDoc[]> {
  const docs: ResearchExclusionDoc[] = []
  let page = 1

  while (true) {
    const result = await payload.find({
      collection: RESEARCH_EXCLUSIONS_COLLECTION as any,
      where: {
        active: {
          not_equals: false,
        },
      },
      depth: 0,
      limit: 100,
      page,
      overrideAccess: true,
    })

    docs.push(...(result.docs as ResearchExclusionDoc[]))

    if (!result.hasNextPage) break
    page += 1
  }

  return docs
}

async function getLegacyCsvDeletedResearchDocs(payload: Payload): Promise<ResearchDocForSync[]> {
  return getAllResearchDocs(payload, {
    csvDeleted: {
      equals: true,
    },
  })
}

function addIdentityToSet(
  identity: ResearchSyncIdentity,
  identities: ResearchExclusionIdentities,
): void {
  if (identity.doi) {
    identities.dois.add(identity.doi)
  } else if (hasUsableFallbackKey(identity.fallbackKey)) {
    identities.fallbackKeys.add(identity.fallbackKey)
  }
}

export async function getResearchExclusionIdentities(
  payloadInput?: Payload,
): Promise<ResearchExclusionIdentities> {
  const payload = await getPayload(payloadInput)
  const identities: ResearchExclusionIdentities = {
    dois: new Set(),
    fallbackKeys: new Set(),
  }

  const exclusionDocs = await getAllActiveResearchExclusions(payload)

  for (const doc of exclusionDocs) {
    if (doc.normalizedDoi) {
      identities.dois.add(normalizeResearchDoi(doc.normalizedDoi))
      continue
    }

    if (doc.fallbackKey && hasUsableFallbackKey(doc.fallbackKey)) {
      identities.fallbackKeys.add(doc.fallbackKey)
    }
  }

  // Backwards compatibility for existing records that were previously soft-deleted with csvDeleted.
  const legacyDeletedDocs = await getLegacyCsvDeletedResearchDocs(payload)

  for (const doc of legacyDeletedDocs) {
    addIdentityToSet(
      buildResearchSyncIdentity({
        title: getResearchTitle(doc.title),
        doi: doc.doi,
        link: doc.link,
        date: doc.date,
      }),
      identities,
    )
  }

  return identities
}

async function findExistingResearchExclusion(
  payload: Payload,
  identity: ResearchSyncIdentity,
): Promise<ResearchExclusionDoc | null> {
  if (identity.doi) {
    const result = await payload.find({
      collection: RESEARCH_EXCLUSIONS_COLLECTION as any,
      where: {
        normalizedDoi: {
          equals: identity.doi,
        },
      },
      depth: 0,
      limit: 1,
      overrideAccess: true,
    })

    return (result.docs[0] as ResearchExclusionDoc | undefined) ?? null
  }

  if (!hasUsableFallbackKey(identity.fallbackKey)) return null

  const result = await payload.find({
    collection: RESEARCH_EXCLUSIONS_COLLECTION as any,
    where: {
      fallbackKey: {
        equals: identity.fallbackKey,
      },
    },
    depth: 0,
    limit: 1,
    overrideAccess: true,
  })

  return (result.docs[0] as ResearchExclusionDoc | undefined) ?? null
}

export async function isResearchIdentityExcluded(
  input: ResearchIdentityInput,
  payloadInput?: Payload,
): Promise<boolean> {
  const payload = await getPayload(payloadInput)
  const identities = await getResearchExclusionIdentities(payload)
  const identity = buildResearchSyncIdentity(input)

  return isSameResearchSyncIdentity(identity, identities)
}

export async function createOrUpdateResearchExclusion({
  input,
  payload: payloadInput,
  source = 'manual-exclusion',
  reason,
  removedResearchId,
  req,
}: {
  input: ResearchIdentityInput
  payload?: Payload
  source?: 'manual-exclusion' | 'missing-from-csv' | 'legacy-csv-deleted'
  reason?: string | null
  removedResearchId?: string | number | null
  req?: PayloadRequest
}): Promise<ResearchExclusionDoc> {
  const payload = await getPayload(payloadInput)
  const title = (input.title ?? '').trim()
  const doi = input.doi?.trim() ?? ''
  const link = (input.url ?? input.link ?? '').trim()
  const publicationDate = (input.publicationDate ?? input.date ?? '').trim()
  const identity = buildResearchSyncIdentity({
    title,
    doi,
    link,
    publicationDate,
  })

  if (!identity.doi && !hasUsableFallbackKey(identity.fallbackKey)) {
    throw new Error('Cannot exclude this research record because it has no usable DOI or title.')
  }

  const existing = await findExistingResearchExclusion(payload, identity)
  const data = {
    title: title || 'Untitled research exclusion',
    doi: doi || null,
    normalizedDoi: identity.doi || null,
    link: link || null,
    publicationDate: publicationDate || null,
    fallbackKey: identity.fallbackKey,
    source,
    active: true,
    removedResearchId:
      removedResearchId === undefined || removedResearchId === null
        ? null
        : String(removedResearchId),
    reason: reason?.trim() || null,
    excludedAt: new Date().toISOString(),
    timesSeen: (existing?.timesSeen ?? 0) + 1,
  }

  if (existing) {
    return (await payload.update({
      collection: RESEARCH_EXCLUSIONS_COLLECTION as any,
      id: existing.id,
      data,
      depth: 0,
      overrideAccess: true,
      req,
    })) as ResearchExclusionDoc
  }

  return (await payload.create({
    collection: RESEARCH_EXCLUSIONS_COLLECTION as any,
    data,
    depth: 0,
    overrideAccess: true,
    req,
  })) as ResearchExclusionDoc
}

export async function excludeResearchAndDelete({
  researchId,
  reason,
  req,
}: {
  researchId: string | number
  reason?: string | null
  req: PayloadRequest
}): Promise<{ exclusionId: string | number; removedResearchId: string | number; title: string }> {
  const payload = req.payload
  const doc = (await payload.findByID({
    collection: RESEARCH_COLLECTION,
    id: researchId,
    depth: 0,
    overrideAccess: true,
    req,
  })) as ResearchDocForSync

  if (!doc) {
    throw new Error('Research record not found.')
  }

  const title = getResearchTitle(doc.title)
  const exclusion = await createOrUpdateResearchExclusion({
    input: {
      title,
      doi: doc.doi,
      link: doc.link,
      date: doc.date,
    },
    payload,
    source: 'manual-exclusion',
    reason:
      reason ||
      'Excluded from the Research collection using the admin “Exclude from ORCID sync” action.',
    removedResearchId: doc.id,
    req,
  })

  await payload.delete({
    collection: RESEARCH_COLLECTION,
    id: doc.id,
    overrideAccess: true,
    req,
  })

  return {
    exclusionId: exclusion.id,
    removedResearchId: doc.id,
    title: title || `Research record ${doc.id}`,
  }
}

export async function excludeMissingImportedResearch({
  activeIdentities,
  onExclude,
}: {
  activeIdentities: ResearchExclusionIdentities
  onExclude?: (event: { index: number; total: number; title: string }) => void
}): Promise<number> {
  const payload = await getPayloadClient()

  // Important: only CSV/ORCID-managed records are removed here.
  // Manually added research defaults to source = manual and is not affected by CSV imports.
  const managedDocs = await getAllResearchDocs(payload, {
    source: {
      equals: ORCID_CSV_SOURCE,
    },
  })

  const docsToExclude = managedDocs.filter((doc) => {
    const identity = buildResearchSyncIdentity({
      title: getResearchTitle(doc.title),
      doi: doc.doi,
      link: doc.link,
      date: doc.date,
    })

    return !isSameResearchSyncIdentity(identity, activeIdentities)
  })

  for (const [index, doc] of docsToExclude.entries()) {
    const title = getResearchTitle(doc.title)

    await createOrUpdateResearchExclusion({
      input: {
        title,
        doi: doc.doi,
        link: doc.link,
        date: doc.date,
      },
      payload,
      source: 'missing-from-csv',
      reason: 'This ORCID/CSV-managed research record was missing from the latest imported CSV.',
      removedResearchId: doc.id,
    })

    await payload.delete({
      collection: RESEARCH_COLLECTION,
      id: doc.id,
      overrideAccess: true,
    })

    onExclude?.({
      index: index + 1,
      total: docsToExclude.length,
      title: title || `Research record ${doc.id}`,
    })
  }

  return docsToExclude.length
}

async function findExistingResearchForExclusion(
  payload: Payload,
  exclusion: ResearchExclusionDoc,
): Promise<ResearchDocForSync | null> {
  const normalizedDoi = normalizeResearchDoi(exclusion.normalizedDoi || exclusion.doi)

  if (normalizedDoi) {
    const doiFilters = [
      {
        doi: {
          equals: normalizedDoi,
        },
      },
    ]

    if (exclusion.doi && normalizeResearchDoi(exclusion.doi) !== normalizedDoi) {
      doiFilters.push({
        doi: {
          equals: exclusion.doi,
        },
      })
    }

    const result = await payload.find({
      collection: RESEARCH_COLLECTION,
      where: {
        or: doiFilters,
      },
      depth: 0,
      limit: 1,
      overrideAccess: true,
    })

    return (result.docs[0] as ResearchDocForSync | undefined) ?? null
  }

  const title = exclusion.title?.trim() ?? ''
  if (!title) return null

  const fallbackFilters: Where[] = [
    {
      title: {
        equals: title,
      },
    },
  ]

  if (exclusion.link) {
    fallbackFilters.push({
      link: {
        equals: exclusion.link,
      },
    })
  }

  if (exclusion.publicationDate) {
    fallbackFilters.push({
      date: {
        equals: exclusion.publicationDate,
      },
    })
  }

  const result = await payload.find({
    collection: RESEARCH_COLLECTION,
    where: {
      and: fallbackFilters,
    },
    depth: 0,
    limit: 1,
    overrideAccess: true,
  })

  return (result.docs[0] as ResearchDocForSync | undefined) ?? null
}

export async function restoreExcludedResearch({
  exclusionId,
  req,
}: {
  exclusionId: string | number
  req: PayloadRequest
}): Promise<{
  exclusionId: string | number
  researchId: string | number
  title: string
  restored: boolean
}> {
  const payload = req.payload
  const exclusion = (await payload.findByID({
    collection: RESEARCH_EXCLUSIONS_COLLECTION as any,
    id: exclusionId,
    depth: 0,
    overrideAccess: true,
    req,
  })) as ResearchExclusionDoc

  if (!exclusion) {
    throw new Error('Excluded research record not found.')
  }

  const existingResearch = await findExistingResearchForExclusion(payload, exclusion)
  const title = exclusion.title?.trim() || 'Untitled research'

  if (existingResearch) {
    await payload.delete({
      collection: RESEARCH_EXCLUSIONS_COLLECTION as any,
      id: exclusion.id,
      overrideAccess: true,
      req,
    })

    return {
      exclusionId: exclusion.id,
      researchId: existingResearch.id,
      title,
      restored: false,
    }
  }

  const created = (await payload.create({
    collection: RESEARCH_COLLECTION,
    data: {
      title,
      doi: normalizeResearchDoi(exclusion.doi || exclusion.normalizedDoi) || '',
      link: exclusion.link || '',
      date: exclusion.publicationDate || '',
      source: ORCID_CSV_SOURCE,
      csvDeleted: false,
      csvDeletedAt: null,
    } as any,
    depth: 0,
    overrideAccess: true,
    req,
  })) as ResearchDocForSync

  await payload.delete({
    collection: RESEARCH_EXCLUSIONS_COLLECTION as any,
    id: exclusion.id,
    overrideAccess: true,
    req,
  })

  return {
    exclusionId: exclusion.id,
    researchId: created.id,
    title,
    restored: true,
  }
}
