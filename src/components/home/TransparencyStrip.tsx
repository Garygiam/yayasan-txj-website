import type {Locale} from '@/i18n/config'
import type {HomepageViewModel} from '@/lib/homepage/types'
import styles from './homepage.module.css'

const transparencyCopyByLocale: Record<Locale, {sectionLabel: string}> = {
  en: {sectionLabel: 'Transparent delivery'},
  bm: {sectionLabel: 'Penyampaian telus'},
  zh: {sectionLabel: '透明执行'},
}

export function TransparencyStrip({
  transparency,
  locale,
}: {
  transparency: HomepageViewModel['transparency']
  locale: Locale
}) {
  if (!transparency || transparency.steps.length === 0) {
    return null
  }

  const copy = transparencyCopyByLocale[locale]

  return (
    <section className={styles.sectionBlock} aria-labelledby="homepage-transparency-heading">
      <div className={styles.sectionHeader}>
        <p className={styles.sectionLabel}>{copy.sectionLabel}</p>
        <h2 id="homepage-transparency-heading">{transparency.title}</h2>
      </div>

      <div className={styles.transparencyGrid}>
        {transparency.steps.map((step) => (
          <article key={step.id} className={styles.transparencyCard}>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
