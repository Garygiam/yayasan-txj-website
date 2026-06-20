import {describe, expect, it} from 'vitest'
import {getFallbackProgramBySlug, getFallbackPrograms} from './fallbackPrograms'

describe('fallbackPrograms', () => {
  it('returns the built-in homeless program', () => {
    const program = getFallbackProgramBySlug('homeless')

    expect(program?.slug).toBe('homeless')
    expect(program?.name?.en).toBe('Homeless Support')
  })

  it('provides localized copy for fallback programs', () => {
    const program = getFallbackProgramBySlug('homeless')

    expect(program?.name?.bm).toBeTruthy()
    expect(program?.name?.zh).toBeTruthy()
    expect(program?.summary?.bm).toBeTruthy()
    expect(program?.summary?.zh).toBeTruthy()
    expect(program?.body?.bm).toBeTruthy()
    expect(program?.body?.zh).toBeTruthy()
  })

  it('returns all four known fallback programs', () => {
    expect(getFallbackPrograms().map((program) => program.slug)).toEqual([
      'elderly',
      'homeless',
      'orphanage',
      'rural',
    ])
  })

  it('returns null for an unknown slug', () => {
    expect(getFallbackProgramBySlug('unknown-slug')).toBeNull()
  })
})
