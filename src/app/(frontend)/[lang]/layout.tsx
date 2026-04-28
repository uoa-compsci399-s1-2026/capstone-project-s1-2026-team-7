import React from 'react'
import Navbar from '@/app/(frontend)/[lang]/_components/Navbar'
import Footer from '@/app/(frontend)/[lang]/_components/Footer'
import { getNavigationBar } from '@/queries/navigation'
import { Lang } from '../type/lang'

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params

  const currentLang: Lang = lang === 'zh' ? 'zh' : 'en'

  const data = await getNavigationBar(currentLang)

  return (
    <>
      <Navbar data={data} currentLang={currentLang} />
      <main>{children}</main>
      <Footer data={data} />
    </>
  )
}
