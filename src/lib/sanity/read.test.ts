import {beforeEach, describe, expect, it, vi} from 'vitest'

vi.mock('./client', () => ({
  getSanityReadClient: vi.fn(),
}))

const {getSanityReadClient} = await import('./client')
const {getProgramBySlug, getPrograms} = await import('./read')

describe('sanity read program fallbacks', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('returns a known fallback program when the Sanity client is unavailable', async () => {
    vi.mocked(getSanityReadClient).mockReturnValue(null)

    const program = await getProgramBySlug('rural')

    expect(program?.slug).toBe('rural')
    expect(program?.body?.en).toMatch(/rural communities/i)
  })

  it('returns fallback programs when Sanity has no program documents', async () => {
    const fetch = vi.fn().mockResolvedValue([])
    vi.mocked(getSanityReadClient).mockReturnValue({fetch} as never)

    const programs = await getPrograms()

    expect(programs.map((program) => program.slug)).toEqual([
      'elderly',
      'homeless',
      'orphanage',
      'rural',
    ])
  })

  it('prefers Sanity program content when a matching document exists', async () => {
    const fetch = vi.fn().mockResolvedValue({
      _id: 'sanity-program-homeless',
      slug: 'homeless',
      name: {en: 'Sanity Homeless Support'},
    })
    vi.mocked(getSanityReadClient).mockReturnValue({fetch} as never)

    const program = await getProgramBySlug('homeless')

    expect(program?.name?.en).toBe('Sanity Homeless Support')
  })
})
