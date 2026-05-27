'use client'

import StatsSectionCMS from '@/app/(frontend)/[lang]/_components/homepage/StatsSectionCMS'
import { LucideIcon, GraduationCap, BookOpen, Handshake, UsersRound } from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  GraduationCap,
  BookOpen,
  Handshake,
  UsersRound,
}

type CMSStat = {
  value: number
  label: string
  icon: string
}

export default function StatsSectionWrapper({ title, stats }: { title: string; stats: CMSStat[] }) {
  const transformedStats = stats.map((s) => ({
    icon: iconMap[s.icon],
    value: s.value,
    label: s.label,
  }))

  return <StatsSectionCMS title={title} stats={transformedStats} />
}
