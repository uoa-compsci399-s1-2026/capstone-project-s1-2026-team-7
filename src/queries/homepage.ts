import { payload } from '@/lib/payload'
type SiteLocale = 'en' | 'zh' | 'mi'
import { HomePage, Media } from '../payload-types'
import {
  homepageDTO,
  heroDTO,
  aboutSectionDTO,
  seoDTO,
  ImageDTO,
  ButtonDTO,
} from '../dto/homepagedto'

export async function getHomePage(locale: SiteLocale = 'en') {
  const homePage = await payload.findGlobal({
    slug: 'home-page',
    locale,
    fallbackLocale: 'en',
    depth: 1,
  })

  return mapper(homePage)
}

function mapper(data: HomePage) {
  let heroImage: ImageDTO = mediaToImage(data.hero.illustration)

  let button1: ButtonDTO
  let button2: ButtonDTO
  if (data.hero.buttons) {
    if (data.hero.buttons.length >= 2) {
      if (
        typeof data.hero.buttons[0].id === 'string' &&
        typeof data.hero.buttons[1].id === 'string'
      ) {
        button1 = {
          label: data.hero.buttons[0].label,
          url: data.hero.buttons[0].url,
          variant: data.hero.buttons[0].variant,
          id: data.hero.buttons[0].id,
        }
        button2 = {
          label: data.hero.buttons[1].label,
          url: data.hero.buttons[1].url,
          variant: data.hero.buttons[1].variant,
          id: data.hero.buttons[1].id,
        }
      } else {
        throw Error('There are no HeroButtons')
      }
    } else {
      throw Error('There are no HeroButtons')
    }
  } else {
    throw Error('There are no HeroButtons')
  }

  const hero: heroDTO = {
    title: data.hero.title,
    description: data.hero.description,
    illustration: heroImage,
    button1: button1,
    button2: button2,
  }
  if (typeof data.aboutSection.eyebrow !== 'string') {
    throw Error('null')
  }
  const about: aboutSectionDTO = {
    eyebrow: data.aboutSection.eyebrow,
    heading: data.aboutSection.heading,
    body: data.aboutSection.body,
    aboutImage: mediaToImage(data.aboutSection.image),
  }
}

function mediaToImage(media: Media | number) {
  let heroImage: ImageDTO
  if (typeof media !== 'number') {
    if (typeof media === 'object') {
      if (typeof media.url === 'string') {
        heroImage = {
          url: media.url,
          alt: media.alt,
        }
      } else {
        throw Error('illustration is of type number not media')
      }
    } else {
      throw Error('illustration is of type number not media')
    }
  } else {
    throw Error('illustration is of type number not media')
  }

  return heroImage
}
// Make the about section using mediaToImagee function

/*
     heroImage =
      data.hero.illustration && typeof data.hero.illustration === 'object'
        ? (data.hero.illustration as Media)
        : null

    const aboutImage =
      data?.aboutSection?.image && typeof data.aboutSection.image === 'object'
        ? (data.aboutSection.image as Media)
        : null
  
  */

/*



heroDTO = {
    title: string;
    description: string;
    illustration: Image;
    button1: Button;
    button2: Button;
}






export interface HomePage {
  id: number;
  hero: {
    title: string;
    description: string;
    illustration: number | Media;
    buttons?:
      | {
          label: string;
          url: string;
          variant: 'primary' | 'secondary';
          id?: string | null;
        }[]
      | null;
  };
  aboutSection: {
    eyebrow?: string | null;
    heading: string;
    body: string;
    image: number | Media;
  };
  seo?: {
    metaTitle?: string | null;
    metaDescription?: string | null;
  };
  updatedAt?: string | null;
  createdAt?: string | null;
} */
