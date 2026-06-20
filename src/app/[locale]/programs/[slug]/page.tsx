import type {Metadata} from 'next'
import Link from 'next/link'
import {notFound} from 'next/navigation'
import type {Locale} from '@/i18n/config'
import {Footer} from '@/components/Footer'
import {Header} from '@/components/Header'
import {buildLocaleAlternates} from '@/lib/seo/alternates'
import {buildSocialMetadata} from '@/lib/seo/metadata'
import {buildBreadcrumbSchema} from '@/lib/seo/schema'
import {getSiteUrl} from '@/lib/seo/siteUrl'
import {getProgramBySlug, getSiteSettings} from '@/lib/sanity/read'
import {pickLocaleString, pickLocaleText} from '@/lib/sanity/resolveLocale'

const programDetailPageCopy: Record<
  Locale,
  {
    sectionLabel: string
    helperCopy: string
    howToHelpHeading: string
    logisticsHeading: string
    backToPrograms: string
  }
> = {
  en: {
    sectionLabel: 'Programs',
    helperCopy: 'See how this program turns practical compassion into steady community support.',
    howToHelpHeading: 'How to help',
    logisticsHeading: 'Logistics & distribution',
    backToPrograms: 'Back to programs',
  },
  bm: {
    sectionLabel: 'Program',
    helperCopy: 'Lihat bagaimana program ini menterjemah belas ihsan praktikal kepada sokongan komuniti yang berterusan.',
    howToHelpHeading: 'Cara membantu',
    logisticsHeading: 'Logistik dan pengagihan',
    backToPrograms: 'Kembali ke program',
  },
  zh: {
    sectionLabel: '项目',
    helperCopy: '了解这个项目如何把实际关怀转化为持续稳定的社区支持。',
    howToHelpHeading: '如何提供帮助',
    logisticsHeading: '物流与分发',
    backToPrograms: '返回项目列表',
  },
}

const homeLabelByLocale: Record<Locale, string> = {
  en: 'Home',
  bm: 'Laman utama',
  zh: '首页',
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: Locale; slug: string}>
}): Promise<Metadata> {
  const {locale, slug} = await params
  const program = await getProgramBySlug(slug)

  if (!program) {
    return {
      title: 'Programs | TXJ Care',
      alternates: buildLocaleAlternates(`/programs/${slug}`, locale),
    }
  }

  const title = pickLocaleString(program.name, locale)
  const description = pickLocaleText(program.body, locale) ?? pickLocaleText(program.summary, locale) ?? ''
  const fullTitle = `${title} | TXJ Care`

  return {
    title: fullTitle,
    description,
    alternates: buildLocaleAlternates(`/programs/${slug}`, locale),
    ...buildSocialMetadata({
      title: fullTitle,
      description,
      path: `/${locale}/programs/${slug}`,
    }),
  }
}

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{locale: Locale; slug: string}>
}) {
  const {locale, slug} = await params
  const settings = await getSiteSettings()
  const program = await getProgramBySlug(slug)
  if (!program) notFound()

  const title = pickLocaleString(program.name, locale)
  const body = pickLocaleText(program.body, locale)
  const howToHelp = pickLocaleText(program.howToHelp, locale)
  const logistics = pickLocaleText(program.logisticsNotes, locale)
  const copy = programDetailPageCopy[locale]
  const siteUrl = getSiteUrl()
  const breadcrumbSchema = buildBreadcrumbSchema([
    {name: homeLabelByLocale[locale], url: `${siteUrl}/${locale}`},
    {name: copy.sectionLabel, url: `${siteUrl}/${locale}/programs`},
    {name: title, url: `${siteUrl}/${locale}/programs/${slug}`},
  ])

  return (
    <main style={{maxWidth: 960, margin: '0 auto', padding: '48px 16px'}}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c')}}
      />
      <Header locale={locale} />
      <p style={{marginTop: 40, marginBottom: 8, fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase'}}>
        {copy.sectionLabel}
      </p>
      <p style={{margin: 0}}>
        <Link href={`/${locale}/programs`}>{copy.backToPrograms}</Link>
      </p>
      <h1 style={{marginTop: 20}}>{title}</h1>
      <p style={{maxWidth: 800}}>{copy.helperCopy}</p>
      {body ? <p style={{maxWidth: 800}}>{body}</p> : null}
      {howToHelp ? (
        <>
          <h2>{copy.howToHelpHeading}</h2>
          <p style={{maxWidth: 800}}>{howToHelp}</p>
        </>
      ) : null}
      {logistics ? (
        <>
          <h2>{copy.logisticsHeading}</h2>
          <p style={{maxWidth: 800}}>{logistics}</p>
        </>
      ) : null}
      <Footer locale={locale} settings={settings} />
    </main>
  )
}
