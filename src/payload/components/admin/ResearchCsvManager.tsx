/* eslint-disable react-hooks/set-state-in-effect -- this component uses useEffect for initial data fetch + polling, which is appropriate here */
'use client'

import Link from 'next/link'
import React, { FormEvent, useCallback, useEffect, useRef, useState } from 'react'

type ImportResult = {
  totalRows: number
  validRows: number
  uploadedRows: number
  createdRows: number
  updatedRows: number
  skippedRows: number
  failedRows: number
  deletedRows: number
  s3Bucket?: string
  s3Key?: string
}

type ExportJob = {
  id: number
  status: 'pending' | 'processing' | 'done' | 'failed'
  filename?: string | null
  rowCount?: number | null
  requestedAt?: string | null
  startedAt?: string | null
  completedAt?: string | null
  errorMessage?: string | null
}

type StatusMessage = {
  tone: 'error' | 'success'
  text: string
}

type StreamEvent = Record<string, unknown> & {
  type?: string
  result?: unknown
}

const cardStyle: React.CSSProperties = {
  background: '#ffffff',
  border: '1px solid #d9d9e3',
  borderRadius: '12px',
  padding: '1.5rem',
  boxShadow: '0 4px 16px rgba(12, 12, 72, 0.06)',
}

const buttonStyle: React.CSSProperties = {
  background: '#0c0c48',
  border: '1px solid #0c0c48',
  borderRadius: '6px',
  color: '#ffffff',
  cursor: 'pointer',
  fontWeight: 600,
  padding: '0.65rem 1rem',
}

const secondaryButtonStyle: React.CSSProperties = {
  ...buttonStyle,
  background: '#ffffff',
  color: '#0c0c48',
}

const statusColors: Record<ExportJob['status'], { bg: string; fg: string }> = {
  pending: { bg: '#fef3c7', fg: '#92400e' },
  processing: { bg: '#dbeafe', fg: '#1e40af' },
  done: { bg: '#dcfce7', fg: '#166534' },
  failed: { bg: '#fee2e2', fg: '#991b1b' },
}

function parseStreamEvent(line: string): StreamEvent | null {
  try {
    const parsed: unknown = JSON.parse(line)

    if (typeof parsed !== 'object' || parsed === null) {
      return null
    }

    return parsed as StreamEvent
  } catch {
    return null
  }
}

function formatDateTime(value: string | null | undefined): string {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '—'
  return date.toLocaleString()
}

