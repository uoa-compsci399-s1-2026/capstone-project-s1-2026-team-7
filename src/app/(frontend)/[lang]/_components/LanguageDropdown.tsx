import { usePathname, useRouter } from 'next/navigation'
import { useState, useRef, useEffect, HTMLAttributes } from 'react'
import type { Lang } from '../../type/lang'
import { languages } from '../../type/lang'
import { cn } from '@/lib/utils'
import { Icon } from './icons'

type LanguageDropdownProps = HTMLAttributes<HTMLDivElement> & {
  currentLang: Lang
}

export const LanguageDropdown = (props: LanguageDropdownProps) => {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const router = useRouter()
  const pathname = usePathname()

  const selected = languages.find((lang) => lang.code === props.currentLang) ?? languages[0]

  const changeLanguage = (newLang: Lang) => {
    const segments = pathname.split('/')
    if (segments[1] === 'en' || segments[1] === 'zh') {
      segments[1] = newLang
    } else {
      segments.splice(1, 0, newLang)
    }

    router.push(segments.join('/'))
    setOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={ref} className={cn('relative inline-flex', props.className)}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Change language"
        className="inline-flex h-8 items-center justify-center gap-2 rounded-full border border-[#C9CDD4] bg-white px-3 text-[12px] font-medium text-[#0C0C48] transition hover:bg-[#F2F4F7]"
      >
        <span>
          {selected.code === 'en' ? '🇬🇧 ' : ''}
          {selected.label}
        </span>

        <span className={cn('transition-transform duration-200', open && 'rotate-180')}>
          <Icon.V />
        </span>
      </button>

      {open && (
        <div className="absolute left-0 top-[calc(100%+6px)] z-50 min-w-32.5 overflow-hidden rounded-xl border border-[#C9CDD4] bg-white shadow-md">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code as Lang)}
              className={cn(
                'flex w-full items-center gap-2 px-3 py-2 text-left text-[12px] font-medium text-[#0C0C48] transition hover:bg-[#F2F4F7]',
                selected.code === lang.code && 'bg-[#F2F4F7]',
              )}
            >
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
