const LOCALHOST_FALLBACK = 'http://localhost:3000'

export function getSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim()

  if (!configured) return LOCALHOST_FALLBACK

  return configured.endsWith('/') ? configured.slice(0, -1) : configured
}
