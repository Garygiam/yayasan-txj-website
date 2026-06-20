import {describe, expect, it} from 'vitest'
import {buildHomepageViewModel} from './normalize'
import type {ImpactStory, Program, SiteSettings} from '@/lib/sanity/types'

const settings = {
  brandName: 'TXJ Care',
  homeHeroHeadline: {
    en: 'Building Bridges of Compassion Across Malaysia',
  },
  homeHeroSubheadline: {
    en: 'Youth-driven support for homeless, orphans, elderly & rural communities',
  },
  homeHeroSlides: [
    {
      _key: 'slide-1',
      eyebrow: {en: 'Homeless Support'},
      alt: {en: 'Youth volunteers distributing meal packs in Kuala Lumpur'},
      imagePrompt:
        'documentary photo of Malaysian youth volunteers distributing meal packs to homeless adults in Kuala Lumpur, dignified, warm natural light, realistic, community aid',
    },
  ],
  homeStats: [
    {_key: 'stat-1', value: 5000, suffix: '+', label: {en: 'Families helped'}},
  ],
  urgentNeedsTitle: {en: 'Urgent Needs'},
  urgentNeedsItems: ['Rice', 'School supplies'],
  urgentNeedsCtaLabel: {en: 'Donate Essentials'},
  urgentNeedsCtaLink: '/en/donate',
  homeTransparencyTitle: {en: 'How Help Works'},
  homeTransparencySteps: [
    {_key: 'step-1', title: {en: 'Receive'}, description: {en: 'Collect donations'}},
  ],
  founderSpotlightTitle: {en: 'Founder Spotlight'},
  founderSpotlightSummary: {en: 'Dato Sri Charles Hwang leads a practical, long-term care model.'},
  founderQuote: {en: 'Real help means showing up consistently with what people actually need.'},
  homeFinalCtaTitle: {en: 'Help build practical care across Malaysia'},
  homeFinalCtas: [
    {
      _key: 'cta-1',
      label: {en: 'Donate'},
      body: {en: 'Fund essentials and logistics.'},
      href: '/en/donate',
    },
  ],
} as SiteSettings

const programs = [
  {_id: '1', slug: 'homeless', name: {en: 'Homeless Support'}, summary: {en: 'Meals and daily essentials'}},
  {_id: '2', slug: 'orphanage', name: {en: 'Orphanage Partnerships'}, summary: {en: 'Daily necessities and learning support'}},
  {_id: '3', slug: 'elderly', name: {en: 'Elderly Care'}, summary: {en: 'Essentials, mobility support, connection'}},
  {_id: '4', slug: 'rural', name: {en: 'Rural Community Aid'}, summary: {en: 'Remote-area distribution and assessment'}},
] as Program[]

const stories = [
  {_id: 'story-1', slug: 'kg-keliangau', title: {en: '2023 field supplies update'}, body: {en: 'Supplies delivered.'}, publishedAt: '2026-06-01'},
] as ImpactStory[]

describe('buildHomepageViewModel', () => {
  it('creates a complete homepage model with graceful defaults', () => {
    const model = buildHomepageViewModel({
      locale: 'en',
      settings,
      programs,
      stories,
    })

    expect(model.hero.heading).toBe('Building Bridges of Compassion Across Malaysia')
    expect(model.hero.slides).toHaveLength(1)
    expect(model.stats).toEqual([{value: '5,000+', label: 'Families helped'}])
    expect(model.urgentNeeds?.items).toEqual(['Rice', 'School supplies'])
    expect(model.pillars).toHaveLength(4)
    expect(model.latestUpdates).toHaveLength(1)
    expect(model.finalCtas[0].href).toBe('/en/donate')
  })

  it('omits optional sections when source content is empty', () => {
    const model = buildHomepageViewModel({
      locale: 'en',
      settings: {brandName: 'TXJ Care'},
      programs: [],
      stories: [],
    })

    expect(model.urgentNeeds).toBeNull()
    expect(model.transparency).toBeNull()
    expect(model.founder).toBeNull()
    expect(model.latestUpdates).toEqual([])
  })

  it('falls back to safe labels when Sanity homepage content is incomplete', () => {
    const model = buildHomepageViewModel({
      locale: 'en',
      settings: {brandName: 'TXJ Care'},
      programs: [],
      stories: [],
    })

    expect(model.hero.primaryCta.label).toBe('Donate Now')
    expect(model.hero.secondaryCta.href).toBe('/en/get-involved')
    expect(model.hero.trustItems).toEqual([
      'Youth-led',
      'Practical aid',
      'Transparent giving',
    ])
  })
})
