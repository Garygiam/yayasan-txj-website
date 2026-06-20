import {afterEach, describe, expect, it, vi} from 'vitest'

describe('getSiteUrl', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
    vi.resetModules()
  })

  it('falls back to the production domain when NEXT_PUBLIC_SITE_URL is missing', async () => {
    delete process.env.NEXT_PUBLIC_SITE_URL

    const {getSiteUrl} = await import('./siteUrl')

    expect(getSiteUrl()).toBe('https://www.yayasantxj.org')
  })

  it('falls back to the production domain when NEXT_PUBLIC_SITE_URL points to localhost', async () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'http://localhost:3000/')

    const {getSiteUrl} = await import('./siteUrl')

    expect(getSiteUrl()).toBe('https://www.yayasantxj.org')
  })

  it('preserves configured non-localhost site URLs while trimming a trailing slash', async () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://txjcare.org/')

    const {getSiteUrl} = await import('./siteUrl')

    expect(getSiteUrl()).toBe('https://txjcare.org')
  })
})
