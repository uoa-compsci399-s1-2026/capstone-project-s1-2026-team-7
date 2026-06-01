import { Lang } from '@/types/lang'
import { getStudyBySlug } from '@/features/studies/getStudyBySlug.query'
import { getStudiesPage } from '@/features/studies/studiespage.query'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Banner from '../../_components/Banner'
import HeroStats from './_components/HeroStats'
import AboutSection from './_components/AboutSection'
import ParticipationList from './_components/ParticipationList'
import EligibilityCriteria from './_components/EligibilityCriteria'
import FAQList from './_components/FAQList'
import StickySidebar from './_components/StickySidebar'

export type StudiesPageProps = {
  params: Promise<{
    lang: Lang
    slug: string
  }>
}

export default async function StudiesTemplatePage({ params }: StudiesPageProps) {
  const { lang, slug } = await params

  const [study, studiesPage] = await Promise.all([getStudyBySlug(lang, slug), getStudiesPage(lang)])

  const template = studiesPage.detailTemplate

  const bannerImageUrl = study.banner?.url || ''
  const bannerImageAlt = study.banner?.alt || ''

  return (
    <main>
      {/* Banner with absolute-positioned back link in the top-left */}
      <div className="relative">
        <Banner title={study.title} imageUrl={bannerImageUrl} imageAlt={bannerImageAlt} />

        <Link
          href={`/${lang}/studies`}
          className="absolute left-4 top-4 z-20 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-sm font-medium text-[#05083D] shadow-sm transition hover:bg-white sm:left-8 sm:top-8"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {template.backButtonLabel}
        </Link>
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        {study.subtitle && (
          <p className="mt-8 text-xl leading-relaxed text-[#05083D] md:text-2xl">
            {study.subtitle}
          </p>
        )}

        <div className="mt-6">
          <HeroStats
            durationLabel={template.heroStats.durationLabel}
            compensationLabel={template.heroStats.compensationLabel}
            locationLabel={template.heroStats.locationLabel}
            duration={study.duration}
            compensation={study.compensation}
            location={study.location}
          />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 pb-20 lg:grid-cols-3 lg:gap-8">
          {/* Left: scrolling main content */}
          <div className="space-y-12 lg:col-span-2">
            <AboutSection
              eyebrow={template.aboutSection.eyebrow}
              heading={template.aboutSection.heading}
              body={study.description}
            />

            <ParticipationList
              eyebrow={template.participationSection.eyebrow}
              heading={template.participationSection.heading}
              items={study.participationItems}
            />

            <EligibilityCriteria
              eyebrow={template.eligibilitySection.eyebrow}
              heading={template.eligibilitySection.heading}
              inclusionHeading={template.eligibilitySection.inclusionHeading}
              exclusionHeading={template.eligibilitySection.exclusionHeading}
              inclusion={study.eligibilityInclusion}
              exclusion={study.eligibilityExclusion}
            />

            <FAQList
              eyebrow={template.faqSection.eyebrow}
              heading={template.faqSection.heading}
              items={study.faqs}
            />
          </div>

          {/* Right: sticky sidebar */}
          <div className="lg:col-span-1">
            <StickySidebar
              applyEyebrow={template.applyCard.eyebrow}
              applyHeading={template.applyCard.heading}
              applyButtonLabel={template.applyCard.buttonLabel}
              applyHelperText={template.applyCard.helperText}
              ethicsHeading={template.ethicsCard.heading}
              ethicsApprovedByPrefix={template.ethicsCard.approvedByPrefix}
              ethicsCommitteeName={template.ethicsCard.committeeName}
              contactHeading={template.contactCard.heading}
              surveyUrl={study.surveyUrl}
              ethicsApprovalRef={study.ethicsApprovalRef}
              contact={studiesPage.contact}
              pdfCardHeading={template.downloadPdfCard.heading}
              pdfCardFileLabel={template.downloadPdfCard.fileLabel}
              pdfCardFileSubLabel={template.downloadPdfCard.fileSubLabel}
              pdfCardButtonLabel={template.downloadPdfCard.buttonLabel}
              pdfCardHelperText={template.downloadPdfCard.helperText}
              participantInfoPdf={study.participantInfoPdf}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
