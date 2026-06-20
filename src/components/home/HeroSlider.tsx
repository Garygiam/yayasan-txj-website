'use client'

import Image from 'next/image'
import Link from 'next/link'
import {useEffect, useMemo, useState} from 'react'
import type {Locale} from '@/i18n/config'
import type {HomepageViewModel} from '@/lib/homepage/types'
import {buildTextToImageUrl} from '@/lib/images/textToImage'
import styles from './homepage.module.css'

type HeroProps = HomepageViewModel['hero']

const heroCopyByLocale: Record<
  Locale,
  {
    heroLabel: string
    fallbackEyebrow: string
    fallbackAlt: string
    slidesLabel: string
    slideButtonLabel: string
  }
> = {
  en: {
    heroLabel: 'Homepage hero',
    fallbackEyebrow: 'Community care',
    fallbackAlt: 'TXJ Care community support',
    slidesLabel: 'Hero slides',
    slideButtonLabel: 'Show slide',
  },
  bm: {
    heroLabel: 'Hero laman utama',
    fallbackEyebrow: 'Kepedulian komuniti',
    fallbackAlt: 'Sokongan komuniti TXJ Care',
    slidesLabel: 'Slaid hero',
    slideButtonLabel: 'Paparkan slaid',
  },
  zh: {
    heroLabel: '首页主视觉',
    fallbackEyebrow: '社区关怀',
    fallbackAlt: 'TXJ Care 社区支持',
    slidesLabel: '主视觉轮播',
    slideButtonLabel: '显示幻灯片',
  },
}

export function HeroSlider({hero, locale}: {hero: HeroProps; locale: Locale}) {
  const copy = heroCopyByLocale[locale]
  const slides = useMemo(() => {
    const configuredSlides = hero.slides.filter((slide) => slide.imageUrl)

    if (configuredSlides.length > 0) {
      return configuredSlides
    }

    return [
      {
        id: 'fallback-slide',
        eyebrow: copy.fallbackEyebrow,
        alt: copy.fallbackAlt,
        imageUrl: buildTextToImageUrl(
          'documentary photo of Malaysian youth volunteers providing practical community aid, dignified human connection, warm natural light, realistic, compassionate nonprofit work',
          'landscape_16_9',
        ),
      },
    ]
  }, [copy.fallbackAlt, copy.fallbackEyebrow, hero.slides])
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (slides.length <= 1) {
      return
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length)
    }, 5000)

    return () => window.clearInterval(timer)
  }, [slides.length])

  const safeIndex = slides.length === 0 ? 0 : activeIndex % slides.length
  const activeSlide = slides[safeIndex]

  return (
    <section className={styles.hero} aria-label={copy.heroLabel}>
      <div className={styles.heroMedia}>
        <Image
          src={activeSlide.imageUrl}
          alt={activeSlide.alt}
          fill
          sizes="100vw"
          className={styles.heroImage}
          priority
          unoptimized
        />
        <div className={styles.heroOverlay} />
      </div>

      <div className={styles.heroContent}>
        {activeSlide?.eyebrow ? <p className={styles.eyebrow}>{activeSlide.eyebrow}</p> : null}
        <h1>{hero.heading}</h1>
        <p className={styles.heroBody}>{hero.subheading}</p>

        <div className={styles.heroActions}>
          <Link href={hero.primaryCta.href} className={styles.primaryButton}>
            {hero.primaryCta.label}
          </Link>
          <Link href={hero.secondaryCta.href} className={styles.secondaryButton}>
            {hero.secondaryCta.label}
          </Link>
        </div>

        <ul className={styles.trustList}>
          {hero.trustItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        {slides.length > 1 ? (
          <div className={styles.heroIndicators} aria-label={copy.slidesLabel}>
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                className={index === safeIndex ? styles.heroIndicatorActive : styles.heroIndicator}
                onClick={() => setActiveIndex(index)}
                aria-label={`${copy.slideButtonLabel} ${index + 1}`}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}
