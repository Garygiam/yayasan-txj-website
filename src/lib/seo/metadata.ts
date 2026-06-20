import type {Metadata} from 'next'
import type {Locale} from '@/i18n/config'
import {getSiteUrl} from './siteUrl'

type SocialMetadataInput = {
  title: string
  description: string
  path: string
}

const documentLanguageByLocale: Record<Locale, string> = {
  en: 'en-US',
  bm: 'ms-MY',
  zh: 'zh-CN',
}

export function buildSocialMetadata({
  title,
  description,
  path,
}: SocialMetadataInput): Pick<Metadata, 'openGraph' | 'twitter'> {
  const siteUrl = getSiteUrl()
  const url = `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`

  return {
    openGraph: {
      title,
      description,
      url,
      siteName: 'TXJ Care',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export function resolveDocumentLanguage(locale: string | null | undefined): string {
  if (!locale) {
    return documentLanguageByLocale.en
  }

  return documentLanguageByLocale[locale as Locale] ?? locale
}
