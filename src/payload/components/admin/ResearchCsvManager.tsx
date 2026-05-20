'use client'

import Link from 'next/link'
import React, { FormEvent, useRef, useState } from 'react'

type ImportResult = {
  totalRows: number
  validRows: number
  uploadedRows: number
  createdRows: number
  updatedRows: number
  skippedRows: number
  failedRows: number
  s3Bucket?: string
  s3Key?: string
}

type StatusMessage = {
  tone: 'error' | 'success'
  text: string
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

function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

function getFilenameFromContentDisposition(value: string | null): string {
  const match = value?.match(/filename="?([^";]+)"?/)

  return match?.[1] ?? `research-export-${new Date().toISOString().slice(0, 10)}.csv`
}

export function ResearchCsvManager() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [exporting, setExporting] = useState(false)
  const [importing, setImporting] = useState(false)
  //const [dryRun, setDryRun] = useState(true)
  const [message, setMessage] = useState<StatusMessage | null>(null)
  const [importResult, setImportResult] = useState<ImportResult | null>(null)
  const [exportS3Key, setExportS3Key] = useState<string | null>(null)
  const [lastProgress, setLastProgress] = useState<string | null>(null)

  async function handleExport() {
    setExporting(true)
    setMessage(null)
    setImportResult(null)
    setExportS3Key(null)

    try {
      const response = await fetch('/api/research-csv/export', {
        credentials: 'include',
      })

      if (!response.ok) {
        const error = await response.json().catch(() => null)
        throw new Error(error?.error ?? 'CSV export failed.')
      }

      const rowCount = response.headers.get('X-Research-Row-Count')
      const s3Key = response.headers.get('X-Research-S3-Key')
      const filename = getFilenameFromContentDisposition(
        response.headers.get('Content-Disposition'),
      )
      const blob = await response.blob()

      downloadBlob(blob, filename)
      setExportS3Key(s3Key)
      setMessage({
        tone: 'success',
        text: `Export complete${rowCount ? `: ${rowCount} rows downloaded.` : '.'}`,
      })
    } catch (error) {
      setMessage({
        tone: 'error',
        text: error instanceof Error ? error.message : 'CSV export failed.',
      })
    } finally {
      setExporting(false)
    }
  }

  async function handleImport(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setImporting(true)
    setMessage(null)
    setImportResult(null)
    setExportS3Key(null)
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

        let evt: any
        try {
          evt = JSON.parse(line)
        } catch {
          return
        }

        if (evt.type === 'progress') {
          const suffix = evt.error ? ` — ${evt.error}` : ''
          const text = `${evt.status} row ${evt.index}/${evt.total}: ${evt.title}${suffix}`
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

  const disabled = exporting || importing

  return (
    <main style={{ padding: '2rem', color: '#0c0c48' }}>
      <div style={{ maxWidth: '980px' }}>
        <p style={{ fontSize: '0.9rem', marginBottom: '0.75rem' }}>
          <Link href="/admin" style={{ color: '#0c0c48' }}>
            Admin
          </Link>{' '}
          / Collections / Research CSV Tools
        </p>

        <h1 style={{ fontSize: '2rem', margin: '0 0 0.5rem' }}>Research CSV Import / Export</h1>
        <p
          style={{
            lineHeight: 1.55,
            marginBottom: '1.5rem',
            maxWidth: '760px',
          }}
        >
          Use this page to manage research publication data in bulk. You can export publications
          collected from staff ORCID profiles into a CSV file, or upload a completed CSV to add or
          update research records in the CMS. Uploaded and exported CSV files are also saved as a
          backup in secure file storage.
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
              Generates a fresh CSV using staff ORCID values, stores a copy in S3(Amazon Simple
              Storage Service), and downloads the CSV to your computer. Keep Bedrock disabled unless
              you want automatic category suggestions.
            </p>
            <button type="button" onClick={handleExport} disabled={disabled} style={buttonStyle}>
              {exporting ? 'Exporting...' : 'Export research CSV'}
            </button>
          </section>

          <section style={cardStyle}>
            <h2 style={{ marginTop: 0 }}>2. Import CSV</h2>
            <p style={{ lineHeight: 1.5 }}>
              Upload a CSV with columns: title, doi, url, publicationDate, staffIds, and optional
              categories. The uploaded file is stored in S3 before the CMS import runs.
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
                {importing ? 'Importing...' : 'Import CSV to CMS'}
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

        {exportS3Key && (
          <section style={{ ...cardStyle, marginTop: '1.25rem' }}>
            <h2 style={{ marginTop: 0 }}>Export saved to S3</h2>
            <p style={{ wordBreak: 'break-all', marginBottom: 0 }}>{exportS3Key}</p>
          </section>
        )}

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
    </main>
  )
}

export default ResearchCsvManager
