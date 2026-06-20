/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import type {Locale} from '@/i18n/config'
import type {LeadershipCardModel} from '@/lib/about/types'
import styles from './about.module.css'

export function FeaturedLeader({
  locale,
  person,
  sectionLabel,
}: {
  locale: Locale
  person: LeadershipCardModel | null
  sectionLabel: string
}) {
  if (!person) {
    return null
  }

  return (
    <Link className={styles.featuredLink} href={`/${locale}/about/team/${person.slug}`}>
      <section className={styles.featuredSection}>
        <div className={styles.featuredPhoto} aria-hidden={person.photoUrl ? undefined : 'true'}>
          {person.photoUrl ? <img alt={person.photoAlt} className={styles.featuredImage} src={person.photoUrl} /> : null}
        </div>
        <div className={styles.featuredBody}>
          <p className={styles.sectionLabel}>{sectionLabel}</p>
          <h2>{person.name}</h2>
          <p className={styles.featuredTitle}>{person.title}</p>
          {person.shortBio ? <p>{person.shortBio}</p> : null}
        </div>
      </section>
    </Link>
  )
}
