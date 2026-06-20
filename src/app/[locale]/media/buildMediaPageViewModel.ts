import type {MediaEntry} from '@/lib/media/mediaEntries'

export type MediaPageViewModelLabels = {
  readArticleLabel: string
  unavailableLabel: string
  coverageImageAltSuffix: string
}

export type MediaCardModel = {
  id: string
  title: string
  publication: string
  publishedAt: string
  summary: string
  imageSrc: string
  imageAlt: string
  hasImage: boolean
  placeholderLabel: string
  url: string
  hasUrl: boolean
  actionLabel: string
}

export function buildMediaPageViewModel(entries: MediaEntry[], labels: MediaPageViewModelLabels) {
  return {
    cards: entries.map((entry) => {
      const hasImage = Boolean(entry.imageSrc)
      const hasUrl = Boolean(entry.url)

      return {
        id: entry.id,
        title: entry.title,
        publication: entry.publication,
        publishedAt: entry.publishedAt,
        summary: entry.summary,
        imageSrc: entry.imageSrc,
        imageAlt: entry.imageAlt || `${entry.publication} ${labels.coverageImageAltSuffix}`,
        hasImage,
        placeholderLabel: entry.publication,
        url: entry.url,
        hasUrl,
        actionLabel: hasUrl ? labels.readArticleLabel : labels.unavailableLabel,
      }
    }),
  }
}
