import Link from 'next/link'
import type {Locale} from '@/i18n/config'
import type {HomepageViewModel} from '@/lib/homepage/types'
import styles from './homepage.module.css'

const founderCopyByLocale: Record<Locale, {heading: string; aboutLabel: string}> = {
  en: {
    heading: 'Grounded leadership in action',
    aboutLabel: 'About Us',
  },
  bm: {
    heading: 'Kepimpinan yang berpijak pada tindakan',
    aboutLabel: 'Tentang Kami',
  },
  zh: {
    heading: '以行动为本的务实领导',
    aboutLabel: '关于我们',
  },
}

export function FounderSpotlight({founder, locale}: {founder: HomepageViewModel['founder']; locale: Locale}) {
  if (!founder) {
    return null
  }

  const copy = founderCopyByLocale[locale]

  return (
    <section className={styles.founderSection} aria-labelledby="homepage-founder-heading">
      <div className={styles.founderCopy}>
        <p className={styles.sectionLabel}>{founder.title}</p>
        <h2 id="homepage-founder-heading">{copy.heading}</h2>
        {founder.quote ? <blockquote>{founder.quote}</blockquote> : null}
        {founder.summary ? <p>{founder.summary}</p> : null}
        <Link href={founder.href} className={styles.textLink}>
          {copy.aboutLabel}
        </Link>
      </div>
    </section>
  )
}
