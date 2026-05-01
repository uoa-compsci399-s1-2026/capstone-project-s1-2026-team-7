import Link from 'next/link'
import InformationComponent from './InformationComponent'

export default function StudyActionSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-24">
      <div className="rounded-[42px] bg-[#D0D6E7] px-8 py-10 text-center md:px-20">
        <p className="mx-auto max-w-4xl text-xl leading-snug text-[#05083D] md:text-2xl">
          You cannot participate in the study if you have already been diagnosed with type 2
          diabetes. To sign up for the study, click
        </p>

        <Link
          href="https://redcap.fmhs.auckland.ac.nz/surveys/?s=C8CXWCAFWE"
          className="mt-10 inline-flex min-w-64 items-center justify-center rounded-full border border-black px-8 py-3 text-xl font-medium text-black transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
        >
          Eligibility Survey
        </Link>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-2">
        <InformationComponent
          title="Ethics & Study Information"
          description="This study has been approved by the Southern Health and Disability Ethics Committee, and you can find additional details and FAQs on the University of Auckland website."
        />

        <InformationComponent
          title="FAQ"
          description="A frequently asked questions (FAQ) section provides quick, clear answers to the most common queries users have about our services, processes, and policies."
        />
      </div>
    </section>
  )
}
