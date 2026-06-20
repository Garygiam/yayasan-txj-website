import type {Locale} from '@/i18n/config'
import {getImpactStories, getPrograms, getSiteSettings} from '@/lib/sanity/read'
import {buildHomepageViewModel} from './normalize'

export async function getHomepageData(locale: Locale) {
  const [settings, programs, stories] = await Promise.all([
    getSiteSettings(),
    getPrograms(),
    getImpactStories(),
  ])

  return buildHomepageViewModel({
    locale,
    settings,
    programs,
    stories: stories.slice(0, 3),
  })
}
