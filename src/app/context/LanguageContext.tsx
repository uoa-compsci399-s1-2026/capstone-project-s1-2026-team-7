'use client'

import { createContext, useContext, useCallback, useMemo, ReactNode } from 'react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import type { Lang } from '@/types/lang'

type LanguageContextValue = {
  lang: Lang
  setLang: (next: Lang) => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const params = useParams()
  const pathname = usePathname()
  const router = useRouter()

  const lang: Lang = params.lang === 'zh' ? 'zh' : 'en'

  const setLang = useCallback(
    (next: Lang) => {
      const segments = pathname.split('/')
      if (segments[1] === 'en' || segments[1] === 'zh') {
        segments[1] = next
      } else {
        segments.splice(1, 0, next)
      }
      router.push(segments.join('/'))
    },
    [pathname, router],
  )

  const value = useMemo(() => ({ lang, setLang }), [lang, setLang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>')
  return ctx
}
