import type {Locale} from '../../../i18n/config'
import {pickLocaleString, pickLocaleText} from '../../../lib/sanity/resolveLocale'
import type {ImpactStory} from '../../../lib/sanity/types'

type GalleryImage = {
  id: string
  src: string
  alt: string
  storyTitle: string
}

type StoryCard = {
  id: string
  title: string
  excerpt: string
  image: GalleryImage | null
}

function toExcerpt(text: string) {
  return text.length > 180 ? `${text.slice(0, 177).trimEnd()}...` : text
}

export function buildImpactPageViewModel({
  locale,
  stories,
}: {
  locale: Locale
  stories: ImpactStory[]
}): {
  galleryImages: GalleryImage[]
  storyCards: StoryCard[]
} {
  const galleryImages = stories.flatMap((story) => {
    const title = pickLocaleString(story.title, locale) || 'Impact story'

    return (story.gallery ?? [])
      .filter((image) => Boolean(image.asset?.url))
      .map((image) => ({
        id: `${story._id}-${image._key ?? image.asset?._ref ?? 'image'}`,
        storyTitle: title,
        src: image.asset?.url ?? '',
        alt: image.alt || `${title} gallery image`,
      }))
  })

  const storyCards = stories.map((story) => {
    const title = pickLocaleString(story.title, locale) || 'Impact story'
    const body = pickLocaleText(story.body, locale) || ''
    const firstImage = galleryImages.find((image) => image.id.startsWith(`${story._id}-`)) ?? null

    return {
      id: story._id,
      title,
      excerpt: toExcerpt(body),
      image: firstImage,
    }
  })

  return {galleryImages, storyCards}
}
