import {describe, expect, it} from 'vitest'
import * as aboutStoryContentModule from './aboutStoryContent'

describe('getAboutStoryContent', () => {
  it('returns localized long-form story content for bm and zh', () => {
    const {getAboutStoryContent} = aboutStoryContentModule as {
      getAboutStoryContent?: (locale: 'en' | 'bm' | 'zh') => {storyTitle: string}
    }

    expect(getAboutStoryContent).toBeTypeOf('function')
    expect(getAboutStoryContent?.('bm').storyTitle).not.toBe(getAboutStoryContent?.('en').storyTitle)
    expect(getAboutStoryContent?.('zh').storyTitle).not.toBe(getAboutStoryContent?.('en').storyTitle)
  })
})
