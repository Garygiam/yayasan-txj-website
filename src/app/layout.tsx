import type {Metadata} from 'next'
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

  return (
    <html
      lang={documentLanguage}
      className={`${fontBody.variable} ${fontDisplay.variable} ${fontZhBody.variable} ${fontZhDisplay.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
