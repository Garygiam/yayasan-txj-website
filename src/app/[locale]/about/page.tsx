import type {Metadata} from 'next'
import type {Locale} from '@/i18n/config'
import {FeaturedLeader} from '@/components/about/FeaturedLeader'
import {LeadershipGridSection} from '@/components/about/LeadershipGridSection'
import styles from '@/components/about/about.module.css'
import {Footer} from '@/components/Footer'
import {Header} from '@/components/Header'
import {getAboutStoryContent} from '@/lib/about/aboutStoryContent'
import {buildLeadershipViewModel} from '@/lib/about/normalizeLeadership'
import {buildLocaleAlternates} from '@/lib/seo/alternates'
import {buildSocialMetadata} from '@/lib/seo/metadata'
import {buildBreadcrumbSchema} from '@/lib/seo/schema'
import {getSiteUrl} from '@/lib/seo/siteUrl'
import {getLeadershipMembers, getSiteSettings} from '@/lib/sanity/read'

const aboutPageCopyByLocale: Record<
  Locale,
  {
    sectionLabel: string
    pageTitle: string
    featuredLeadershipLabel: string
    officialNameLabel: string
    founderLabel: string
    boardTitle: string
    managementTitle: string
  }
> = {
  en: {
    sectionLabel: 'About TXJ Care',
    pageTitle: 'About TXJ Care',
    featuredLeadershipLabel: 'Featured Leadership',
    officialNameLabel: 'Official Name',
    founderLabel: 'Founder',
    boardTitle: 'Board of Directors',
    managementTitle: 'Management Team',
  },
  bm: {
    sectionLabel: 'Tentang TXJ Care',
    pageTitle: 'Tentang TXJ Care',
    featuredLeadershipLabel: 'Kepimpinan Utama',
    officialNameLabel: 'Nama Rasmi',
    founderLabel: 'Pengasas',
    boardTitle: 'Lembaga Pengarah',
    managementTitle: 'Pasukan Pengurusan',
  },
  zh: {
    sectionLabel: '关于 TXJ Care',
    pageTitle: '关于 TXJ Care',
    featuredLeadershipLabel: '重点领导成员',
    officialNameLabel: '法定名称',
    founderLabel: '创办人',
    boardTitle: '董事会',
    managementTitle: '管理团队',
  },
}

const aboutMetadataCopy: Record<Locale, {title: string; description: string}> = {
  en: {
    title: 'About TXJ Care | Mission, Founder, and Community Story',
    description:
      "Learn about TXJ Care's mission, founder, leadership, and the community story behind its work across Malaysia.",
  },
  bm: {
    title: 'Tentang TXJ Care | Misi, Pengasas, dan Kisah Komuniti',
    description:
      'Ketahui misi TXJ Care, pengasasnya, barisan kepimpinan, dan kisah komuniti di sebalik kerja kebajikan di seluruh Malaysia.',
  },
  zh: {
    title: '关于 TXJ Care | 使命、创办人与社区故事',
    description: '了解 TXJ Care 的使命、创办人、领导团队，以及推动马来西亚各地社区关怀工作的故事。',
  },
}

const homeLabelByLocale: Record<Locale, string> = {
  en: 'Home',
  bm: 'Laman utama',
  zh: '首页',
}

export async function generateMetadata({params}: {params: Promise<{locale: Locale}>}): Promise<Metadata> {
  const {locale} = await params
  const copy = aboutMetadataCopy[locale]

  return {
    title: copy.title,
    description: copy.description,
    alternates: buildLocaleAlternates('/about', locale),
    ...buildSocialMetadata({
      title: copy.title,
      description: copy.description,
      path: `/${locale}/about`,
    }),
  }
}

