export type homepageDTO = {
  id: number
  hero: heroDTO
  about: aboutSectionDTO
  seo: seoDTO
}

export type seoDTO = {
  metaTitle: string
  metaDescription: string
}
export type aboutSectionDTO = {
  eyebrow: string
  heading: string
  body: string
  aboutImage: ImageDTO
}
export type ImageDTO = {
  url: string
  alt: string
}
export type ButtonDTO = {
  label: string
  url: string
  variant: 'primary' | 'secondary'
  id: string
}
export type heroDTO = {
  title: string
  description: string
  illustration: ImageDTO
  button1: ButtonDTO
  button2: ButtonDTO
}
