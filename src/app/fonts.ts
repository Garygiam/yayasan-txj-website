import {
  Cormorant_Garamond,
  Noto_Sans_SC,
  Noto_Serif_SC,
  Source_Sans_3,
} from 'next/font/google'

export const fontDisplay = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

export const fontBody = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

export const fontZhDisplay = Noto_Serif_SC({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-zh-display',
  display: 'swap',
})

export const fontZhBody = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-zh-body',
  display: 'swap',
})
