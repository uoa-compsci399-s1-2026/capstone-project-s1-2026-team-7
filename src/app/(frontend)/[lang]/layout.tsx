import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
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
