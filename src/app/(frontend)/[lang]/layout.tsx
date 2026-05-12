import React from 'react'
import Navbar from '@/app/(frontend)/[lang]/_components/Navbar'
import Footer from '@/app/(frontend)/[lang]/_components/Footer'
import { getNavigationBar } from '@/queries/navigation'
import { Lang } from '@/types/lang'
import { getFooter } from '@/queries/footer'

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params

  const currentLang: Lang = lang === 'zh' ? 'zh' : 'en'

  const navbarData = await getNavigationBar(currentLang)
  const footerData = await getFooter(currentLang)
  return (
    <>
      <Navbar data={navbarData} language={currentLang} />
      <main>{children}</main>
      <Footer data={footerData} language={currentLang} />
    </>
  )
}
