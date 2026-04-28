import { Mail, MapPin, Phone } from 'lucide-react'

export type ContactComponentProps = {
  eyebrow?: string
  title?: string
  email?: string
  phone?: string
  location?: string
}

export default function ContactComponent({
  eyebrow = 'Reach out to us',
  title = 'Contact',
  email = 'HNU_Auckland@auckland.ac.nz',
  phone = '02109196703 (Chinese speakers) / 02109195443 (English speakers)',
  location = '18 Carrick Place, Mount Eden, Auckland, Zealand, 1024',
}: ContactComponentProps) {
  return (
    <section className="mx-auto flex w-full max-w-[1170px] flex-col gap-8 px-5 py-20 md:flex-row md:gap-16 md:px-10">
      <div className="border-l-4 border-[#05083D] pl-5 md:w-[280px]">
        <p className="mb-2 text-base font-medium text-[#2448FF]">{eyebrow}</p>
        <h2 className="text-4xl font-bold text-[#05083D] md:text-5xl">{title}</h2>
      </div>

      <div className="flex w-full max-w-[760px] flex-col">
        <ContactRow Icon={Mail} label="Email" value={email} />
        <ContactRow Icon={Phone} label="Phone" value={phone} />
        <ContactRow Icon={MapPin} label="Location" value={location} isLast />
      </div>
    </section>
  )
}

type ContactRowProps = {
  Icon: typeof Mail
  label: string
  value: string
  isLast?: boolean
}

function ContactRow({ Icon, label, value, isLast = false }: ContactRowProps) {
  return (
    <div className={`py-6 ${isLast ? '' : 'border-b border-gray-200'}`}>
      <div className="mb-2 flex items-center gap-2">
        <Icon className="h-4 w-4 text-black" strokeWidth={2.5} />
        <h3 className="text-sm font-bold text-black md:text-base">{label}</h3>
      </div>

      <p className="pl-6 text-sm leading-relaxed text-black md:text-base">{value}</p>
    </div>
  )
}
