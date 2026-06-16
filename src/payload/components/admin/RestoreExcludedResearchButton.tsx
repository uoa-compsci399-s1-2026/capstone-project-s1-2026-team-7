'use client'

import React, { useState } from 'react'
import { useDocumentInfo } from '@payloadcms/ui'

type RestoreResponse = {
  ok?: boolean
  error?: string
  researchId?: string | number
  title?: string
  restored?: boolean
}

const buttonStyle: React.CSSProperties = {
  width: '100%',
  border: '1px solid #067647',
  borderRadius: '6px',
  background: '#fff',
  color: '#067647',
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

export function RestoreExcludedResearchButton() {
  const { id } = useDocumentInfo()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const hasSavedDocument = id !== undefined && id !== null && String(id).trim().length > 0

  async function handleRestore() {
    if (!hasSavedDocument || isSubmitting) return

    const confirmed = window.confirm(
      'This will add this item back into the active Research collection and allow future ORCID/CSV imports to update it again. Continue?',
    )

    if (!confirmed) return

    setIsSubmitting(true)
    setMessage(null)
    setError(null)

    try {
      const response = await fetch('/api/research/restore-from-exclusion', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
        }),
      })

      const result = (await response.json().catch(() => ({}))) as RestoreResponse

      if (!response.ok || result.error) {
        throw new Error(result.error || 'Failed to restore this research item.')
      }

      setMessage('Research restored to the active Research collection.')

      window.setTimeout(() => {
        if (result.researchId) {
          window.location.href = `/admin/collections/research/${result.researchId}`
          return
        }

        window.location.href = '/admin/collections/research'
      }, 700)
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Failed to restore research.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      style={{
        border: '1px solid #cce8d9',
        borderRadius: '8px',
        background: '#f6fef9',
        padding: '0.8rem',
      }}
    >
      <p
        style={{
          margin: '0 0 0.5rem',
          color: '#054f31',
          fontSize: '0.85rem',
          lineHeight: 1.4,
        }}
      >
        Restore this excluded item back into active Research and stop blocking it from future
        ORCID/CSV imports.
      </p>

      <button
        type="button"
        disabled={!hasSavedDocument || isSubmitting}
        onClick={handleRestore}
        style={!hasSavedDocument || isSubmitting ? disabledButtonStyle : buttonStyle}
      >
        {isSubmitting ? 'Restoring…' : 'Restore to Research'}
      </button>

      {!hasSavedDocument ? (
        <p style={{ margin: '0.5rem 0 0', color: '#777', fontSize: '0.8rem' }}>
          Save the excluded research record first before restoring it.
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

export default RestoreExcludedResearchButton
