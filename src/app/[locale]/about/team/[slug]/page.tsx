/* eslint-disable @next/next/no-img-element */
import type {Metadata} from 'next'
import Link from 'next/link'
import {notFound} from 'next/navigation'
import type {Locale} from '@/i18n/config'
import styles from '@/components/about/about.module.css'
import {Footer} from '@/components/Footer'
import {Header} from '@/components/Header'
import {getLeadershipProfileBySlug} from '@/lib/about/normalizeLeadership'
import {buildLocaleAlternates} from '@/lib/seo/alternates'
import {getLeadershipMembers, getSiteSettings} from '@/lib/sanity/read'

const profilePageCopyByLocale: Record<
  Locale,
  {
    sectionLabel: string
    backLabel: string
    boardLabel: string
    managementLabel: string
  }
> = {
  en: {
    sectionLabel: 'Team Profile',
    backLabel: 'Back to About',
    boardLabel: 'Board of Directors',
    managementLabel: 'Management Team',
  },
  bm: {
    sectionLabel: 'Profil Pasukan',
    backLabel: 'Kembali ke Tentang',
    boardLabel: 'Lembaga Pengarah',
    managementLabel: 'Pasukan Pengurusan',
  },
  zh: {
    sectionLabel: '团队档案',
    backLabel: '返回关于页面',
    boardLabel: '董事会',
    managementLabel: '管理团队',
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: Locale; slug: string}>
}): Promise<Metadata> {
  const {locale, slug} = await params
  const leadershipMembers = await getLeadershipMembers()
  const profile = getLeadershipProfileBySlug({locale, members: leadershipMembers, slug})

  if (!profile) {
    return {
      title: 'Team Profile | TXJ Care',
      alternates: buildLocaleAlternates(`/about/team/${slug}`, locale),
    }
  }

  return {
    title: `${profile.name} | ${profile.title} | TXJ Care`,
    description: profile.shortBio ?? `${profile.name} serves with TXJ Care as ${profile.title}.`,
    alternates: buildLocaleAlternates(`/about/team/${slug}`, locale),
  }
}

export default async function LeadershipProfilePage({
  params,
}: {
  params: Promise<{locale: Locale; slug: string}>
}) {
  const {locale, slug} = await params
  const [settings, leadershipMembers] = await Promise.all([getSiteSettings(), getLeadershipMembers()])
  const pageCopy = profilePageCopyByLocale[locale]
  const profile = getLeadershipProfileBySlug({locale, members: leadershipMembers, slug})

  if (!profile) {
    notFound()
  }

  const groupLabel = profile.group === 'board' ? pageCopy.boardLabel : pageCopy.managementLabel

  return (
    <main className={styles.pageShell}>
      <Header locale={locale} />
      <div className={styles.pageFlow}>
        <Link className={styles.backLink} href={`/${locale}/about`}>
          {pageCopy.backLabel}
        </Link>

        <section className={styles.profileHero}>
          {profile.photoUrl ? (
            <div className={styles.profilePhoto}>
              <img
                alt={profile.photoAlt}
                className={styles.featuredImage}
                src={profile.photoUrl}
                style={profile.photoObjectPosition ? {objectPosition: profile.photoObjectPosition} : undefined}
              />
            </div>
          ) : null}
          <div className={styles.profileBody}>
            <p className={styles.sectionLabel}>{pageCopy.sectionLabel}</p>
            <h1>{profile.name}</h1>
            <p className={styles.featuredTitle}>{profile.title}</p>
            <p className={styles.profileMeta}>{groupLabel}</p>
            {profile.shortBio ? <p>{profile.shortBio}</p> : null}
          </div>
        </section>
      </div>
      <Footer locale={locale} settings={settings} />
    </main>
  )
}
