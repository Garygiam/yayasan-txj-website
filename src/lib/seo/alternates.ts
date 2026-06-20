import {locales, type Locale} from '@/i18n/config'
import {getSiteUrl} from './siteUrl'

function normalizeRoute(route: string) {
  if (route === '/') return ''

  return route.startsWith('/') ? route : `/${route}`
}

export function buildLocaleAlternates(route: string, currentLocale: Locale) {
  const siteUrl = getSiteUrl()
  const normalizedRoute = normalizeRoute(route)

  return {
    canonical: `${siteUrl}/${currentLocale}${normalizedRoute}`,
    languages: Object.fromEntries(
      locales.map((locale) => [locale, `${siteUrl}/${locale}${normalizedRoute}`]),
    ) as Record<Locale, string>,
  }
}
