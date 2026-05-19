import React from 'react'

export function HNULogo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
      <img
        src="/HNU%20logo%20HD.png"
        alt="Human Nutrition Unit"
        style={{
          height: 64,
          width: 'auto',
          maxWidth: 'none',
          objectFit: 'contain',
          display: 'block',
        }}
      />
      <span style={{ fontSize: '0.85rem', opacity: 0.7 }}>University of Auckland</span>
    </div>
  )
}

export default HNULogo
