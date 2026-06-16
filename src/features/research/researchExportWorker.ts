import { getPayloadClient } from '@/lib/payload'
import { getResearchExportCsv } from '@/features/research/orcid/exportResearchCsv'
import { storeResearchCsvInS3 } from '@/lib/researchCsvStorage'

export type WorkerResult =
  | { processed: false; reason: string; jobId?: number; error?: string }
  | { processed: true; jobId: number; filename: string; rowCount: number }

function getToday(): string {
  return new Date().toISOString().slice(0, 10)
}

export async function runResearchExportWorker(): Promise<WorkerResult> {
  const payload = await getPayloadClient()

  const pending = await payload.find({
    collection: 'research-exports',
    where: { status: { equals: 'pending' } },
    sort: 'requestedAt',
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })

  if (pending.docs.length === 0) {
    return { processed: false, reason: 'no pending jobs' }
  }

  const job = pending.docs[0]

  try {
    await payload.update({
      collection: 'research-exports',
      id: job.id,
      data: {
        status: 'processing',
        startedAt: new Date().toISOString(),
      },
      depth: 0,
      overrideAccess: true,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error(`Failed to claim research export job ${job.id}:`, error)
    return {
      processed: false,
      jobId: job.id,
      reason: 'failed to claim job',
      error: message,
    }
  }

  try {
    const { csv, rows } = await getResearchExportCsv()
    const today = getToday()
    const filename = `research-export-${today}-job${job.id}.csv`
    const stored = await storeResearchCsvInS3({
      content: csv,
      filename,
      kind: 'exports',
    })

    await payload.update({
      collection: 'research-exports',
      id: job.id,
      data: {
        status: 'done',
        completedAt: new Date().toISOString(),
        filename,
        rowCount: rows.length,
        s3Bucket: stored.bucket,
        s3Key: stored.key,
      },
      depth: 0,
      overrideAccess: true,
    })

    return { processed: true, jobId: job.id, filename, rowCount: rows.length }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error(`Research export job ${job.id} failed:`, error)

    await payload
      .update({
        collection: 'research-exports',
        id: job.id,
        data: {
          status: 'failed',
          completedAt: new Date().toISOString(),
          errorMessage: message,
        },
        depth: 0,
        overrideAccess: true,
      })
      .catch((updateError) => {
        console.error(`Also failed to mark job ${job.id} as failed:`, updateError)
      })

    return { processed: false, jobId: job.id, reason: 'job failed', error: message }
  }
}
