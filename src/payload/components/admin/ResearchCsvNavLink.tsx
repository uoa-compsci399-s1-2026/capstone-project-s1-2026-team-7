'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function ResearchCsvNavLink() {
  const pathname = usePathname()
  const isActive = pathname?.startsWith('/admin/research-csv')

  return (
    <div
      style={{
        borderTop: '1px solid #e5e5ea',
        marginTop: '1.25rem',
        paddingTop: '1rem',
      }}
    >
      <p
        style={{
          color: '#8a8a8a',
          fontSize: '1rem',
          fontWeight: 400,
          margin: '0 0 0.75rem',
        }}
      >
        Tools
      </p>

      <Link
        href="/admin/research-csv"
        style={{
          color: '#0c0c48',
          display: 'block',
          fontSize: '1rem',
          fontWeight: 400,
          lineHeight: 1.5,
          textDecoration: isActive ? 'underline' : 'none',
        }}
      >
        Research CSV tools
      </Link>
    </div>
  )
}

export default ResearchCsvNavLink
