export type LocaleKey = 'en' | 'bm' | 'zh'

export type LocaleString = Partial<Record<LocaleKey, string>>
export type LocaleText = Partial<Record<LocaleKey, string>>

export type SiteSettings = {
  officialName?: string
  brandName?: string
  tagline?: LocaleString
  vision?: LocaleText
  mission?: LocaleText
  philosophy?: LocaleText
  founderName?: string
  contactPhone?: string
  contactEmail?: string
  contactAddress?: string
  websiteUrl?: string
  homeHeroHeadline?: LocaleString
  homeHeroSubheadline?: LocaleText
  homeHeroSlides?: Array<{
    _key: string
    eyebrow?: LocaleString
    alt?: LocaleString
    imagePrompt: string
  }>
  homeStats?: Array<{
    _key: string
    value: number
    suffix?: string
    label?: LocaleString
  }>
  urgentNeedsTitle?: LocaleString
  urgentNeedsItems?: string[]
  urgentNeedsCtaLabel?: LocaleString
  urgentNeedsCtaLink?: string
  homeTransparencyTitle?: LocaleString
  homeTransparencySteps?: Array<{
    _key: string
    title?: LocaleString
    description?: LocaleText
  }>
  founderSpotlightTitle?: LocaleString
  founderSpotlightSummary?: LocaleText
  founderQuote?: LocaleText
  homeFinalCtaTitle?: LocaleString
  homeFinalCtas?: Array<{
    _key: string
    label?: LocaleString
    body?: LocaleText
    href: string
  }>
}

export type Program = {
  _id: string
  slug: string
  name?: LocaleString
  summary?: LocaleText
  body?: LocaleText
  howToHelp?: LocaleText
  logisticsNotes?: LocaleText
}

export type ImpactStory = {
  _id: string
  slug: string
  title?: LocaleString
  body?: LocaleText
  publishedAt?: string
  gallery?: Array<{
    _key?: string
    asset?: {
      _ref: string
      url?: string
    }
    alt?: string
  }>
}

export type LeadershipMember = {
  _id: string
  name: string
  title?: LocaleString
  group: 'board' | 'management'
  displayOrder?: number
  photo?: {
    asset?: {
      _ref: string
    }
  }
  shortBio?: LocaleText
  isFeatured?: boolean
}
