import type {Locale} from '@/i18n/config'
import {pickLocaleString} from '@/lib/sanity/resolveLocale'
import type {SiteSettings} from '@/lib/sanity/types'

const footerCopyByLocale: Record<
  Locale,
  {
    fallbackTagline: string
    phoneLabel: string
    emailLabel: string
  }
> = {
  en: {
    fallbackTagline: 'Practical care, transparent delivery, and community support across Malaysia.',
    phoneLabel: 'Phone',
    emailLabel: 'Email',
  },
  bm: {
    fallbackTagline: 'Penjagaan praktikal, penyampaian telus, dan sokongan komuniti di seluruh Malaysia.',
    phoneLabel: 'Telefon',
    emailLabel: 'E-mel',
  },
  zh: {
    fallbackTagline: '以务实关怀、透明执行与社区支持服务马来西亚各地。',
    phoneLabel: '电话',
    emailLabel: '电邮',
  },
}

export function Footer({settings, locale}: {settings: SiteSettings | null; locale: Locale}) {
  const copy = footerCopyByLocale[locale]
  const brandName = settings?.brandName ?? settings?.officialName ?? 'TXJ Care'
  const phone = settings?.contactPhone ?? '+6013 757 9999'
  const email = settings?.contactEmail ?? 'support@yayasantxj.org'
  const tagline = pickLocaleString(settings?.tagline, locale) ?? copy.fallbackTagline
  const address =
    settings?.contactAddress ??
    '9A, Jln Kenari 7\nBandar Puchong Jaya\n47100 Puchong, Selangor'

  return (
    <footer
      style={{
        marginTop: 56,
        padding: '28px 32px',
        border: '1px solid var(--border-soft)',
        borderRadius: 32,
        background: 'var(--surface)',
        boxShadow: 'var(--shadow-soft)',
      }}
    >
      <div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap'}}>
        <div style={{display: 'grid', gap: 6}}>
          <strong style={{fontSize: '1rem'}}>{brandName}</strong>
          <span style={{color: 'var(--text-muted)', maxWidth: 360}}>{tagline}</span>
        </div>

        <div style={{display: 'grid', gap: 10}}>
          <a href={`tel:${phone.replace(/\s+/g, '')}`}>{copy.phoneLabel}: {phone}</a>
          <a href={`mailto:${email}`}>{copy.emailLabel}: {email}</a>
          <span style={{color: 'var(--text-muted)', whiteSpace: 'pre-line'}}>{address}</span>
        </div>
      </div>

      <small style={{display: 'block', marginTop: 18, color: 'var(--text-muted)'}}>
        © {new Date().getFullYear()} {brandName}
      </small>
    </footer>
  )
}
