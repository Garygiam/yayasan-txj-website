import {afterEach, describe, expect, it, vi} from 'vitest'

describe('getSiteUrl', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('falls back to the production domain when NEXT_PUBLIC_SITE_URL is missing', async () => {
    delete process.env.NEXT_PUBLIC_SITE_URL

    const {getSiteUrl} = await import('./siteUrl')

    expect(getSiteUrl()).toBe('https://www.yayasantxj.org')
  })
})
