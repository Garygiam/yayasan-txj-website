import Link from 'next/link'
import type {Locale} from '@/i18n/config'
import type {HomepageViewModel} from '@/lib/homepage/types'
import styles from './homepage.module.css'

const latestUpdatesCopyByLocale: Record<Locale, {sectionLabel: string; heading: string; readMoreLabel: string}> = {
  en: {
    sectionLabel: 'From the field',
    heading: 'Latest Updates',
    readMoreLabel: 'Read more',
  },
  bm: {
    sectionLabel: 'Dari lapangan',
    heading: 'Perkembangan Terkini',
    readMoreLabel: 'Baca lagi',
  },
  zh: {
    sectionLabel: '来自一线',
    heading: '最新动态',
    readMoreLabel: '阅读更多',
  },
}

export function LatestUpdates({stories, locale}: {stories: HomepageViewModel['latestUpdates']; locale: Locale}) {
  if (stories.length === 0) {
    return null
  }

  const copy = latestUpdatesCopyByLocale[locale]

  return (
    <section className={styles.sectionBlock} aria-labelledby="homepage-updates-heading">
      <div className={styles.sectionHeader}>
        <p className={styles.sectionLabel}>{copy.sectionLabel}</p>
        <h2 id="homepage-updates-heading">{copy.heading}</h2>
      </div>

      <div className={styles.storyGrid}>
        {stories.map((story) => (
          <article key={story.id} className={styles.storyCard}>
            <h3>{story.title}</h3>
            <p>{story.summary}</p>
            <Link href={story.href} className={styles.textLink}>
              {copy.readMoreLabel}
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}
