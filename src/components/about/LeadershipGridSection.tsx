import type {Locale} from '@/i18n/config'
import type {LeadershipCardModel} from '@/lib/about/types'
import {LeadershipCard} from './LeadershipCard'
import styles from './about.module.css'

export function LeadershipGridSection({
  locale,
  title,
  people,
}: {
  locale: Locale
  title: string
  people: LeadershipCardModel[]
}) {
  if (people.length === 0) {
    return null
  }

  return (
    <section className={styles.sectionBlock}>
      <h2>{title}</h2>
      <div className={styles.grid}>
        {people.map((person) => (
          <LeadershipCard key={person.id} href={`/${locale}/about/team/${person.slug}`} person={person} />
        ))}
      </div>
    </section>
  )
}
