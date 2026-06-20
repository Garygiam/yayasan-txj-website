import type {Metadata} from 'next'
import {GoogleAnalytics} from '@next/third-parties/google'
import {headers} from 'next/headers'
import './globals.css'
import {fontBody, fontDisplay, fontZhBody, fontZhDisplay} from './fonts'
import {buildSocialMetadata, resolveDocumentLanguage} from '@/lib/seo/metadata'
import {getSiteUrl} from '@/lib/seo/siteUrl'

const siteUrl = getSiteUrl()

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'TXJ Care',
  description: 'TXJ Care community support across Malaysia',
  ...buildSocialMetadata({
    title: 'TXJ Care',
    description: 'TXJ Care community support across Malaysia',
    path: '/',
  }),
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const requestHeaders = await headers()
  const documentLanguage = resolveDocumentLanguage(requestHeaders.get('X-NEXT-INTL-LOCALE'))
  const shouldLoadGoogleAnalytics = process.env.NODE_ENV === 'production'

  return (
    <html
      lang={documentLanguage}
      className={`${fontBody.variable} ${fontDisplay.variable} ${fontZhBody.variable} ${fontZhDisplay.variable}`}
    >
      <body>
        {children}
        {shouldLoadGoogleAnalytics ? <GoogleAnalytics gaId="G-83JXN5MCR7" /> : null}
      </body>
    </html>
  )
}
