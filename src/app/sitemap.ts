import type {MetadataRoute} from 'next'
import {locales} from '@/i18n/config'
import {getFallbackPrograms} from '@/lib/programs/fallbackPrograms'
import {getSiteUrl} from '@/lib/seo/siteUrl'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl()
  const staticRoutes = [
    '',
    '/about',
    '/programs',
    '/impact',
    '/get-involved',
    '/donate',
    '/contact',
    '/media',
  ]
  const teamRoutes = ['/about/team/gary-giam']
  const programRoutes = getFallbackPrograms().map((program) => `/programs/${program.slug}`)
  const routes = [...staticRoutes, ...teamRoutes, ...programRoutes]

  return locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${base}/${locale}${route}`,
      lastModified: new Date(),
    })),
  )
}
