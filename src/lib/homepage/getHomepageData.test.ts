import {beforeEach, describe, expect, it, vi} from 'vitest'
import {getHomepageData} from './getHomepageData'

vi.mock('@/lib/sanity/read', () => ({
  getSiteSettings: vi.fn(),
  getPrograms: vi.fn(),
  getImpactStories: vi.fn(),
}))

const {getSiteSettings, getPrograms, getImpactStories} = await import('@/lib/sanity/read')

describe('getHomepageData', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('loads settings, programs, and only the latest three stories', async () => {
    vi.mocked(getSiteSettings).mockResolvedValue({
      brandName: 'TXJ Care',
      homeHeroHeadline: {en: 'Building Bridges of Compassion Across Malaysia'},
    })
    vi.mocked(getPrograms).mockResolvedValue([
      {_id: '1', slug: 'homeless', name: {en: 'Homeless Support'}},
    ] as never)
    vi.mocked(getImpactStories).mockResolvedValue([
      {_id: '1', slug: 'a', title: {en: 'A'}, publishedAt: '2026-06-03'},
      {_id: '2', slug: 'b', title: {en: 'B'}, publishedAt: '2026-06-02'},
      {_id: '3', slug: 'c', title: {en: 'C'}, publishedAt: '2026-06-01'},
      {_id: '4', slug: 'd', title: {en: 'D'}, publishedAt: '2026-05-31'},
    ] as never)

    const data = await getHomepageData('en')

    expect(data.latestUpdates).toHaveLength(3)
    expect(data.hero.heading).toBe('Building Bridges of Compassion Across Malaysia')
  })
})
