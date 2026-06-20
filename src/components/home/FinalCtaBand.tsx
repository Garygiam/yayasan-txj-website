import Link from 'next/link'
import type {Locale} from '@/i18n/config'
import type {HomepageViewModel} from '@/lib/homepage/types'
import styles from './homepage.module.css'

const finalCtaCopyByLocale: Record<Locale, {ariaLabel: string}> = {
  en: {ariaLabel: 'Homepage conversion actions'},
  bm: {ariaLabel: 'Tindakan utama laman utama'},
  zh: {ariaLabel: '首页行动区'},
}

export function FinalCtaBand({ctas, locale}: {ctas: HomepageViewModel['finalCtas']; locale: Locale}) {
  if (ctas.length === 0) {
    return null
  }

  const copy = finalCtaCopyByLocale[locale]

  return (
    <section className={styles.finalCtaBand} aria-label={copy.ariaLabel}>
      {ctas.map((cta) => (
        <article key={cta.id} className={styles.finalCtaCard}>
          <h3>{cta.label}</h3>
          <p>{cta.body}</p>
          <Link href={cta.href} className={styles.primaryButton}>
            {cta.label}
          </Link>
        </article>
      ))}
    </section>
  )
}
