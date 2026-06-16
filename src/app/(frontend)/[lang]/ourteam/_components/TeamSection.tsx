'use client'
import React, { useState } from 'react'
import { Search } from 'lucide-react'

import ProfileDrawer from './ProfileDrawer'
import { OurTeamPageDTO, StaffDTO } from '@/features/our-team'
import Banner from '../../_components/Banner'
import FilterPill from './FilterPill'
import TeamGroup from './TeamGroup'

export type teamSectionProps = {
  teamSection: OurTeamPageDTO
}

type FilterKey = 'all' | 'board' | 'staff'

export default function TeamSection({ teamSection }: teamSectionProps) {
  const [filter, setFilter] = useState<FilterKey>('all')
  const [query, setQuery] = useState('')
  const [active, setActive] = useState<StaffDTO | null>(null)

  const normalisedQuery = query.trim().toLowerCase()

  const matchesQuery = (p: StaffDTO) => {
    if (!normalisedQuery) return true
    const haystack = `${p.firstname} ${p.lastname} ${p.jobTitle} ${p.intro}`.toLowerCase()
    return haystack.includes(normalisedQuery)
  }

  const board = teamSection.staff.filter((p) => p.manager && matchesQuery(p))
  const research = teamSection.staff.filter((p) => !p.manager && matchesQuery(p))

  const showBoard = filter === 'all' || filter === 'board'
  const showResearch = filter === 'all' || filter === 'staff'

  return (
    <>
      <Banner
        title={teamSection.title}
        imageUrl={teamSection.banner?.url ?? ''}
        imageAlt={teamSection.banner?.alt ?? teamSection.title}
      />

      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <FilterPill active={filter === 'all'} onClick={() => setFilter('all')}>
              All
            </FilterPill>
            <FilterPill active={filter === 'board'} onClick={() => setFilter('board')}>
              {teamSection.boardTabLabel || 'Board of Directors'}
            </FilterPill>
            <FilterPill active={filter === 'staff'} onClick={() => setFilter('staff')}>
              {teamSection.staffTabLabel || 'Research Team'}
            </FilterPill>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search people"
              className="w-full rounded-full border border-gray-200 bg-white py-2 pl-10 pr-4 text-sm text-gray-700 placeholder:text-gray-400 focus:border-[#1F2BD4] focus:outline-none"
            />
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        {showBoard && (
          <TeamGroup
            title={teamSection.boardTabLabel || 'Board of Directors'}
            people={board}
            onSelect={setActive}
            columns={3}
          />
        )}

        {showBoard && showResearch && <div className="h-12 md:h-16" />}

        {showResearch && (
          <TeamGroup
            title={teamSection.staffTabLabel}
            people={research}
            onSelect={setActive}
            columns={4}
          />
        )}
      </main>

      <ProfileDrawer
        profile={active}
        action={() => setActive(null)}
        groupLabel={active?.manager ? teamSection.boardTabLabel : teamSection.staffTabLabel}
      />
    </>
  )
}
