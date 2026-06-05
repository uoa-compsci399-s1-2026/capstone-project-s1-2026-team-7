import ApplyCard from './ApplyCard'
import EthicsCard from './EthicsCard'
import ContactCard from './ContactCard'
import DownloadPdfCard from './DownloadPdfCard'

type StickySidebarProps = {
  applyEyebrow: string
  applyHeading: string
  applyButtonLabel: string
  applyHelperText: string
  ethicsHeading: string
  ethicsApprovedByPrefix: string
  ethicsCommitteeName: string
  contactHeading: string
  surveyUrl: string
  ethicsApprovalRef: string
  contact: {
    email: string
    address: string
    phone: string
  }
  pdfCardHeading: string
  pdfCardFileLabel: string
  pdfCardFileSubLabel: string
  pdfCardButtonLabel: string
  pdfCardHelperText: string
  participantInfoPdf: { url: string; filename: string } | null
}

export default function StickySidebar({
  applyEyebrow,
  applyHeading,
  applyButtonLabel,
  applyHelperText,
  ethicsHeading,
  ethicsApprovedByPrefix,
  ethicsCommitteeName,
  contactHeading,
  surveyUrl,
  ethicsApprovalRef,
  contact,
  pdfCardHeading,
  pdfCardFileLabel,
  pdfCardFileSubLabel,
  pdfCardButtonLabel,
  pdfCardHelperText,
  participantInfoPdf,
}: StickySidebarProps) {
  return (
    <aside className="space-y-4 lg:sticky lg:top-24 lg:h-fit">
      <ApplyCard
        eyebrow={applyEyebrow}
        heading={applyHeading}
        buttonLabel={applyButtonLabel}
        helperText={applyHelperText}
        surveyUrl={surveyUrl}
      />

      <EthicsCard
        heading={ethicsHeading}
        approvedByPrefix={ethicsApprovedByPrefix}
        committeeName={ethicsCommitteeName}
        approvalRef={ethicsApprovalRef}
      />

      <DownloadPdfCard
        pdfUrl={participantInfoPdf?.url ?? null}
        heading={pdfCardHeading}
        fileLabel={pdfCardFileLabel}
        fileSubLabel={pdfCardFileSubLabel}
        buttonLabel={pdfCardButtonLabel}
        helperText={pdfCardHelperText}
      />

      <ContactCard
        heading={contactHeading}
        email={contact.email}
        address={contact.address}
        phone={contact.phone}
      />
    </aside>
  )
}
