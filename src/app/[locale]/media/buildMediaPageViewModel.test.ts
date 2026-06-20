import {describe, expect, it} from 'vitest'
import {buildMediaPageViewModel} from './buildMediaPageViewModel'

describe('buildMediaPageViewModel', () => {
  const localizedLabels = {
    readArticleLabel: 'Baca artikel',
    unavailableLabel: 'Pautan akan tersedia tidak lama lagi',
    coverageImageAltSuffix: 'imej liputan',
  }

  it('marks entries with links as external article cards', () => {
    const viewModel = buildMediaPageViewModel(
      [
        {
          id: 'bernama-2026-06-01',
          title: 'Yayasan TXJ Malaysia brings direct aid to rural communities',
          publication: 'Bernama',
          publishedAt: '2026-06-01',
          summary: 'A local feature on rural outreach and practical field support.',
          imageSrc: '/media/bernama-2026-06-01.jpg',
          imageAlt: 'Bernama newspaper clipping featuring Yayasan TXJ Malaysia',
          url: 'https://example.com/bernama-txj',
        },
      ],
      localizedLabels,
    )

    expect(viewModel.cards[0]).toMatchObject({
      title: 'Yayasan TXJ Malaysia brings direct aid to rural communities',
      hasImage: true,
      actionLabel: 'Baca artikel',
      url: 'https://example.com/bernama-txj',
    })
  })

  it('turns missing images and links into safe fallback UI states', () => {
    const viewModel = buildMediaPageViewModel(
      [
        {
          id: 'sinar-2026-06-02',
          title: 'Community volunteers extend practical support across Selangor',
          publication: 'Sinar Harian',
          publishedAt: '',
          summary: 'Coverage of volunteer outreach and on-the-ground coordination.',
          imageSrc: '',
          imageAlt: '',
          url: '',
        },
      ],
      localizedLabels,
    )

    expect(viewModel.cards[0]).toMatchObject({
      hasImage: false,
      placeholderLabel: 'Sinar Harian',
      actionLabel: 'Pautan akan tersedia tidak lama lagi',
      url: '',
      imageAlt: 'Sinar Harian imej liputan',
    })
  })
})
