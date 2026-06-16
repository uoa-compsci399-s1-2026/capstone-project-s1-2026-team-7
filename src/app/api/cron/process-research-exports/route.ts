import { runResearchExportWorker } from '@/features/research/researchExportWorker'

// Vercel function timeout for this route (in seconds). Max 300 on Vercel Pro.
export const maxDuration = 300

function unauthorized(): Response {
  return Response.json({ error: 'Unauthorized' }, { status: 401 })
}

function isAuthorized(req: Request): boolean {
  const secret = process.env.CRON_SECRET
  if (!secret) return false

  const auth = req.headers.get('authorization')
  return auth === `Bearer ${secret}`
}

export async function GET(req: Request): Promise<Response> {
  if (!isAuthorized(req)) {
    return unauthorized()
  }

  const result = await runResearchExportWorker()
  const status = !result.processed && 'error' in result ? 500 : 200

  return Response.json(result, { status })
}
