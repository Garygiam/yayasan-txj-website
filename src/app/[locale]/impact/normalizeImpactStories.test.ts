import {describe, expect, it} from 'vitest'
import type {ImpactStory} from '../../../lib/sanity/types'
import {buildImpactPageViewModel} from './normalizeImpactStories'

const stories: ImpactStory[] = [
  {
    _id: 'story-1',
    slug: 'story-1',
    title: {en: 'Sabah outreach'},
    body: {en: 'Delivered food packs and support to families in need.'},
    gallery: [
      {_key: 'a', alt: 'Food pack delivery', asset: {_ref: 'image-a', url: 'https://example.com/a.jpg'}},
      {_key: 'b', alt: 'Volunteer team', asset: {_ref: 'image-b', url: 'https://example.com/b.jpg'}},
    ],
  },
  {
    _id: 'story-2',
    slug: 'story-2',
    title: {en: 'Village visit'},
    body: {en: 'Community follow-up and logistics support across remote areas.'},
    gallery: [],
  },
]

describe('buildImpactPageViewModel', () => {
  it('flattens gallery images and prepares story cards', () => {
    const result = buildImpactPageViewModel({locale: 'en', stories})

    expect(result.galleryImages).toHaveLength(2)
    expect(result.galleryImages[0]).toEqual({
      id: 'story-1-a',
      storyTitle: 'Sabah outreach',
      src: 'https://example.com/a.jpg',
      alt: 'Food pack delivery',
    })
    expect(result.storyCards[0].title).toBe('Sabah outreach')
    expect(result.storyCards[0].excerpt).toContain('Delivered food packs')
    expect(result.storyCards[0].image?.src).toBe('https://example.com/a.jpg')
    expect(result.storyCards[1].image).toBeNull()
  })
})
