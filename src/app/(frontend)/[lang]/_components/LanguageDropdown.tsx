'use client'

import { useState, useRef, useEffect, HTMLAttributes } from 'react'
import type { Lang } from '@/types/lang'
import { languages } from '@/types/lang'
import { cn } from '@/lib/utils'
import { Icon } from './icons'
import { useLanguage } from '@/context/LanguageContext'

type LanguageDropdownProps = HTMLAttributes<HTMLDivElement>

export const LanguageDropdown = (props: LanguageDropdownProps) => {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const { lang, setLang } = useLanguage()

  const selected = languages.find((l) => l.code === lang) ?? languages[0]

  const handleSelect = (newLang: Lang) => {
    setLang(newLang)
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
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => handleSelect(l.code as Lang)}
              className={cn(
                'flex w-full items-center gap-2 px-3 py-2 text-left text-[12px] font-medium text-[#0C0C48] transition hover:bg-[#F2F4F7]',
                selected.code === l.code && 'bg-[#F2F4F7]',
              )}
            >
              <span>{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
