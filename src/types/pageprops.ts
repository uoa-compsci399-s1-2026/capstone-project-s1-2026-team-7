import { Lang } from './lang'

export type PageProps = {
  params: Promise<{
    lang: Lang
  }>
}
