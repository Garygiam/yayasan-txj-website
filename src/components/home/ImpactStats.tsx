'use client'

import {useEffect, useState} from 'react'
import type {Locale} from '@/i18n/config'
import type {HomepageViewModel} from '@/lib/homepage/types'
import styles from './homepage.module.css'

const impactStatsAriaLabelByLocale: Record<Locale, string> = {
  en: 'Impact statistics',
  bm: 'Statistik impak',
  zh: '影响数据',
}

export function ImpactStats({stats, locale}: {stats: HomepageViewModel['stats']; locale: Locale}) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setVisible(true)
    }, 0)

    return () => window.clearTimeout(timer)
  }, [])

  if (stats.length === 0) {
    return null
  }

  return (
    <section className={styles.statsSection} aria-label={impactStatsAriaLabelByLocale[locale]}>
      {stats.map((stat) => (
        <article key={`${stat.label}-${stat.value}`} className={styles.statCard}>
          <strong className={styles.statValue}>{visible ? stat.value : '0'}</strong>
          <span className={styles.statLabel}>{stat.label}</span>
        </article>
      ))}
    </section>
  )
}
