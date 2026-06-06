import Link from 'next/link'

export function ResearchCsvDashboardLink() {
  return (
    <section
      style={{
        marginTop: '2rem',
        marginBottom: '2rem',
      }}
    >
      <div
        style={{
          border: '1px solid #d9d9e3',
          borderRadius: '12px',
          background: '#fff',
          padding: '1.25rem',
          color: '#0c0c48',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <p
              style={{
                margin: '0 0 0.25rem',
                color: '#666',
                fontSize: '0.85rem',
                fontWeight: 400,
              }}
            >
              Research tools
            </p>

            <h2
              style={{
                margin: 0,
                fontSize: '1.2rem',
                fontWeight: 500,
              }}
            >
              CSV import / export
            </h2>

            <p
              style={{
                margin: '0.5rem 0 0',
                maxWidth: '42rem',
                color: '#555',
                fontSize: '0.95rem',
                fontWeight: 400,
                lineHeight: 1.5,
              }}
            >
              Export ORCID research data to CSV, or import a research CSV into the CMS.
            </p>
          </div>

          <Link
            href="/admin/research-csv"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #cfcfd8',
              borderRadius: '6px',
              background: '#f7f7f9',
              color: '#0c0c48',
              padding: '0.65rem 0.9rem',
              fontSize: '0.9rem',
              fontWeight: 500,
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            Open CSV tools
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ResearchCsvDashboardLink
