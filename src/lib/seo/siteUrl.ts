const PRODUCTION_FALLBACK = 'https://www.yayasantxj.org'

export function getSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim()

  if (!configured) return PRODUCTION_FALLBACK

  return configured.endsWith('/') ? configured.slice(0, -1) : configured
}
