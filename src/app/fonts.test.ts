import {describe, expect, it, vi} from 'vitest'

vi.mock('next/font/google', () => ({
  Geist: vi.fn(({variable}: {variable: string}) => ({
    className: `${variable}-class`,
    variable,
  })),
  Geist_Mono: vi.fn(({variable}: {variable: string}) => ({
    className: `${variable}-class`,
    variable,
  })),
  Cormorant_Garamond: vi.fn(({variable}: {variable: string}) => ({
    className: `${variable}-class`,
    variable,
  })),
  Source_Sans_3: vi.fn(({variable}: {variable: string}) => ({
    className: `${variable}-class`,
    variable,
  })),
  Noto_Serif_SC: vi.fn(({variable}: {variable: string}) => ({
    className: `${variable}-class`,
    variable,
  })),
  Noto_Sans_SC: vi.fn(({variable}: {variable: string}) => ({
    className: `${variable}-class`,
    variable,
  })),
}))

vi.mock('./globals.css', () => ({}))
vi.mock('next-intl', () => ({
  NextIntlClientProvider: ({children}: {children: unknown}) => children,
}))
vi.mock('next-intl/server', () => ({
  getMessages: vi.fn(async () => ({})),
}))
vi.mock('next/navigation', () => ({
  notFound: vi.fn(),
}))
vi.mock('@/i18n/config', () => ({
  locales: ['en', 'bm', 'zh'],
}))

const {fontBody, fontDisplay, fontZhBody, fontZhDisplay} = await import('./fonts')

describe('app fonts', () => {
  it('exports all approved font variables', () => {
    expect(fontDisplay.variable).toBe('--font-display')
    expect(fontBody.variable).toBe('--font-body')
    expect(fontZhDisplay.variable).toBe('--font-zh-display')
    expect(fontZhBody.variable).toBe('--font-zh-body')
  })

  it('keeps all font variables available for layout class composition', () => {
    expect(fontDisplay.className).toBeDefined()
    expect(fontBody.className).toBeDefined()
    expect(fontZhDisplay.className).toBeDefined()
    expect(fontZhBody.className).toBeDefined()
  })

  it('applies all shared font variables on the root html element', async () => {
    const {default: RootLayout} = await import('./layout')

    const element = await RootLayout({children: null})

    expect(element.props.lang).toBe('en')
    expect(element.props.className).toContain(fontBody.variable)
    expect(element.props.className).toContain(fontDisplay.variable)
    expect(element.props.className).toContain(fontZhBody.variable)
    expect(element.props.className).toContain(fontZhDisplay.variable)
  })

  it('propagates the active locale to the locale wrapper element', async () => {
    const {default: LocaleLayout} = await import('./[locale]/layout')

    const element = await LocaleLayout({
      children: 'content',
      params: Promise.resolve({locale: 'zh'}),
    })

    expect(element.props.lang).toBe('zh')
  })
})
