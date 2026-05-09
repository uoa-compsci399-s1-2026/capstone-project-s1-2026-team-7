import { Lang } from '@/types/lang'

export default function getLocalizedHref(navURL: string, currentLang: Lang) {
  const rawURL = navURL?.trim() || '/'

  // External links should not get /en added
  if (
    rawURL.startsWith('http://') ||
    rawURL.startsWith('https://') ||
    rawURL.startsWith('mailto:') ||
    rawURL.startsWith('tel:') ||
    rawURL.startsWith('#')
  ) {
    return rawURL
  }

  // Make sure CMS links always start with /
  const urlWithSlash = rawURL.startsWith('/') ? rawURL : `/${rawURL}`

  // Prevent duplicate language like /en/en/research
  if (urlWithSlash.startsWith('/en/') || urlWithSlash === '/en') {
    return urlWithSlash
  }

  if (urlWithSlash.startsWith('/zh/') || urlWithSlash === '/zh') {
    return urlWithSlash
  }

  // Homepage case
  if (urlWithSlash === '/') {
    return `/${currentLang}`
  }

  return `/${currentLang}${urlWithSlash}`
}
