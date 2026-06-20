import Link from 'next/link'
import type {Locale} from '@/i18n/config'
import type {HomepageViewModel} from '@/lib/homepage/types'
import styles from './homepage.module.css'

const urgentNeedsAriaLabelByLocale: Record<Locale, string> = {
  en: 'Urgent needs',
  bm: 'Keperluan mendesak',
  zh: '紧急需求',
}

export function UrgentNeedsBanner({
  urgentNeeds,
  locale,
}: {
  urgentNeeds: HomepageViewModel['urgentNeeds']
  locale: Locale
}) {
  if (!urgentNeeds) {
    return null
  }

  return (
    <section className={styles.urgentNeeds} aria-label={urgentNeedsAriaLabelByLocale[locale]}>
      <div className={styles.urgentNeedsCopy}>
        <p className={styles.sectionLabel}>{urgentNeeds.title}</p>
        <p className={styles.urgentNeedsItems}>{urgentNeeds.items.join(' · ')}</p>
      </div>

      <Link href={urgentNeeds.ctaHref} className={styles.primaryButton}>
        {urgentNeeds.ctaLabel}
      </Link>
    </section>
  )
}
