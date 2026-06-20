import Link from 'next/link'
import {getTranslations} from 'next-intl/server'
import type {Locale} from '@/i18n/config'
import {HeaderBrand} from './HeaderBrand'
import {LocaleSwitcher} from './LocaleSwitcher'
import styles from './Header.module.css'

export async function Header({locale}: {locale: Locale}) {
  const t = await getTranslations()

  return (
    <header className={styles.header}>
      <HeaderBrand locale={locale} brandLabel={t('site.brand')} tagline={t('site.tagline')} />

      <div className={styles.content}>
        <nav className={styles.nav}>
          <Link className={styles.navLink} href={`/${locale}/about`}>
            {t('nav.about')}
          </Link>
          <Link className={styles.navLink} href={`/${locale}/programs`}>
            {t('nav.programs')}
          </Link>
          <Link className={styles.navLink} href={`/${locale}/impact`}>
            {t('nav.impact')}
          </Link>
          <Link className={styles.navLink} href={`/${locale}/media`}>
            {t('nav.media')}
          </Link>
          <Link className={styles.navLink} href={`/${locale}/get-involved`}>
            {t('nav.getInvolved')}
          </Link>
          <Link className={styles.navLink} href={`/${locale}/contact`}>
            {t('nav.contact')}
          </Link>
        </nav>

        <div className={styles.actions}>
          <Link className={styles.donateLink} href={`/${locale}/donate`}>
            {t('nav.donate')}
          </Link>
          <LocaleSwitcher currentLocale={locale} />
        </div>
      </div>
    </header>
  )
}
