import type { Endpoint, PayloadRequest } from 'payload'
import { excludeResearchAndDelete } from '@/features/research/exclusions'

function unauthorizedResponse(): Response {
  return Response.json({ error: 'Unauthorized' }, { status: 401 })
}

function isAuthenticated(req: PayloadRequest): boolean {
  return Boolean(req.user)
}

async function readJsonBody(req: PayloadRequest): Promise<Record<string, unknown>> {
  if (typeof req.json !== 'function') return {}

  const body = await req.json().catch(() => ({}))

  return body && typeof body === 'object' && !Array.isArray(body)
    ? (body as Record<string, unknown>)
    : {}
}

export const researchExcludeFromOrcidSyncEndpoint: Endpoint = {
  path: '/research/exclude-from-orcid-sync',
  method: 'post',
  handler: async (req) => {
    if (!isAuthenticated(req)) {
      return unauthorizedResponse()
    }

    const body = await readJsonBody(req)
    const researchId = body.id

    if (typeof researchId !== 'string' && typeof researchId !== 'number') {
      return Response.json({ error: 'Missing research record ID.' }, { status: 400 })
    }

    try {
      const result = await excludeResearchAndDelete({
        researchId,
        reason: typeof body.reason === 'string' ? body.reason : undefined,
        req,
      })

      return Response.json({
        ok: true,
        ...result,
      })
    } catch (error) {
      return Response.json(
        {
          error: error instanceof Error ? error.message : 'Failed to exclude research record.',
        },
        { status: 500 },
      )
    }
  },
}
