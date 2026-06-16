import { getPayloadClient } from '@/lib/payload'
import { excludeResearchAndDelete } from '@/features/research/exclusions'

export const dynamic = 'force-dynamic'

type RequestBody = {
  id?: string | number
  reason?: string
}

async function readBody(request: Request): Promise<RequestBody> {
  const body = await request.json().catch(() => ({}))

  return body && typeof body === 'object' && !Array.isArray(body) ? (body as RequestBody) : {}
}

export async function POST(request: Request) {
  const payload = await getPayloadClient()

  const auth = await (payload as any).auth({ headers: request.headers }).catch(() => null)

  if (!auth?.user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await readBody(request)
  const researchId = body.id

  if (typeof researchId !== 'string' && typeof researchId !== 'number') {
    return Response.json({ error: 'Missing research record ID.' }, { status: 400 })
  }

  try {
    const result = await excludeResearchAndDelete({
      researchId,
      reason: typeof body.reason === 'string' ? body.reason : undefined,
      req: {
        payload,
        user: auth.user,
      } as any,
    })

    return Response.json({
      ok: true,
      ...result,
    })
  } catch (error) {
    console.error('Failed to exclude research from ORCID sync:', error)

    return Response.json(
      {
        error: error instanceof Error ? error.message : 'Failed to exclude research record.',
      },
      { status: 500 },
    )
  }
}
