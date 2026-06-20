export type HomepageSlide = {
  id: string
  eyebrow: string
  alt: string
  imageUrl: string
}

export type HomepageStat = {
  value: string
  label: string
}

export type HomepagePillar = {
  id: string
  slug: string
  title: string
  summary: string
  href: string
}

export type HomepageStory = {
  id: string
  slug: string
  title: string
  summary: string
  href: string
  publishedAt: string
}

export type HomepageViewModel = {
  hero: {
    heading: string
    subheading: string
    trustItems: string[]
    primaryCta: {label: string; href: string}
    secondaryCta: {label: string; href: string}
    slides: HomepageSlide[]
  }
  stats: HomepageStat[]
  urgentNeeds: null | {
    title: string
    items: string[]
    ctaLabel: string
    ctaHref: string
  }
  pillars: HomepagePillar[]
  transparency: null | {
    title: string
    steps: Array<{id: string; title: string; description: string}>
  }
  founder: null | {
    title: string
    summary: string
    quote: string
    imageUrl: string | null
    href: string
  }
  latestUpdates: HomepageStory[]
  finalCtas: Array<{id: string; label: string; body: string; href: string}>
}
