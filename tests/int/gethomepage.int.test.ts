import { describe, it, expect, vi, beforeEach } from 'vitest'

const mocks = vi.hoisted(() => ({
  getPayloadClient: vi.fn(),
  findGlobal: vi.fn(),
}))

vi.mock('@/lib/payload', () => ({
  getPayloadClient: mocks.getPayloadClient,
}))

describe('getHomePage integration', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()

    mocks.getPayloadClient.mockResolvedValue({
      findGlobal: mocks.findGlobal,
    })
  })

  it('fetches homepage from Payload and returns parsed frontend DTO', async () => {
    const payloadHomePage = {
      id: 1,

      layout: [
        {
          id: 'hero-block-1',
          blockType: 'hero',
          title: 'Welcome',
          description: 'Homepage description',

          portraitHeroImage: {
            id: 100,
            url: '/hero-portrait.jpg',
            alt: 'Hero portrait image',
          },

          mobileHeroImage: {
            id: 101,
            url: '/hero-mobile.jpg',
            alt: 'Hero mobile image',
          },

          buttons: [
            {
              id: 'button-1',
              label: 'Learn more',
              url: '/about',
              variant: 'primary',
            },
            {
              id: 'button-2',
              label: 'Contact us',
              url: '/contact',
              variant: 'secondary',
            },
          ],
        },

        {
          id: 'research-block-1',
          blockType: 'research',
          title: 'Our Research',
          researchDisplay: [
            {
              id: 10,
              title: 'Research One',
              researchLink: 'https://example.com/research-one',
              date: '2024-01-01',
              order: 1,
              updatedAt: '2024-01-01T00:00:00.000Z',
              createdAt: '2024-01-01T00:00:00.000Z',
            },
          ],
        },

        {
          id: 'partners-block-1',
          blockType: 'partners',
          partners: [
            {
              id: 'partner-1',
              alt: 'Partner logo',
              logo: {
                id: 200,
                url: '/partner-logo.png',
                alt: 'Partner logo',
              },
            },
          ],
        },

        {
          id: 'card-block-1',
          blockType: 'card',
        },

        {
          id: 'info-block-1',
          blockType: 'info',
        },

        {
          id: 'stats-block-1',
          blockType: 'stats',
        },

        {
          id: 'timeline-block-1',
          blockType: 'timeline',
        },

        {
          id: 'who-we-are-block-1',
          blockType: 'who-we-are',
        },

        {
          id: 'what-we-do-block-1',
          blockType: 'what-we-do',
        },

        {
          id: 'donation-section-block-1',
          blockType: 'donation-section',
        },
      ],

      seo: {
        metaTitle: 'Homepage SEO',
        metaDescription: 'Homepage SEO description',
      },
    }

    mocks.findGlobal.mockResolvedValue(payloadHomePage)

    const { getHomePage } = await import('@/queries/homepage')

    const result = await getHomePage()

    expect(mocks.getPayloadClient).toHaveBeenCalledTimes(1)

    expect(mocks.findGlobal).toHaveBeenCalledWith({
      slug: 'home-page',
      locale: 'en',
      fallbackLocale: 'en',
      depth: 1,
    })

    expect(result).toMatchObject({
      id: 1,

      layout: [
        {
          id: 'hero-block-1',
          blockType: 'hero',
          title: 'Welcome',
          description: 'Homepage description',
          buttons: [
            {
              id: 'button-1',
              label: 'Learn more',
              url: '/about',
              variant: 'primary',
            },
            {
              id: 'button-2',
              label: 'Contact us',
              url: '/contact',
              variant: 'secondary',
            },
          ],
        },

        {
          id: 'research-block-1',
          blockType: 'research',
          title: 'Our Research',
          researchDisplay: [
            {
              id: 10,
              title: 'Research One',
              researchLink: 'https://example.com/research-one',
              date: '2024-01-01',
              order: 1,
            },
          ],
        },

        {
          id: 'partners-block-1',
          blockType: 'partners',
        },

        {
          id: 'card-block-1',
          blockType: 'card',
        },

        {
          id: 'info-block-1',
          blockType: 'info',
        },

        {
          id: 'stats-block-1',
          blockType: 'stats',
        },

        {
          id: 'timeline-block-1',
          blockType: 'timeline',
        },

        {
          id: 'who-we-are-block-1',
          blockType: 'who-we-are',
        },

        {
          id: 'what-we-do-block-1',
          blockType: 'what-we-do',
        },

        {
          id: 'donation-section-block-1',
          blockType: 'donation-section',
        },
      ],

      seo: {
        metaTitle: 'Homepage SEO',
        metaDescription: 'Homepage SEO description',
      },
    })

    const heroBlock = result.layout.find((block) => block.blockType === 'hero')

    expect(heroBlock).toBeDefined()
    expect(heroBlock?.heroHorizontal).toBeDefined()
    expect(heroBlock?.heroMobile).toBeDefined()
  })

  it('passes the requested locale to Payload', async () => {
    mocks.findGlobal.mockResolvedValue({
      id: 1,

      layout: [
        {
          id: 'hero-block-1',
          blockType: 'hero',
          title: '首頁',
          description: '描述',

          portraitHeroImage: {
            id: 100,
            url: '/hero-portrait.jpg',
            alt: 'Hero portrait image',
          },

          mobileHeroImage: {
            id: 101,
            url: '/hero-mobile.jpg',
            alt: 'Hero mobile image',
          },

          buttons: null,
        },

        {
          id: 'research-block-1',
          blockType: 'research',
          title: '研究',
          researchDisplay: null,
        },
      ],

      seo: {
        metaTitle: null,
        metaDescription: null,
      },
    })

    const { getHomePage } = await import('@/queries/homepage')

    const result = await getHomePage('zh')

    expect(mocks.findGlobal).toHaveBeenCalledWith({
      slug: 'home-page',
      locale: 'zh',
      fallbackLocale: 'en',
      depth: 1,
    })

    const heroBlock = result.layout.find((block) => block.blockType === 'hero')
    const researchBlock = result.layout.find((block) => block.blockType === 'research')

    expect(heroBlock?.title).toBe('首頁')
    expect(heroBlock?.buttons).toEqual([])

    expect(researchBlock?.title).toBe('研究')
    expect(researchBlock?.researchList).toEqual([])
  })

  it('throws when Payload returns invalid homepage data', async () => {
    mocks.findGlobal.mockResolvedValue({
      id: 1,
      layout: null,
      seo: null,
    })

    const { getHomePage } = await import('@/queries/homepage')

    await expect(getHomePage()).rejects.toThrow()
  })
})
