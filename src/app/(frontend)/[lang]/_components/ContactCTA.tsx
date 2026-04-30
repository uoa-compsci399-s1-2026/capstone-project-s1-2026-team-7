import Link from 'next/link'

type ContactCTAProps = {
  currentLang?: 'en' | 'zh' | 'mi'
}

export default function ContactCTA({ currentLang = 'en' }: ContactCTAProps) {
  return (
    <section className="bg-white px-6 py-20 md:px-12 xl:px-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 rounded-[28px] bg-[#F1F2FF] px-8 py-12 md:flex-row md:items-center md:justify-between md:px-20 md:py-16">
        <div>
          <p className="text-xl font-medium text-[#2F3FE6] md:text-2xl">Contact Us</p>

          <h2 className="mt-4 max-w-2xl text-4xl font-bold leading-tight text-[#08084F] md:text-5xl lg:text-6xl">
            Need more info? We’re here to help
          </h2>
        </div>

        <Link
          href={`/${currentLang}/contact`}
          className="flex w-fit items-center justify-center rounded-full bg-[#181851] px-8 py-4 text-xl font-medium text-white transition hover:opacity-90 md:px-10"
        >
          Get in touch
        </Link>
      </div>
    </section>
  )
}
