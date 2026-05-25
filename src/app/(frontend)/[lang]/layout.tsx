import React from 'react'
import Navbar from '@/app/(frontend)/[lang]/_components/Navbar'
import Footer from '@/app/(frontend)/[lang]/_components/Footer'
import LenisProvider from '@/app/(frontend)/[lang]/_components/LenisProvider'
import { getNavigationBar } from '@/features/navigationBar/navigation.query'
import { Lang } from '@/types/lang'
import { getFooter } from '@/features/footer/footer.query'
import { LanguageProvider } from '@/app/context/LanguageContext'

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
    <LanguageProvider>
      <LenisProvider>
        <Navbar data={navbarData} />
        <main>{children}</main>
        <Footer data={footerData} language={currentLang} />
      </LenisProvider>
    </LanguageProvider>
  )
}
