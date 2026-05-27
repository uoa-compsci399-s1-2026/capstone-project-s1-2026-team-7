import { Mail, MapPin, Phone } from 'lucide-react'

type ContactCardProps = {
  heading: string
  email: string
  address: string
  phone: string
}

export default function ContactCard({ heading, email, address, phone }: ContactCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="flex items-center gap-2">
        <Mail className="h-4 w-4 text-[#05083D]" strokeWidth={2.5} />
        <h3 className="text-sm font-bold text-[#05083D]">{heading}</h3>
      </div>

      <div className="mt-3 space-y-2 text-xs leading-relaxed text-gray-600">
        {email && <p className="break-words">{email}</p>}

        {address && (
          <div className="flex items-start gap-1.5">
            <MapPin className="mt-0.5 h-3 w-3 shrink-0 text-gray-400" strokeWidth={2.5} />
            <p className="whitespace-pre-line">{address}</p>
          </div>
        )}

        {phone && (
          <div className="flex items-start gap-1.5">
            <Phone className="mt-0.5 h-3 w-3 shrink-0 text-gray-400" strokeWidth={2.5} />
            <p>{phone}</p>
          </div>
        )}
      </div>
    </div>
  )
}
