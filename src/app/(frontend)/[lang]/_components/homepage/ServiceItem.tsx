import type { LucideIcon } from 'lucide-react'

type ServiceItemProps = {
  title: string
  icon: LucideIcon
}

export default function ServiceItem({ title, icon: Icon }: ServiceItemProps) {
  return (
    <div className="flex min-h-20 items-center justify-center gap-5 rounded-3xl bg-[#D7DDED] px-6 py-5 text-center">
      <Icon className="h-7 w-7 shrink-0 text-black" strokeWidth={2.25} />

      <p className="text-xl font-medium text-black md:text-2xl">{title}</p>
    </div>
  )
}
