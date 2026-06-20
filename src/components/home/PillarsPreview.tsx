import Link from 'next/link'
import type {Locale} from '@/i18n/config'
import type {HomepageViewModel} from '@/lib/homepage/types'
import styles from './homepage.module.css'

const pillarsCopyByLocale: Record<Locale, {sectionLabel: string; heading: string; learnMoreLabel: string}> = {
  en: {
    sectionLabel: 'Four Pillars',
    heading: 'Practical care across four connected areas',
    learnMoreLabel: 'Learn More',
  },
  bm: {
    sectionLabel: 'Empat Tonggak',
    heading: 'Penjagaan praktikal merentasi empat bidang yang saling berkaitan',
    learnMoreLabel: 'Ketahui Lebih Lanjut',
  },
  zh: {
    sectionLabel: '四大支柱',
    heading: '以四个相互连接的重点领域提供务实关怀',
    learnMoreLabel: '了解更多',
  },
}

export function PillarsPreview({pillars, locale}: {pillars: HomepageViewModel['pillars']; locale: Locale}) {
  if (pillars.length === 0) {
    return null
  }

  const copy = pillarsCopyByLocale[locale]

  return (
    <section className={styles.sectionBlock} aria-labelledby="homepage-pillars-heading">
      <div className={styles.sectionHeader}>
        <p className={styles.sectionLabel}>{copy.sectionLabel}</p>
        <h2 id="homepage-pillars-heading">{copy.heading}</h2>
      </div>

      <div className={styles.pillarsGrid}>
        {pillars.map((pillar) => (
          <article key={pillar.id} className={styles.pillarCard}>
            <h3>{pillar.title}</h3>
            <p>{pillar.summary}</p>
            <Link href={pillar.href} className={styles.textLink}>
              {copy.learnMoreLabel}
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}
