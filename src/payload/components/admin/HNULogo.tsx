import Image from 'next/image'

export function HNULogo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
      <Image src="/HNU%20logo%20HD.png" alt="Human Nutrition Unit" height={64} width={200} />
      <span style={{ fontSize: '0.85rem', opacity: 0.7 }}>University of Auckland</span>
    </div>
  )
}

export default HNULogo
