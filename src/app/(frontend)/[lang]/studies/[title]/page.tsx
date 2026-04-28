import { Lang } from '@/types/lang'

export type StudiesPageProps = {
  params: Promise<{
    lang: Lang
    slug: string
  }>
}

export default async function HomePage({ params }: StudiesPageProps) {
  const { lang, slug } = await params
  return <main></main>
}
