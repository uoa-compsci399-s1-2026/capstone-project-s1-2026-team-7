import { getPayloadClient } from '@/lib/payload'
import { restoreExcludedResearch } from '@/features/research/exclusions'

export const dynamic = 'force-dynamic'

type RequestBody = {
  id?: string | number
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
  const exclusionId = body.id

  if (typeof exclusionId !== 'string' && typeof exclusionId !== 'number') {
    return Response.json({ error: 'Missing excluded research record ID.' }, { status: 400 })
  }

  try {
    const result = await restoreExcludedResearch({
      exclusionId,
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
    console.error('Failed to restore excluded research:', error)

    return Response.json(
      {
        error: error instanceof Error ? error.message : 'Failed to restore excluded research.',
      },
      { status: 500 },
    )
  }
}
