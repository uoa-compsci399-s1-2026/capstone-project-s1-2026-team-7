const VARIANTS = [
  { bg: '#0C0C48', shape: '#D8DAF0', dot: '#D8DAF0', dotGrid: 'rgba(255,255,255,0.18)' },
  { bg: '#E8DCC4', shape: '#0C0C48', dot: '#1F2BD4', dotGrid: 'rgba(12,12,72,0.18)' },
  { bg: '#D5D9F0', shape: '#0C0C48', dot: '#1F2BD4', dotGrid: 'rgba(12,12,72,0.18)' },
  { bg: '#D4E8DB', shape: '#0C0C48', dot: '#2E8B57', dotGrid: 'rgba(12,12,72,0.18)' },
  { bg: '#EFE4D0', shape: '#0C0C48', dot: '#E08A2A', dotGrid: 'rgba(12,12,72,0.18)' },
] as const

export function getVariant(index: number) {
  return VARIANTS[index % VARIANTS.length]
}
