import type {Metadata} from 'next'
import Link from 'next/link'
import type {Locale} from '@/i18n/config'
import {Footer} from '@/components/Footer'
import {Header} from '@/components/Header'
import {buildLocaleAlternates} from '@/lib/seo/alternates'
import {buildSocialMetadata} from '@/lib/seo/metadata'
import {buildBreadcrumbSchema} from '@/lib/seo/schema'
import {getSiteUrl} from '@/lib/seo/siteUrl'
import {getPrograms, getSiteSettings} from '@/lib/sanity/read'
import {pickLocaleString, pickLocaleText} from '@/lib/sanity/resolveLocale'

const programsPageCopy: Record<
  Locale,
  {
    sectionLabel: string
    title: string
    intro: string
    modelLabel: string
    modelHeading: string
    modelBody: string
  }
> = {
  en: {
    sectionLabel: 'Programs',
    title: 'Programs',
    intro:
      'TXJ Care focuses on four pillars of practical support: homeless support, orphanage partnerships, elderly care, and rural community aid.',
    modelLabel: 'Connection model',
    modelHeading: 'TXJ Care Connection Model',
    modelBody:
      'We optimize resources across all programs and build a dignity-centered, circular support system between pillars.',
  },
  bm: {
    sectionLabel: 'Program',
    title: 'Program',
    intro:
      'TXJ Care memberi tumpuan kepada empat teras sokongan praktikal: sokongan gelandangan, kerjasama rumah anak yatim, penjagaan warga emas, dan bantuan komuniti luar bandar.',
    modelLabel: 'Model hubungan',
    modelHeading: 'Model Hubungan TXJ Care',
    modelBody:
      'Kami mengoptimumkan sumber merentasi semua program dan membina sistem sokongan berpusatkan maruah yang saling menghubungkan setiap teras.',
  },
  zh: {
    sectionLabel: '项目',
    title: '项目',
    intro: 'TXJ Care 专注于四大实际支援领域：流浪者援助、孤儿院合作、长者关怀，以及乡区社区援助。',
    modelLabel: '协作模式',
    modelHeading: 'TXJ Care 协作模式',
    modelBody: '我们统筹各项目资源，在不同支柱之间建立以尊严为核心、彼此连结的循环式支持体系。',
  },
}

const programsMetadataCopy: Record<Locale, {title: string; description: string}> = {
  en: {
    title: 'TXJ Care Programs | Support Pillars and Outreach Work',
    description:
      'Explore TXJ Care programs across homeless support, orphanage partnerships, elderly care, and rural community aid.',
  },
  bm: {
    title: 'Program TXJ Care | Teras Sokongan dan Kerja Lapangan',
    description:
      'Terokai program TXJ Care merangkumi sokongan gelandangan, kerjasama rumah anak yatim, penjagaan warga emas, dan bantuan komuniti luar bandar.',
  },
  zh: {
    title: 'TXJ Care 项目 | 支援支柱与社区外展工作',
    description: '探索 TXJ Care 在流浪者援助、孤儿院合作、长者关怀与乡区社区援助方面的项目工作。',
  },
}

const homeLabelByLocale: Record<Locale, string> = {
  en: 'Home',
  bm: 'Laman utama',
  zh: '首页',
}

export async function generateMetadata({params}: {params: Promise<{locale: Locale}>}): Promise<Metadata> {
  const {locale} = await params
  const copy = programsMetadataCopy[locale]

  return {
    title: copy.title,
    description: copy.description,
    alternates: buildLocaleAlternates('/programs', locale),
    ...buildSocialMetadata({
      title: copy.title,
      description: copy.description,
      path: `/${locale}/programs`,
    }),
  }
}

export default async function ProgramsPage({params}: {params: Promise<{locale: Locale}>}) {
  const {locale} = await params
  const settings = await getSiteSettings()
  const programs = await getPrograms()
  const copy = programsPageCopy[locale]
  const siteUrl = getSiteUrl()
  const breadcrumbSchema = buildBreadcrumbSchema([
    {name: homeLabelByLocale[locale], url: `${siteUrl}/${locale}`},
    {name: copy.title, url: `${siteUrl}/${locale}/programs`},
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
      <h1 style={{marginTop: 0}}>{copy.title}</h1>
      <p style={{maxWidth: 720}}>{copy.intro}</p>
      <div style={{marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16}}>
        {programs.map((p) => (
          <div key={p._id} style={{border: '1px solid rgba(0,0,0,0.12)', borderRadius: 12, padding: 16}}>
            <h2 style={{margin: 0}}>
              <Link href={`/${locale}/programs/${p.slug}`}>{pickLocaleString(p.name, locale)}</Link>
            </h2>
            <p style={{marginTop: 10}}>{pickLocaleText(p.summary, locale)}</p>
          </div>
        ))}
      </div>
      <section style={{marginTop: 40}}>
        <p style={{marginBottom: 8, fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase'}}>{copy.modelLabel}</p>
        <h2 style={{marginTop: 0}}>{copy.modelHeading}</h2>
        <p style={{maxWidth: 720}}>{copy.modelBody}</p>
      </section>
      <Footer locale={locale} settings={settings} />
    </main>
  )
}
