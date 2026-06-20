import type {Locale} from '@/i18n/config'
import {buildTextToImageUrl} from '../images/textToImage'
import {pickLocaleString, pickLocaleText} from '../sanity/resolveLocale'
import type {ImpactStory, Program, SiteSettings} from '@/lib/sanity/types'
import type {HomepageViewModel} from './types'

const localeFormatByLocale: Record<Locale, string> = {
  en: 'en-US',
  bm: 'ms-MY',
  zh: 'zh-CN',
}

const homepageFallbackCopyByLocale: Record<
  Locale,
  {
    heroHeading: string
    heroSubheading: string
    trustItems: string[]
    primaryCtaLabel: string
    secondaryCtaLabel: string
    slideAlt: string
    urgentNeedsTitle: string
    urgentNeedsCtaLabel: string
    transparencyTitle: string
    founderTitle: string
  }
> = {
  en: {
    heroHeading: 'Building Bridges of Compassion Across Malaysia',
    heroSubheading: 'Youth-driven support for homeless, orphans, elderly & rural communities',
    trustItems: ['Youth-led', 'Practical aid', 'Transparent giving'],
    primaryCtaLabel: 'Donate Now',
    secondaryCtaLabel: 'Volunteer Today',
    slideAlt: 'TXJ Care community support',
    urgentNeedsTitle: 'Urgent Needs',
    urgentNeedsCtaLabel: 'Donate Essentials',
    transparencyTitle: 'How Help Works',
    founderTitle: 'Founder Spotlight',
  },
  bm: {
    heroHeading: 'Membina Jambatan Kasih Sayang di Seluruh Malaysia',
    heroSubheading: 'Sokongan dipacu belia untuk gelandangan, anak yatim, warga emas dan komuniti luar bandar',
    trustItems: ['Dipacu belia', 'Bantuan praktikal', 'Sumbangan telus'],
    primaryCtaLabel: 'Sumbang Sekarang',
    secondaryCtaLabel: 'Sertai Sebagai Sukarelawan',
    slideAlt: 'Sokongan komuniti TXJ Care',
    urgentNeedsTitle: 'Keperluan Mendesak',
    urgentNeedsCtaLabel: 'Sumbang Keperluan',
    transparencyTitle: 'Bagaimana Bantuan Disalurkan',
    founderTitle: 'Sorotan Pengasas',
  },
  zh: {
    heroHeading: '在马来西亚各地搭建关爱桥梁',
    heroSubheading: '由青年推动，为流浪者、孤儿、长者与乡区社区提供支持',
    trustItems: ['青年推动', '务实援助', '透明捐助'],
    primaryCtaLabel: '立即捐助',
    secondaryCtaLabel: '立即加入志愿服务',
    slideAlt: 'TXJ Care 社区支持',
    urgentNeedsTitle: '紧急需求',
    urgentNeedsCtaLabel: '捐助物资',
    transparencyTitle: '援助如何落实',
    founderTitle: '创办人介绍',
  },
}

function formatStat(locale: Locale, value: number, suffix = ''): string {
  return `${new Intl.NumberFormat(localeFormatByLocale[locale]).format(value)}${suffix}`
}

export function buildHomepageViewModel({
  locale,
  settings,
  programs,
  stories,
}: {
  locale: Locale
  settings: SiteSettings | null
  programs: Program[]
  stories: ImpactStory[]
}): HomepageViewModel {
  const homepageSettings = settings ?? {}
  const fallbackCopy = homepageFallbackCopyByLocale[locale]

  const heroHeading = pickLocaleString(homepageSettings.homeHeroHeadline, locale) || fallbackCopy.heroHeading
  const heroSubheading = pickLocaleText(homepageSettings.homeHeroSubheadline, locale) || fallbackCopy.heroSubheading

  const slides =
    homepageSettings.homeHeroSlides?.map((slide) => ({
      id: slide._key,
      eyebrow: pickLocaleString(slide.eyebrow, locale),
      alt: pickLocaleString(slide.alt, locale) || fallbackCopy.slideAlt,
      imageUrl: buildTextToImageUrl(
        slide.imagePrompt || 'TXJ Care community support in Malaysia',
        'landscape_16_9',
      ),
    })) ?? []

  const stats =
    homepageSettings.homeStats?.map((stat) => ({
      value: formatStat(locale, stat.value, stat.suffix),
      label: pickLocaleString(stat.label, locale),
    })) ?? []

  const transparencySteps =
    homepageSettings.homeTransparencySteps
      ?.map((step) => ({
        id: step._key,
        title: pickLocaleString(step.title, locale),
        description: pickLocaleText(step.description, locale),
      }))
      .filter((step) => step.title || step.description) ?? []

  const founderTitle = pickLocaleString(homepageSettings.founderSpotlightTitle, locale)
  const founderSummary = pickLocaleText(homepageSettings.founderSpotlightSummary, locale)
  const founderQuote = pickLocaleText(homepageSettings.founderQuote, locale)

  return {
    hero: {
      heading: heroHeading,
      subheading: heroSubheading,
      trustItems: fallbackCopy.trustItems,
      primaryCta: {label: fallbackCopy.primaryCtaLabel, href: `/${locale}/donate`},
      secondaryCta: {label: fallbackCopy.secondaryCtaLabel, href: `/${locale}/get-involved`},
      slides,
    },
    stats,
    urgentNeeds:
      homepageSettings.urgentNeedsItems && homepageSettings.urgentNeedsItems.length > 0
        ? {
            title: pickLocaleString(homepageSettings.urgentNeedsTitle, locale) || fallbackCopy.urgentNeedsTitle,
            items: homepageSettings.urgentNeedsItems,
            ctaLabel:
              pickLocaleString(homepageSettings.urgentNeedsCtaLabel, locale) || fallbackCopy.urgentNeedsCtaLabel,
            ctaHref: homepageSettings.urgentNeedsCtaLink || `/${locale}/donate`,
          }
        : null,
    pillars: programs.map((program) => ({
      id: program._id,
      slug: program.slug,
      title: pickLocaleString(program.name, locale),
      summary: pickLocaleText(program.summary, locale),
      href: `/${locale}/programs/${program.slug}`,
    })),
    transparency:
      transparencySteps.length > 0
        ? {
            title: pickLocaleString(homepageSettings.homeTransparencyTitle, locale) || fallbackCopy.transparencyTitle,
            steps: transparencySteps,
          }
        : null,
    founder:
      founderTitle || founderSummary || founderQuote
        ? {
            title: founderTitle || fallbackCopy.founderTitle,
            summary: founderSummary,
            quote: founderQuote,
            imageUrl: null,
            href: `/${locale}/about`,
          }
        : null,
    latestUpdates: stories.slice(0, 3).map((story) => ({
      id: story._id,
      slug: story.slug,
      title: pickLocaleString(story.title, locale),
      summary: pickLocaleText(story.body, locale),
      href: `/${locale}/impact`,
      publishedAt: story.publishedAt || '',
    })),
    finalCtas:
      homepageSettings.homeFinalCtas?.map((cta) => ({
        id: cta._key,
        label: pickLocaleString(cta.label, locale),
        body: pickLocaleText(cta.body, locale),
        href: cta.href,
      })) ?? [],
  }
}
