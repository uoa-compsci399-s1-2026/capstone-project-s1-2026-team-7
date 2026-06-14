import type { Endpoint, PayloadRequest } from 'payload'
import { uploadResearchCsvContent } from '@/features/research/uploadResearchCsv.query'
import { getResearchExportCsv } from '../../../scripts/exportResearch/run'
import { storeResearchCsvInS3 } from '@/lib/researchCsvStorage'

function unauthorizedResponse(): Response {
  return Response.json({ error: 'Unauthorized' }, { status: 401 })
}

function isAuthenticated(req: PayloadRequest): boolean {
  return Boolean(req.user)
}

function getToday(): string {
  return new Date().toISOString().slice(0, 10)
}

function getUploadedFilename(file: File): string {
  return file.name?.trim() || `research-import-${getToday()}.csv`
}

function isStreamRequest(req: PayloadRequest): boolean {
  return (
    new URL(req.url ?? 'http://localhost', 'http://localhost').searchParams.get('stream') === '1'
  )
}

function getRequestSignal(req: PayloadRequest): AbortSignal | undefined {
  return (req as unknown as Request).signal
}

export const researchCsvExportEndpoint: Endpoint = {
  path: '/research-csv/export',
  method: 'get',
  handler: async (req) => {
    if (!isAuthenticated(req)) {
      return unauthorizedResponse()
    }

    const signal = getRequestSignal(req)

    if (!isStreamRequest(req)) {
      const { csv, rows } = await getResearchExportCsv({ signal })
      const today = getToday()
      const filename = `research-export-${today}.csv`
      const storedCsv = await storeResearchCsvInS3({
        content: csv,
        filename,
        kind: 'exports',
      })

      return new Response(csv, {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="${filename}"`,
          'X-Research-Row-Count': String(rows.length),
          'X-Research-S3-Bucket': storedCsv.bucket,
          'X-Research-S3-Key': storedCsv.key,
        },
      })
    }

    const encoder = new TextEncoder()
    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        const write = (obj: unknown) => {
          try {
            controller.enqueue(encoder.encode(JSON.stringify(obj) + '\n'))
          } catch {}
        }

        ;(async () => {
          try {
            write({
              type: 'progress',
              progress: 0,
              stage: 'staff',
              status: 'Starting export.',
            })

            const { csv, rows } = await getResearchExportCsv({
              signal,
              onProgress: (event) => write({ type: 'progress', ...event }),
            })

            const today = getToday()
            const filename = `research-export-${today}.csv`

            write({
              type: 'progress',
              progress: 96,
              stage: 'storage',
              status: 'Saving CSV backup to S3.',
            })

            const storedCsv = await storeResearchCsvInS3({
              content: csv,
              filename,
              kind: 'exports',
            })

            write({
              type: 'complete',
              progress: 100,
              result: {
                csv,
                filename,
                rowCount: rows.length,
                s3Bucket: storedCsv.bucket,
                s3Key: storedCsv.key,
              },
            })
          } catch (error) {
            write({
              type: signal?.aborted ? 'cancelled' : 'error',
              error:
                error instanceof Error
                  ? error.message
                  : signal?.aborted
                    ? 'Export cancelled.'
                    : 'CSV export failed.',
            })
          } finally {
            try {
              controller.close()
            } catch {}
          }
        })()
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'application/x-ndjson; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        'X-Accel-Buffering': 'no',
        'Content-Encoding': 'identity',
      },
    })
  },
}

export const researchCsvImportEndpoint: Endpoint = {
  path: '/research-csv/import',
  method: 'post',
  handler: async (req) => {
    if (!isAuthenticated(req)) {
      return unauthorizedResponse()
    }

    if (typeof req.formData !== 'function') {
      return Response.json({ error: 'This request must use multipart/form-data.' }, { status: 400 })
    }

    const formData = await req.formData()
    const file = formData.get('file')
    const dryRun = formData.get('dryRun') === 'true'

    if (!file || typeof file === 'string' || typeof file.text !== 'function') {
      return Response.json({ error: 'Please upload a CSV file.' }, { status: 400 })
    }

    const uploadedFile = file as File
    const content = await uploadedFile.text()

    if (!content.trim()) {
      return Response.json({ error: 'The uploaded CSV is empty.' }, { status: 400 })
    }

    const storedCsv = await storeResearchCsvInS3({
      content,
      filename: getUploadedFilename(uploadedFile),
      kind: 'imports',
    })

    const encoder = new TextEncoder()
    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        const write = (obj: unknown) => {
          try {
            controller.enqueue(encoder.encode(JSON.stringify(obj) + '\n'))
          } catch {}
        }

        ;(async () => {
          try {
            const result = await uploadResearchCsvContent(content, {
              dryRun,
              onProgress: (evt) => {
                write({ type: 'progress', ...evt })
              },
            })
            write({
              type: 'complete',
              result: {
                ...result,
                s3Bucket: storedCsv.bucket,
                s3Key: storedCsv.key,
              },
            })
          } catch (error) {
            write({
              type: 'error',
              error: error instanceof Error ? error.message : 'CSV import failed.',
            })
          } finally {
            try {
              controller.close()
            } catch {}
          }
        })()
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'application/x-ndjson; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        'X-Accel-Buffering': 'no',
        'Content-Encoding': 'identity',
      },
    })
  },
}
