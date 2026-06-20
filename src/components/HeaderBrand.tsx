'use client'

import Image from 'next/image'
import Link from 'next/link'
import {useState} from 'react'
import type {Locale} from '@/i18n/config'
import styles from './HeaderBrand.module.css'

type HeaderBrandProps = {
  locale: Locale
  brandLabel: string
  tagline: string
}

export function HeaderBrand({locale, brandLabel, tagline}: HeaderBrandProps) {
  const [hasImageError, setHasImageError] = useState(false)

  return (
    <Link href={`/${locale}`} className={styles.brandLink} aria-label={brandLabel}>
      {hasImageError ? (
        <span className={styles.fallbackBrand}>{brandLabel}</span>
      ) : (
        <Image
          src="/txj-logo.png"
          alt={`${brandLabel} logo`}
          width={192}
          height={52}
          priority
          className={styles.logo}
          onError={() => setHasImageError(true)}
        />
      )}
      <span className={styles.tagline}>{tagline}</span>
    </Link>
  )
}
