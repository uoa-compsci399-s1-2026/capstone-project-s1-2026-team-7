'use client'

import React, { useState } from 'react'
import { useDocumentInfo } from '@payloadcms/ui'

type ExcludeResponse = {
  ok?: boolean
  error?: string
  title?: string
}

const buttonStyle: React.CSSProperties = {
  width: '100%',
  border: '1px solid #b42318',
  borderRadius: '6px',
  background: '#fff',
  color: '#b42318',
  cursor: 'pointer',
  fontWeight: 600,
  padding: '0.65rem 0.8rem',
}

const disabledButtonStyle: React.CSSProperties = {
  ...buttonStyle,
  border: '1px solid #d9d9e3',
  color: '#777',
  cursor: 'not-allowed',
}

export function ExcludeResearchFromOrcidSyncButton() {
  const { id } = useDocumentInfo()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const hasSavedDocument = id !== undefined && id !== null && String(id).trim().length > 0

  async function handleExclude() {
    if (!hasSavedDocument || isSubmitting) return

    const confirmed = window.confirm(
      'This will remove this research item from the active Research collection and prevent future ORCID/CSV imports from bringing it back. Manually added research is not affected unless you press this button on that record. Continue?',
    )

    if (!confirmed) return

    const reason = window.prompt(
      'Optional: add a note explaining why this research item is being excluded.',
      '',
    )

    setIsSubmitting(true)
    setMessage(null)
    setError(null)

    try {
      const response = await fetch('/api/research/exclude-from-orcid-sync', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          reason: reason?.trim() || undefined,
        }),
      })

      const result = (await response.json().catch(() => ({}))) as ExcludeResponse

      if (!response.ok || result.error) {
        throw new Error(result.error || 'Failed to exclude this research item.')
      }

      setMessage('Research excluded and removed from the active Research collection.')

      window.setTimeout(() => {
        window.location.href = '/admin/collections/research'
      }, 700)
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Failed to exclude research.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      style={{
        border: '1px solid #ead4d0',
        borderRadius: '8px',
        background: '#fff7f5',
        padding: '0.8rem',
      }}
    >
      <p
        style={{
          margin: '0 0 0.5rem',
          color: '#5f1f17',
          fontSize: '0.85rem',
          lineHeight: 1.4,
        }}
      >
        Use this only when this record should be removed from active Research and blocked from
        future ORCID/CSV imports.
      </p>

      <button
        type="button"
        disabled={!hasSavedDocument || isSubmitting}
        onClick={handleExclude}
        style={!hasSavedDocument || isSubmitting ? disabledButtonStyle : buttonStyle}
      >
        {isSubmitting ? 'Excluding…' : 'Exclude from ORCID sync'}
      </button>

      {!hasSavedDocument ? (
        <p style={{ margin: '0.5rem 0 0', color: '#777', fontSize: '0.8rem' }}>
          Save the research record first before excluding it.
        </p>
      ) : null}

      {message ? (
        <p style={{ margin: '0.5rem 0 0', color: '#067647', fontSize: '0.8rem' }}>{message}</p>
      ) : null}

      {error ? (
        <p style={{ margin: '0.5rem 0 0', color: '#b42318', fontSize: '0.8rem' }}>{error}</p>
      ) : null}
    </div>
  )
}

export default ExcludeResearchFromOrcidSyncButton