export default async function AboutPage({params}: {params: Promise<{locale: Locale}>}) {
  const {locale} = await params
  const [settings, leadershipMembers] = await Promise.all([getSiteSettings(), getLeadershipMembers()])
  const leadership = buildLeadershipViewModel({locale, members: leadershipMembers})
  const aboutStoryContent = getAboutStoryContent(locale)
  const pageCopy = aboutPageCopyByLocale[locale]
  const siteUrl = getSiteUrl()
  const breadcrumbSchema = buildBreadcrumbSchema([
    {name: homeLabelByLocale[locale], url: `${siteUrl}/${locale}`},
    {name: pageCopy.pageTitle, url: `${siteUrl}/${locale}/about`},
  ])

  return (
    <main className={styles.pageShell}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c')}}
      />
      <Header locale={locale} />
      <div className={styles.pageFlow}>
        <section className={styles.heroCard}>
          <p className={styles.sectionLabel}>{pageCopy.sectionLabel}</p>
          <h1>{pageCopy.pageTitle}</h1>
          <div className={styles.metaGrid}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>{pageCopy.officialNameLabel}</span>
              <p>{settings?.officialName ?? 'Yayasan TXJ Malaysia'}</p>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>{pageCopy.founderLabel}</span>
              <p>{settings?.founderName ?? "Dato' Sri Charles Hwang"}</p>
            </div>
          </div>
        </section>

        <section className={styles.storyCard}>
          <h2>{aboutStoryContent.storyTitle}</h2>
          {aboutStoryContent.storyParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>

        <section className={styles.supportingGrid}>
          <article className={styles.supportingCard}>
            <h2>{aboutStoryContent.missionTitle}</h2>
            <p>{aboutStoryContent.mission}</p>
          </article>
          <article className={styles.supportingCard}>
            <h2>{aboutStoryContent.visionTitle}</h2>
            <p>{aboutStoryContent.vision}</p>
          </article>
        </section>

        <section className={styles.sectionCard}>
          <h2>{aboutStoryContent.pillarsTitle}</h2>
          <p>{aboutStoryContent.pillarsIntro}</p>
          <div className={styles.detailGrid}>
            {aboutStoryContent.pillars.map((pillar) => (
              <article key={pillar.title} className={styles.detailCard}>
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
              </article>
            ))}
          </div>
          <p>{aboutStoryContent.connectionModel}</p>
        </section>

        <section className={styles.storyGroup}>
          <article className={styles.sectionCard}>
            <h2>{aboutStoryContent.youthCorpsTitle}</h2>
            {aboutStoryContent.youthCorpsParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>
          <article className={styles.sectionCard}>
            <h2>{aboutStoryContent.valuesTitle}</h2>
            <ul className={styles.detailList}>
              {aboutStoryContent.values.map((value) => (
                <li key={value.title}>
                  <strong>{value.title}</strong> - {value.description}
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className={styles.founderCard}>
          <h2>{aboutStoryContent.founderTitle}</h2>
          <p>{aboutStoryContent.founderIntro}</p>
          <ul className={styles.detailList}>
            {aboutStoryContent.founderRoles.map((role) => (
              <li key={role}>{role}</li>
            ))}
          </ul>
          <p>{aboutStoryContent.founderBeliefIntro}</p>
          <blockquote className={styles.quote}>{aboutStoryContent.founderQuote}</blockquote>
          <p>{aboutStoryContent.founderGroundNote}</p>
        </section>

        <section className={styles.sectionCard}>
          <h2>{aboutStoryContent.impactTitle}</h2>
          <div className={styles.statGrid}>
            {aboutStoryContent.impactStats.map((stat) => (
              <article key={stat} className={styles.statCard}>
                <p>{stat}</p>
              </article>
            ))}
          </div>
          <p>{aboutStoryContent.impactClosing}</p>
        </section>

        <div className={styles.leadershipChapter}>
          <FeaturedLeader locale={locale} person={leadership.featuredLeader} sectionLabel={pageCopy.featuredLeadershipLabel} />
          <LeadershipGridSection locale={locale} people={leadership.boardMembers} title={pageCopy.boardTitle} />
          <LeadershipGridSection locale={locale} people={leadership.managementMembers} title={pageCopy.managementTitle} />
        </div>
      </div>
      <Footer locale={locale} settings={settings} />
    </main>
  )
}
