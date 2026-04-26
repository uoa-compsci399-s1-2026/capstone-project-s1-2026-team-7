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

      hero: {
        title: 'Welcome',
        description: 'Homepage description',

        'portrait hero image': null,
        'mobile hero image': null,

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

      studiesSection: {
        title: 'Our Studies',
        studiesDisplay: [
          {
            id: 10,
            title: 'Study One',
            description: 'Study description',
            sortOrder: 1,
            updatedAt: '2024-01-01T00:00:00.000Z',
            createdAt: '2024-01-01T00:00:00.000Z',
          },
        ],
      },

      aboutSection: {
        heading: 'About us',
        body: 'We do research.',

        'portrait image': null,
        'mobile image': null,
      },

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

      hero: {
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

      studiesSection: {
        title: 'Our Studies',
        researchList: [
          {
            id: 10,
            title: 'Study One',
            description: 'Study description',
            sortOrder: 1,
          },
        ],
      },

      aboutSection: {
        eyebrow: '',
        heading: 'About us',
        body: 'We do research.',
      },

      seo: {
        metaTitle: 'Homepage SEO',
        metaDescription: 'Homepage SEO description',
      },
    })

    expect(result.hero.heroHorizontal).toBeDefined()
    expect(result.hero.heroMobile).toBeDefined()
    expect(result.aboutSection.image).toBeDefined()
    expect(result.aboutSection.mobileImage).toBeDefined()
  })

  it('passes the requested locale to Payload', async () => {
    mocks.findGlobal.mockResolvedValue({
      id: 1,

      hero: {
        title: '首頁',
        description: '描述',
        'portrait hero image': null,
        'mobile hero image': null,
        buttons: null,
      },

      studiesSection: {
        title: '研究',
        studiesDisplay: null,
      },

      aboutSection: {
        heading: '關於我們',
        body: '內容',
        'portrait image': null,
        'mobile image': null,
      },

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

    expect(result.hero.title).toBe('首頁')
    expect(result.hero.buttons).toEqual([])
    expect(result.studiesSection.researchList).toEqual([])
  })

  it('throws when Payload returns invalid homepage data', async () => {
    mocks.findGlobal.mockResolvedValue({
      id: 1,
      hero: null,
      studiesSection: null,
      aboutSection: null,
      seo: null,
    })

    const { getHomePage } = await import('@/queries/homepage')

    await expect(getHomePage()).rejects.toThrow()
  })
})
