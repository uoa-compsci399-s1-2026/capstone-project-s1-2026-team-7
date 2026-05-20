import type { Lang } from '@/types/lang'

const EXTERNAL_PROTOCOL = /^(https?:|mailto:|tel:)/i

export function withLang(href: string, lang: Lang): string {
  if (!href) return href
  if (href.startsWith('#')) return href
  if (EXTERNAL_PROTOCOL.test(href)) return href
  if (href.startsWith('/')) return `/${lang}${href}`
  return href
}