export function ResearchCsvManager() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [importing, setImporting] = useState(false)
  const [exportQueueing, setExportQueueing] = useState(false)
  const [message, setMessage] = useState<StatusMessage | null>(null)
  const [importResult, setImportResult] = useState<ImportResult | null>(null)
  const [lastProgress, setLastProgress] = useState<string | null>(null)
  const [recentExports, setRecentExports] = useState<ExportJob[]>([])
  const pollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const fetchRecentExports = useCallback(async () => {
    try {
      const response = await fetch('/api/research-exports?limit=10&sort=-requestedAt&depth=0', {
        credentials: 'include',
      })
      if (!response.ok) return
      const data = (await response.json()) as { docs?: ExportJob[] }
      setRecentExports(data.docs ?? [])
    } catch {
      // ignore — the next poll tick will retry
    }
  }, [])

  const hasActiveJob = recentExports.some(
    (job) => job.status === 'pending' || job.status === 'processing',
  )

  // Poll while there's a pending/processing job.
  useEffect(() => {
    if (pollTimerRef.current) {
      clearTimeout(pollTimerRef.current)
      pollTimerRef.current = null
    }

    if (!hasActiveJob) return

    pollTimerRef.current = setTimeout(() => {
      void fetchRecentExports()
    }, 5000)

    return () => {
      if (pollTimerRef.current) {
        clearTimeout(pollTimerRef.current)
        pollTimerRef.current = null
      }
    }
  }, [hasActiveJob, recentExports, fetchRecentExports])

  // Initial load.
  useEffect(() => {
    void fetchRecentExports()
  }, [fetchRecentExports])

  async function handleExport() {
    setExportQueueing(true)
    setMessage(null)
    setImportResult(null)

    try {
      const response = await fetch('/api/research-csv/export-start', {
        method: 'POST',
        credentials: 'include',
      })

      if (!response.ok) {
        const error = await response.json().catch(() => null)
        throw new Error(error?.error ?? 'Failed to queue export.')
      }

      const data = (await response.json()) as { jobId?: number }

      setMessage({
        tone: 'success',
        text: `Export queued (job #${data.jobId ?? '?'}). The CSV will appear in Recent exports once the worker finishes. This usually takes 1–5 minutes.`,
      })

      await fetchRecentExports()
    } catch (error) {
      setMessage({
        tone: 'error',
        text: error instanceof Error ? error.message : 'Failed to queue export.',
      })
    } finally {
      setExportQueueing(false)
    }
  }

  async function handleImport(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setImporting(true)
    setMessage(null)
    setImportResult(null)
    setLastProgress(null)

    try {
      const file = fileInputRef.current?.files?.[0]
      if (!file) {
        throw new Error('Choose a CSV file first.')
      }

      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/research-csv/import', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json().catch(() => null)
        throw new Error(error?.error ?? 'CSV import failed.')
      }

      if (!response.body) {
        throw new Error('No response body.')
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      let finalResult: ImportResult | null = null
      let streamError: string | null = null

      const handleEvent = (raw: string) => {
        const line = raw.trim()
        if (!line) return

        const evt = parseStreamEvent(line)
        if (!evt) return

        if (evt.type === 'progress') {
          const suffix = evt.error ? ` — ${String(evt.error)}` : ''
          const text = `${String(evt.status)} row ${String(evt.index)}/${String(evt.total)}: ${String(
            evt.title,
          )}${suffix}`
          setLastProgress(text)
        } else if (evt.type === 'complete') {
          finalResult = evt.result as ImportResult
        } else if (evt.type === 'error') {
          streamError = String(evt.error ?? 'CSV import failed.')
        }
      }

      while (true) {
        const { value, done } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })

        let newlineIndex = buffer.indexOf('\n')
        while (newlineIndex !== -1) {
          handleEvent(buffer.slice(0, newlineIndex))
          buffer = buffer.slice(newlineIndex + 1)
          newlineIndex = buffer.indexOf('\n')
        }
      }

      if (buffer.trim()) handleEvent(buffer)

      if (streamError) throw new Error(streamError)
      if (!finalResult) throw new Error('Import ended without a result.')

      setImportResult(finalResult)
      setMessage({ tone: 'success', text: 'Import complete.' })
    } catch (error) {
      setMessage({
        tone: 'error',
        text: error instanceof Error ? error.message : 'CSV import failed.',
      })
    } finally {
      setImporting(false)
    }
  }

  const exportButtonLabel = exportQueueing
    ? 'Queuing…'
    : hasActiveJob
      ? 'Export running…'
      : 'Export research CSV'

  const disabled = importing || exportQueueing

  return (
    <div style={{ color: '#0c0c48' }}>
      <div style={{ maxWidth: '980px' }}>
        <h1 style={{ fontSize: '2rem', margin: '0 0 0.5rem' }}>Research CSV Import / Export</h1>
        <p style={{ lineHeight: 1.55, marginBottom: '1.5rem', maxWidth: '760px' }}>
          Use this page to manage research publication data in bulk. You can queue a background
          export that collects publications from staff ORCID profiles and writes the CSV to S3, or
          upload a completed CSV to add, update, or persistently delete research records in the CMS.
          Uploaded and exported CSV files are also saved as a backup in secure file storage.
        </p>

        <div
          style={{
            display: 'grid',
            gap: '1rem',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          }}
        >
          <section style={cardStyle}>
            <h2 style={{ marginTop: 0 }}>1. Export CSV</h2>
            <p style={{ lineHeight: 1.5, paddingBottom: '14px' }}>
              Queues a background job that fetches publications from staff ORCID profiles, applies
              OpenAlex term mappings (with title-keyword fallbacks), and stores the CSV in S3. Comes
              back in 1–5 minutes — refresh or wait for the Recent exports list below to flip to{' '}
              <strong>Done</strong>, then click Download.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={handleExport}
                disabled={disabled || hasActiveJob}
                style={buttonStyle}
              >
                {exportButtonLabel}
              </button>
            </div>
          </section>

          <section style={cardStyle}>
            <h2 style={{ marginTop: 0 }}>2. Import CSV</h2>
            <p style={{ lineHeight: 1.5 }}>
              Upload a CSV with columns: title, doi, url, publicationDate, staffIds, and optional
              categories. Rows removed from the CSV are soft-deleted in the CMS and kept out of
              future exports. The uploaded file is stored in S3 before the CMS import runs.
            </p>
            <form onSubmit={handleImport}>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,text/csv"
                disabled={disabled}
                style={{ display: 'block', marginBottom: '1rem' }}
              />

              <button type="submit" disabled={disabled} style={secondaryButtonStyle}>
                {importing ? 'Importing…' : 'Import CSV to CMS'}
              </button>
            </form>

            {(importing || lastProgress) && (
              <div
                style={{
                  marginTop: '1rem',
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                  fontSize: '0.85rem',
                  color: '#0c0c48',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
                title={lastProgress ?? undefined}
              >
                {lastProgress ?? 'Importing… waiting for first row.'}
              </div>
            )}
          </section>
        </div>

        {message && (
          <div
            style={{
              background: message.tone === 'success' ? '#eef8ef' : '#fff0f0',
              border: `1px solid ${message.tone === 'success' ? '#b8dfbe' : '#f0b9b9'}`,
              borderRadius: '8px',
              marginTop: '1.25rem',
              padding: '1rem',
            }}
          >
            {message.text}
          </div>
        )}

        <section style={{ ...cardStyle, marginTop: '1.25rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '0.5rem',
            }}
          >
            <h2 style={{ margin: 0 }}>Recent exports</h2>
            <Link
              href="/admin/collections/research-exports"
              style={{ color: '#0c0c48', fontWeight: 600 }}
            >
              View all
            </Link>
          </div>

          {recentExports.length === 0 ? (
            <p style={{ color: '#6b7280', margin: 0 }}>
              No exports yet. Queue one with the Export research CSV button above.
            </p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>
                  <th style={{ padding: '0.5rem 0.5rem 0.5rem 0' }}>Status</th>
                  <th style={{ padding: '0.5rem' }}>Requested</th>
                  <th style={{ padding: '0.5rem' }}>Completed</th>
                  <th style={{ padding: '0.5rem' }}>Rows</th>
                  <th style={{ padding: '0.5rem 0 0.5rem 0.5rem', textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {recentExports.map((job) => {
                  const palette = statusColors[job.status]
                  return (
                    <tr key={job.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '0.6rem 0.5rem 0.6rem 0' }}>
                        <span
                          style={{
                            background: palette.bg,
                            color: palette.fg,
                            borderRadius: '999px',
                            padding: '0.2rem 0.6rem',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            textTransform: 'capitalize',
                          }}
                        >
                          {job.status}
                        </span>
                      </td>
                      <td style={{ padding: '0.6rem 0.5rem' }}>
                        {formatDateTime(job.requestedAt)}
                      </td>
                      <td style={{ padding: '0.6rem 0.5rem' }}>
                        {formatDateTime(job.completedAt)}
                      </td>
                      <td style={{ padding: '0.6rem 0.5rem' }}>{job.rowCount ?? '—'}</td>
                      <td
                        style={{
                          padding: '0.6rem 0 0.6rem 0.5rem',
                          textAlign: 'right',
                        }}
                      >
                        {job.status === 'done' ? (
                          <a
                            href={`/api/research-csv/export-download?jobId=${job.id}`}
                            style={{ color: '#0c0c48', fontWeight: 600 }}
                          >
                            Download
                          </a>
                        ) : job.status === 'failed' ? (
                          <span title={job.errorMessage ?? undefined} style={{ color: '#991b1b' }}>
                            See error
                          </span>
                        ) : (
                          <span style={{ color: '#6b7280' }}>—</span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </section>

        {importResult && (
          <section style={{ ...cardStyle, marginTop: '1.25rem' }}>
            <h2 style={{ marginTop: 0 }}>Import result</h2>
            <dl
              style={{
                display: 'grid',
                gap: '0.5rem',
                gridTemplateColumns: 'max-content 1fr',
              }}
            >
              <dt>Total CSV rows</dt>
              <dd>{importResult.totalRows}</dd>
              <dt>Valid rows</dt>
              <dd>{importResult.validRows}</dd>
              <dt>Created</dt>
              <dd>{importResult.createdRows}</dd>
              <dt>Updated</dt>
              <dd>{importResult.updatedRows}</dd>
              <dt>Skipped</dt>
              <dd>{importResult.skippedRows}</dd>
              <dt>Failed</dt>
              <dd>{importResult.failedRows}</dd>
              <dt>Deleted</dt>
              <dd>{importResult.deletedRows}</dd>
              {importResult.s3Bucket && (
                <>
                  <dt>S3 bucket</dt>
                  <dd>{importResult.s3Bucket}</dd>
                </>
              )}
              {importResult.s3Key && (
                <>
                  <dt>S3 key</dt>
                  <dd style={{ wordBreak: 'break-all' }}>{importResult.s3Key}</dd>
                </>
              )}
            </dl>

            <Link href="/admin/collections/research" style={{ color: '#0c0c48', fontWeight: 600 }}>
              View Research collection
            </Link>
          </section>
        )}
      </div>
    </div>
  )
}

export default ResearchCsvManager
