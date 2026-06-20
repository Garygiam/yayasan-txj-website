'use client'

import Link from 'next/link'
import {useState} from 'react'
import {usePathname} from 'next/navigation'
import {locales, type Locale} from '@/i18n/config'
import styles from './LocaleSwitcher.module.css'

const localeLabels: Record<Locale, string> = {
  en: 'English',
  bm: 'Bahasa Melayu',
  zh: '中文',
}

function replaceLocale(pathname: string, locale: Locale) {
  const parts = pathname.split('/')
  if (parts.length < 2 || !parts[1]) return `/${locale}`
  parts[1] = locale
  return parts.join('/') || `/${locale}`
}

export function LocaleSwitcher({currentLocale}: {currentLocale: Locale}) {
  const pathname = usePathname() ?? `/${currentLocale}`
  const [isOpen, setIsOpen] = useState(false)
  const getOptionClassName = (locale: Locale) =>
    locale === currentLocale ? `${styles.option} ${styles.optionCurrent}` : styles.option

  return (
    <div className={styles.root}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className={styles.trigger}
        onClick={() => setIsOpen((open) => !open)}
      >
        {currentLocale.toUpperCase()} v
      </button>

      {isOpen ? (
        <div aria-label="Available languages" className={styles.menu}>
          {locales.map((locale) => (
            <Link
              key={locale}
              href={replaceLocale(pathname, locale)}
              aria-current={locale === currentLocale ? 'page' : undefined}
              className={getOptionClassName(locale)}
            >
              {localeLabels[locale]}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  )
}
