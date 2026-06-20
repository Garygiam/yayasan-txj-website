import type {Metadata} from 'next'
import Image from 'next/image'
import Link from 'next/link'
import type {Locale} from '@/i18n/config'
import {Footer} from '@/components/Footer'
import {Header} from '@/components/Header'
import {buildLocaleAlternates} from '@/lib/seo/alternates'
import {getImpactStories, getSiteSettings} from '@/lib/sanity/read'
import {buildImpactPageViewModel} from './normalizeImpactStories'
import styles from './ImpactPage.module.css'

const impactPageCopy: Record<
  Locale,
  {
    sectionLabel: string
    title: string
    heroLead: string
    heroBody: string
    heroStats: [string, string, string]
    heroPlaceholderTitle: string
    heroPlaceholderBody: string
    donateCta: string
    galleryLabel: string
    galleryHeading: string
    galleryBody: string
    galleryPlaceholderTitle: string
    galleryPlaceholderBody: string
    storiesLabel: string
    storiesHeading: string
    storyPlaceholderTitle: string
    storyPlaceholderBody: string
    storyBodyFallback: string
    supportLabel: string
    donateHeading: string
    donateBody: string
    donateLinkLabel: string
  }
> = {
  en: {
    sectionLabel: 'Impact',
    title: 'Impact',
    heroLead: 'Real stories and moments of care across Malaysia',
    heroBody:
      'Explore the photos and stories behind TXJ Care’s work across communities, outreach, and practical support.',
    heroStats: ['Community outreach', 'Practical care', 'Stories from the ground'],
    heroPlaceholderTitle: 'More impact stories are on the way',
    heroPlaceholderBody:
      'Fresh gallery images will appear here as the next field updates are published.',
    donateCta: 'Donate now',
    galleryLabel: 'Gallery',
    galleryHeading: 'Impact gallery',
    galleryBody:
      'A living gallery of outreach moments, volunteer action, and practical support shared from the field.',
    galleryPlaceholderTitle: 'Gallery updates incoming',
    galleryPlaceholderBody:
      'This section stays ready for new photos even when the latest story entries do not include images yet.',
    storiesLabel: 'Stories',
    storiesHeading: 'Stories of impact',
    storyPlaceholderTitle: 'Impact updates continue across the field',
    storyPlaceholderBody:
      'Story cards appear here as new outreach reports and reflections are published by the team.',
    storyBodyFallback: 'Story details will be added soon.',
    supportLabel: 'Support this work',
    donateHeading: 'Help turn these moments of care into more impact',
    donateBody:
      'Donations help move essentials, logistics, and practical support to the communities featured above.',
    donateLinkLabel: 'Go to donate',
  },
  bm: {
    sectionLabel: 'Impak',
    title: 'Impak',
    heroLead: 'Kisah benar dan detik keprihatinan di seluruh Malaysia',
    heroBody:
      'Terokai foto dan kisah di sebalik usaha TXJ Care merentasi komuniti, misi lapangan, dan sokongan praktikal.',
    heroStats: ['Jangkauan komuniti', 'Bantuan praktikal', 'Kisah dari lapangan'],
    heroPlaceholderTitle: 'Lebih banyak kisah impak akan menyusul',
    heroPlaceholderBody:
      'Imej galeri baharu akan muncul di sini apabila kemas kini lapangan seterusnya diterbitkan.',
    donateCta: 'Derma sekarang',
    galleryLabel: 'Galeri',
    galleryHeading: 'Galeri impak',
    galleryBody:
      'Galeri yang sentiasa berkembang dengan detik bantuan lapangan, tindakan sukarelawan, dan sokongan praktikal.',
    galleryPlaceholderTitle: 'Kemas kini galeri akan datang',
    galleryPlaceholderBody:
      'Ruang ini kekal sedia untuk foto baharu walaupun entri cerita terkini belum mempunyai imej.',
    storiesLabel: 'Kisah',
    storiesHeading: 'Kisah impak',
    storyPlaceholderTitle: 'Kemaskini impak terus berjalan di lapangan',
    storyPlaceholderBody:
      'Kad cerita akan muncul di sini apabila laporan lapangan dan refleksi baharu diterbitkan oleh pasukan.',
    storyBodyFallback: 'Butiran kisah akan ditambah tidak lama lagi.',
    supportLabel: 'Sokong usaha ini',
    donateHeading: 'Bantu jadikan detik keprihatinan ini kepada lebih banyak impak',
    donateBody:
      'Sumbangan membantu menggerakkan keperluan asas, logistik, dan sokongan praktikal ke komuniti di atas.',
    donateLinkLabel: 'Pergi ke derma',
  },
  zh: {
    sectionLabel: '影响力',
    title: '影响力',
    heroLead: '来自马来西亚各地的真实故事与关怀时刻',
    heroBody:
      '透过照片与故事，看见 TXJ Care 在社区关怀、外展行动与实际援助中的每一步。',
    heroStats: ['社区外展', '实际援助', '来自一线的故事'],
    heroPlaceholderTitle: '更多影响力故事即将更新',
    heroPlaceholderBody: '当新的前线内容发布后，这里会补上最新的画面与记录。',
    donateCta: '立即捐助',
    galleryLabel: '画廊',
    galleryHeading: '影响力画廊',
    galleryBody: '持续更新的图像画廊，记录外展行动、志愿者投入与实际支援的现场时刻。',
    galleryPlaceholderTitle: '画廊内容即将补充',
    galleryPlaceholderBody: '即使最新故事暂时没有图片，这个区域也会为后续图像内容保留完整版位。',
    storiesLabel: '故事',
    storiesHeading: '影响力故事',
    storyPlaceholderTitle: '前线影响力更新仍在持续',
    storyPlaceholderBody: '当团队发布新的外展报告与反思后，故事卡片会显示在这里。',
    storyBodyFallback: '故事内容将很快补上。',
    supportLabel: '支持这项工作',
    donateHeading: '让这些关怀时刻转化为更多实际影响',
    donateBody: '每一笔捐助都能帮助物资、后勤与实际支援送到上方所呈现的社区之中。',
    donateLinkLabel: '前往捐助',
  },
}

