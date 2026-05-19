import ApplyCard from './ApplyCard'
import EthicsCard from './EthicsCard'
import ContactCard from './ContactCard'

type StickySidebarProps = {
  surveyUrl: string
  ethicsApprovalRef: string
  contact: {
    email: string
    address: string
    phone: string
  }
}

export default function StickySidebar({
  surveyUrl,
  ethicsApprovalRef,
  contact,
}: StickySidebarProps) {
  return (
    <aside className="space-y-4 lg:sticky lg:top-24 lg:h-fit">
      <ApplyCard surveyUrl={surveyUrl} />
      <EthicsCard approvalRef={ethicsApprovalRef} />
      <ContactCard email={contact.email} address={contact.address} phone={contact.phone} />
    </aside>
  )
}
