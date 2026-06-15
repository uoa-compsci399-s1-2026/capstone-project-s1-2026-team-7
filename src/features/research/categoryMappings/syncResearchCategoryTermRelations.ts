type RelationshipId = string | number

type RelationshipDoc = {
  id?: RelationshipId | null
}

type PayloadReq = {
  payload: any
}

const RESEARCH_CATEGORIES_COLLECTION = 'research-categories' as const
const RESEARCH_CATEGORY_TERMS_COLLECTION = 'research-category-terms' as const

function isRelationshipId(value: unknown): value is RelationshipId {
  return typeof value === 'string' || typeof value === 'number'
}

function getIdFromRelationshipValue(value: unknown): RelationshipId | null {
  if (isRelationshipId(value)) return value

  if (value && typeof value === 'object') {
    const maybeDoc = value as RelationshipDoc
    if (isRelationshipId(maybeDoc.id)) return maybeDoc.id
  }

  return null
}

function relationshipIdKey(id: RelationshipId): string {
  return String(id)
}

export function getRelationshipId(value: unknown): RelationshipId | null {
  return getIdFromRelationshipValue(value)
}

export function getRelationshipIds(value: unknown): RelationshipId[] {
  const values = Array.isArray(value) ? value : value === undefined || value === null ? [] : [value]
  const ids: RelationshipId[] = []
  const seen = new Set<string>()

  for (const item of values) {
    const id = getIdFromRelationshipValue(item)
    if (id === null) continue

    const key = relationshipIdKey(id)
    if (seen.has(key)) continue

    seen.add(key)
    ids.push(id)
  }

  return ids
}

async function getResearchCategory(
  req: PayloadReq,
  categoryId: RelationshipId,
): Promise<any | null> {
  try {
    return await req.payload.findByID({
      collection: RESEARCH_CATEGORIES_COLLECTION as any,
      id: categoryId,
      depth: 0,
      overrideAccess: true,
      req,
    })
  } catch {
    return null
  }
}

async function getResearchCategoryTerm(
  req: PayloadReq,
  termId: RelationshipId,
): Promise<any | null> {
  try {
    return await req.payload.findByID({
      collection: RESEARCH_CATEGORY_TERMS_COLLECTION as any,
      id: termId,
      depth: 0,
      overrideAccess: true,
      req,
    })
  } catch {
    return null
  }
}

async function updateCategoryMappedTerms(
  req: PayloadReq,
  categoryId: RelationshipId,
  mappedTermIds: RelationshipId[],
): Promise<void> {
  await req.payload.update({
    collection: RESEARCH_CATEGORIES_COLLECTION as any,
    id: categoryId,
    data: { mappedTerms: mappedTermIds },
    depth: 0,
    overrideAccess: true,
    req,
    context: {
      skipCategoryToTermSync: true,
      skipKeywordSync: true,
    },
  })
}

export async function addTermToCategoryMappedTerms(
  req: PayloadReq,
  categoryId: RelationshipId | null,
  termId: RelationshipId,
): Promise<void> {
  if (categoryId === null) return

  const category = await getResearchCategory(req, categoryId)
  if (!category) return

  const current = getRelationshipIds(category.mappedTerms)
  const termKey = relationshipIdKey(termId)

  if (current.some((id) => relationshipIdKey(id) === termKey)) return

  await updateCategoryMappedTerms(req, categoryId, [...current, termId])
}

export async function removeTermFromCategoryMappedTerms(
  req: PayloadReq,
  categoryId: RelationshipId | null,
  termId: RelationshipId,
): Promise<void> {
  if (categoryId === null) return

  const category = await getResearchCategory(req, categoryId)
  if (!category) return

  const termKey = relationshipIdKey(termId)
  const current = getRelationshipIds(category.mappedTerms)
  const next = current.filter((id) => relationshipIdKey(id) !== termKey)

  if (next.length === current.length) return

  await updateCategoryMappedTerms(req, categoryId, next)
}

async function findTermsMappedToCategory(
  req: PayloadReq,
  categoryId: RelationshipId,
): Promise<any[]> {
  const result = await req.payload.find({
    collection: RESEARCH_CATEGORY_TERMS_COLLECTION as any,
    where: {
      mappedCategory: { equals: categoryId },
    },
    limit: 0,
    depth: 0,
    overrideAccess: true,
    req,
  })

  return result.docs ?? []
}

export async function syncResearchCategoryTermsForCategory(
  req: PayloadReq,
  categoryId: RelationshipId,
  selectedTermIds: RelationshipId[],
): Promise<void> {
  const selectedKeys = new Set(selectedTermIds.map(relationshipIdKey))
  const existingMappedTerms = await findTermsMappedToCategory(req, categoryId)

  for (const termId of selectedTermIds) {
    const term = await getResearchCategoryTerm(req, termId)
    if (!term) continue

    const previousCategoryId = getRelationshipId(term.mappedCategory)

    if (
      previousCategoryId !== null &&
      relationshipIdKey(previousCategoryId) !== relationshipIdKey(categoryId)
    ) {
      await removeTermFromCategoryMappedTerms(req, previousCategoryId, termId)
    }

    if (
      previousCategoryId !== null &&
      relationshipIdKey(previousCategoryId) === relationshipIdKey(categoryId) &&
      term.status === 'mapped'
    ) {
      continue
    }

    await req.payload.update({
      collection: RESEARCH_CATEGORY_TERMS_COLLECTION as any,
      id: termId,
      data: {
        mappedCategory: categoryId,
        status: 'mapped',
      },
      depth: 0,
      overrideAccess: true,
      req,
      context: {
        skipTermToCategorySync: true,
      },
    })
  }

  for (const term of existingMappedTerms) {
    const termId = term.id as RelationshipId

    if (selectedKeys.has(relationshipIdKey(termId))) continue

    await req.payload.update({
      collection: RESEARCH_CATEGORY_TERMS_COLLECTION as any,
      id: termId,
      data: {
        mappedCategory: null,
        status: 'unmapped',
      },
      depth: 0,
      overrideAccess: true,
      req,
      context: {
        skipTermToCategorySync: true,
      },
    })
  }
}

export async function syncResearchCategoryTermBackToCategories(
  req: PayloadReq,
  termId: RelationshipId,
  previousCategoryId: RelationshipId | null,
  nextCategoryId: RelationshipId | null,
): Promise<void> {
  const previousKey = previousCategoryId === null ? null : relationshipIdKey(previousCategoryId)
  const nextKey = nextCategoryId === null ? null : relationshipIdKey(nextCategoryId)

  if (previousKey && previousKey !== nextKey) {
    await removeTermFromCategoryMappedTerms(req, previousCategoryId, termId)
  }

  if (nextKey) {
    await addTermToCategoryMappedTerms(req, nextCategoryId, termId)
  }
}