const impactMetadataCopy: Record<Locale, {title: string; description: string}> = {
  en: {
    title: 'TXJ Care Impact | Real Stories and Practical Results',
    description:
      'See how TXJ Care turns donations and outreach into practical support through stories, photos, and field updates.',
  },
  bm: {
    title: 'Impak TXJ Care | Kisah Benar dan Hasil Praktikal',
    description:
      'Lihat bagaimana TXJ Care menukar sumbangan dan outreach kepada sokongan praktikal melalui kisah, foto, dan kemas kini lapangan.',
  },
  zh: {
    title: 'TXJ Care 影响力 | 真实故事与实际成果',
    description: '透过故事、照片与前线更新，了解 TXJ Care 如何把捐助与外展行动转化为实际支援。',
  },
}

export async function generateMetadata({params}: {params: Promise<{locale: Locale}>}): Promise<Metadata> {
  const {locale} = await params
  const copy = impactMetadataCopy[locale]

  return {
    title: copy.title,
    description: copy.description,
    alternates: buildLocaleAlternates('/impact', locale),
  }
}

export default async function ImpactPage({params}: {params: Promise<{locale: Locale}>}) {
  const {locale} = await params
  const [settings, stories] = await Promise.all([getSiteSettings(), getImpactStories()])
  const viewModel = buildImpactPageViewModel({locale, stories})
  const copy = impactPageCopy[locale]
  const heroImage = viewModel.galleryImages[0] ?? null
  const galleryTiles =
    viewModel.galleryImages.length > 0
      ? viewModel.galleryImages
      : [
          {
            id: 'gallery-placeholder',
            storyTitle: copy.galleryPlaceholderTitle,
            alt: copy.galleryPlaceholderTitle,
            src: '',
          },
        ]
  const storyCards =
    viewModel.storyCards.length > 0
      ? viewModel.storyCards
      : [
          {
            id: 'story-placeholder',
            title: copy.storyPlaceholderTitle,
            excerpt: copy.storyPlaceholderBody,
            image: null,
          },
        ]

  return (
    <main className={styles.pageShell}>
      <Header locale={locale} />

      <div className={styles.pageFlow}>
        <section className={styles.heroCard}>
          <div className={styles.heroLayout}>
            <div className={styles.heroContent}>
              <p className={styles.sectionLabel}>{copy.sectionLabel}</p>
              <h1>{copy.title}</h1>
              <p className={styles.heroLead}>{copy.heroLead}</p>
              <p className={styles.heroBody}>{copy.heroBody}</p>
              <ul className={styles.heroStats}>
                {copy.heroStats.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link href={`/${locale}/donate`} className={styles.heroCta}>
                {copy.donateCta}
              </Link>
            </div>

            <div className={styles.heroMedia}>
              {heroImage ? (
                <div className={styles.heroImageWrap}>
                  <Image
                    src={heroImage.src}
                    alt={heroImage.alt}
                    width={1200}
                    height={825}
                    sizes="(max-width: 900px) 100vw, 42vw"
                    className={styles.heroImage}
                    priority
                    unoptimized
                  />
                </div>
              ) : (
                <div className={styles.heroImageFallback}>
                  <strong>{copy.heroPlaceholderTitle}</strong>
                  <p>{copy.heroPlaceholderBody}</p>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className={styles.gallerySection} aria-labelledby="impact-gallery-heading">
          <p className={styles.sectionLabel}>{copy.galleryLabel}</p>
          <h2 id="impact-gallery-heading">{copy.galleryHeading}</h2>
          <p className={styles.sectionBody}>{copy.galleryBody}</p>

          <div className={styles.galleryGrid}>
            {galleryTiles.map((image) => (
              <article
                key={image.id}
                data-testid="impact-gallery-tile"
                className={styles.galleryTile}
              >
                {image.src ? (
                  <div className={styles.galleryImageWrap}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={640}
                      height={480}
                      sizes="(max-width: 800px) 100vw, (max-width: 1120px) 33vw, 280px"
                      className={styles.galleryImage}
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className={styles.galleryPlaceholder}>
                    <p>{copy.galleryPlaceholderBody}</p>
                  </div>
                )}

                <div className={styles.galleryCaption}>
                  <strong>{image.storyTitle}</strong>
                  <span>{image.alt}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.storiesSection} aria-labelledby="impact-stories-heading">
          <p className={styles.sectionLabel}>{copy.storiesLabel}</p>
          <h2 id="impact-stories-heading">{copy.storiesHeading}</h2>

          <div className={styles.storyGrid}>
            {storyCards.map((story) => (
              <article
                key={story.id}
                data-testid="impact-story-card"
                className={styles.storyCard}
              >
                {story.image ? (
                  <div className={styles.storyCardImageWrap}>
                    <Image
                      src={story.image.src}
                      alt={story.image.alt}
                      width={640}
                      height={400}
                      sizes="(max-width: 800px) 100vw, (max-width: 1120px) 50vw, 360px"
                      className={styles.storyCardImage}
                      unoptimized
                    />
                  </div>
                ) : null}
                <h3>{story.title}</h3>
                <p>{story.excerpt || copy.storyBodyFallback}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.donateBand} aria-labelledby="impact-donate-heading">
          <p className={styles.sectionLabel}>{copy.supportLabel}</p>
          <h2 id="impact-donate-heading">{copy.donateHeading}</h2>
          <p className={styles.sectionBody}>{copy.donateBody}</p>
          <Link href={`/${locale}/donate`} className={styles.donateLink}>
            {copy.donateLinkLabel}
          </Link>
        </section>
      </div>

      <Footer locale={locale} settings={settings} />
    </main>
  )
}
