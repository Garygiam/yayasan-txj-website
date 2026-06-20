const PRODUCTION_FALLBACK = 'https://www.yayasantxj.org'

function normalizeSiteUrl(siteUrl: string) {
  return siteUrl.endsWith('/') ? siteUrl.slice(0, -1) : siteUrl
}

function isLocalSiteUrl(siteUrl: string) {
  try {
    const {hostname} = new URL(siteUrl)

    return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]'
  } catch {
    return /^https?:\/\/(?:localhost|127\.0\.0\.1|\[::1\])(?::\d+)?(?:\/|$)/i.test(siteUrl)
  }
}

export function getSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim()

  if (!configured) return PRODUCTION_FALLBACK

  const normalized = normalizeSiteUrl(configured)

  if (isLocalSiteUrl(normalized)) return PRODUCTION_FALLBACK

  return normalized
}
