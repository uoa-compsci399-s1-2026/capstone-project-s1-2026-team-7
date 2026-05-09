import { CheckCircle } from 'lucide-react'

type EthicsCardProps = {
  approvalRef: string
}

export default function EthicsCard({ approvalRef }: EthicsCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="flex items-center gap-2">
        <CheckCircle className="h-4 w-4 text-green-600" strokeWidth={2.5} />
        <h3 className="text-sm font-bold text-[#05083D]">Ethics approved</h3>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-gray-600">{approvalRef}</p>
    </div>
  )
}
