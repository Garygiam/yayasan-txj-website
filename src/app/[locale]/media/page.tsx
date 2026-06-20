import type {Metadata} from 'next'
import Image from 'next/image'
import type {Locale} from '@/i18n/config'
import {Footer} from '@/components/Footer'
import {Header} from '@/components/Header'
import {mediaEntries} from '@/lib/media/mediaEntries'
import {buildLocaleAlternates} from '@/lib/seo/alternates'
import {getSiteSettings} from '@/lib/sanity/read'
import {buildMediaPageViewModel} from './buildMediaPageViewModel'
import styles from './MediaPage.module.css'

const mediaPageCopy: Record<
  Locale,
  {
    sectionLabel: string
    title: string
    heroLead: string
    heroBody: string
    coverageLabel: string
    coverageHeading: string
    coverageBody: string
    readArticleLabel: string
    unavailableLabel: string
    coverageImageAltSuffix: string
  }
> = {
  en: {
    sectionLabel: 'Media',
    title: 'Media',
    heroLead: 'Newspaper coverage and public mentions',
    heroBody:
      'A dedicated archive for newspaper clippings, public mentions, and related media coverage connected to community-facing service work.',
    coverageLabel: 'Coverage',
    coverageHeading: 'Press coverage',
    coverageBody:
      'Browse the published clippings that have already been saved for launch, with live links added wherever a public article page is available.',
    readArticleLabel: 'Read article',
    unavailableLabel: 'Link available soon',
    coverageImageAltSuffix: 'coverage image',
  },
  bm: {
    sectionLabel: 'Media',
    title: 'Media',
    heroLead: 'Liputan akhbar dan sebutan awam',
    heroBody:
      'Arkib khas untuk keratan akhbar, sebutan awam, dan liputan media berkaitan kerja khidmat komuniti.',
    coverageLabel: 'Liputan',
    coverageHeading: 'Liputan akhbar',
    coverageBody:
      'Semak keratan akhbar yang telah disimpan untuk pelancaran ini, dengan pautan awam ditambah apabila halaman artikel tersedia.',
    readArticleLabel: 'Baca artikel',
    unavailableLabel: 'Pautan akan tersedia tidak lama lagi',
    coverageImageAltSuffix: 'imej liputan',
  },
  zh: {
    sectionLabel: '媒体',
    title: '媒体',
    heroLead: '报章报道与公开提及',
    heroBody: '集中整理已保存的报章剪报、公开提及与相关媒体记录，方便统一展示。',
    coverageLabel: '报道',
    coverageHeading: '媒体报道',
    coverageBody: '当前先展示已保存的剪报素材；只要找到公开文章页面，就会补上外部链接。',
    readArticleLabel: '阅读文章',
    unavailableLabel: '链接即将补上',
    coverageImageAltSuffix: '报道图片',
  },
}

const mediaMetadataCopy: Record<Locale, {title: string; description: string}> = {
  en: {
    title: 'TXJ Care Media | Newspaper Coverage and Public Mentions',
    description:
      'Browse TXJ Care newspaper coverage, public mentions, and media highlights connected to community service work.',
  },
  bm: {
    title: 'Media TXJ Care | Liputan Akhbar dan Sebutan Awam',
    description:
      'Lihat liputan akhbar, sebutan awam, dan sorotan media TXJ Care yang berkaitan dengan kerja khidmat komuniti.',
  },
  zh: {
    title: 'TXJ Care 媒体 | 报章报道与公开提及',
    description: '浏览与社区服务工作相关的 TXJ Care 报章报道、公开提及与媒体亮点。',
  },
}

export async function generateMetadata({params}: {params: Promise<{locale: Locale}>}): Promise<Metadata> {
  const {locale} = await params
  const copy = mediaMetadataCopy[locale]

  return {
    title: copy.title,
    description: copy.description,
    alternates: buildLocaleAlternates('/media', locale),
  }
}

export default async function MediaPage({params}: {params: Promise<{locale: Locale}>}) {
  const {locale} = await params
  const settings = await getSiteSettings()
  const copy = mediaPageCopy[locale]
  const viewModel = buildMediaPageViewModel(mediaEntries, {
    readArticleLabel: copy.readArticleLabel,
    unavailableLabel: copy.unavailableLabel,
    coverageImageAltSuffix: copy.coverageImageAltSuffix,
  })

  return (
    <main className={styles.pageShell}>
      <Header locale={locale} />

      <div className={styles.pageFlow}>
        <section className={styles.heroCard}>
          <p className={styles.sectionLabel}>{copy.sectionLabel}</p>
          <h1>{copy.title}</h1>
          <p className={styles.heroLead}>{copy.heroLead}</p>
          <p className={styles.heroBody}>{copy.heroBody}</p>
        </section>

        <section className={styles.sectionCard} aria-labelledby="media-coverage-heading">
          <p className={styles.sectionLabel}>{copy.coverageLabel}</p>
          <h2 id="media-coverage-heading">{copy.coverageHeading}</h2>
          <p className={styles.sectionBody}>{copy.coverageBody}</p>

          <div className={styles.cardGrid}>
            {viewModel.cards.map((card) => (
              <article key={card.id} className={styles.card} data-testid="media-card">
                {card.hasImage ? (
                  <div className={styles.cardImageWrap}>
                    <Image
                      src={card.imageSrc}
                      alt={card.imageAlt}
                      width={960}
                      height={720}
                      sizes="(max-width: 800px) 100vw, (max-width: 1120px) 50vw, 340px"
                      className={styles.cardImage}
                    />
                  </div>
                ) : (
                  <div className={styles.cardPlaceholder}>
                    <strong>{card.placeholderLabel}</strong>
                    <span>{card.title}</span>
                  </div>
                )}

                <div className={styles.cardBody}>
                  <div className={styles.cardMeta}>
                    <span>{card.publication}</span>
                    {card.publishedAt ? <span>{card.publishedAt}</span> : null}
                  </div>

                  <h3>{card.title}</h3>
                  <p>{card.summary}</p>

                  {card.hasUrl ? (
                    <a href={card.url} target="_blank" rel="noreferrer" className={styles.cardLink}>
                      {card.actionLabel}
                    </a>
                  ) : (
                    <span className={styles.cardHint}>{copy.unavailableLabel}</span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      <Footer locale={locale} settings={settings} />
    </main>
  )
}
