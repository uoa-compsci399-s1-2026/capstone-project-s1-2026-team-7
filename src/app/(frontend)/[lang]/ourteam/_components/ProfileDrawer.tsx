'use client'
import React, { useEffect } from 'react'
import { Mail, X } from 'lucide-react'
import { StaffDTO } from '@/features/our-team'
import { AvatarBlock } from './Profile'

type Props = {
  profile: StaffDTO | null
  action: () => void
  groupLabel: string
}

export default function ProfileDrawer({ profile, action, groupLabel }: Props) {
  const open = !!profile

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') action()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, action])

  return (
    <>
      <div
        onClick={action}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!open}
      >
        {profile && (
          <>
            <div className="relative bg-[#0C0C48] px-6 pb-8 pt-6 text-white">
              <button
                onClick={action}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="w-32">
                <AvatarBlock variantIndex={0} rounded="rounded-xl" photo={profile.photo} />
              </div>

              <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
                {profile.jobTitle}
              </p>
              <h2 className="mt-1 text-3xl font-bold">
                {profile.firstname} {profile.lastname}
              </h2>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {profile.intro && (
                <section>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">
                    About
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-gray-700">{profile.intro}</p>
                </section>
              )}

              <section className="mt-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">
                  Details
                </p>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-wide text-gray-400">Group</p>
                    <p className="text-sm font-medium text-[#0C0C48]">{groupLabel}</p>
                  </div>
                </div>
              </section>

              <div className="mt-8 flex flex-wrap gap-3">
                {profile.email && (
                  <a
                    href={`mailto:${profile.email}`}
                    className="inline-flex items-center gap-2 rounded-full bg-[#0C0C48] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#1F2BD4]"
                  >
                    <Mail className="h-4 w-4" />
                    Contact {profile.firstname}
                  </a>
                )}
                {profile.uoaProfileLink && (
                  <a
                    href={profile.uoaProfileLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-[#0C0C48] px-5 py-2.5 text-sm font-medium text-[#0C0C48] transition hover:bg-[#0C0C48] hover:text-white"
                  >
                    UoA profile
                  </a>
                )}
              </div>
            </div>
          </>
        )}
      </aside>
    </>
  )
}
