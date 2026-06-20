import {afterEach, describe, expect, it, vi} from 'vitest'

vi.mock('@/i18n/config', () => ({
  locales: ['en', 'bm', 'zh'],
}))

afterEach(() => {
  vi.unstubAllEnvs()
})

describe('buildLocaleAlternates', () => {
  it('builds canonical and language alternates for the homepage', async () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://txjcare.org/')

    const {buildLocaleAlternates} = await import('./alternates')

    expect(buildLocaleAlternates('/', 'bm')).toEqual({
      canonical: 'https://txjcare.org/bm',
      languages: {
        en: 'https://txjcare.org/en',
        bm: 'https://txjcare.org/bm',
        zh: 'https://txjcare.org/zh',
      },
    })
  })

  it('normalizes nested routes before building alternates', async () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://txjcare.org')

    const {buildLocaleAlternates} = await import('./alternates')

    expect(buildLocaleAlternates('about', 'en')).toEqual({
      canonical: 'https://txjcare.org/en/about',
      languages: {
        en: 'https://txjcare.org/en/about',
        bm: 'https://txjcare.org/bm/about',
        zh: 'https://txjcare.org/zh/about',
      },
    })
  })
})
