'use client'

import Link from 'next/link'
import React from 'react'

export function ResearchCsvDashboardLink() {
  return (
    <section
      style={{
        background: '#ffffff',
        border: '1px solid #d9d9e3',
        borderRadius: '12px',
        color: '#0c0c48',
        marginBottom: '1rem',
        padding: '1.25rem',
      }}
    >
      <h2 style={{ fontSize: '1.2rem', margin: '0 0 0.35rem' }}>Research CSV tools</h2>
      <p style={{ margin: '0 0 0.75rem' }}>
        Export ORCID research data to CSV or import a research CSV into the CMS.
      </p>
      <Link href="/admin/research-csv" style={{ color: '#0c0c48', fontWeight: 700 }}>
        Open CSV import / export
      </Link>
    </section>
  )
}

export default ResearchCsvDashboardLink
