import type {Metadata} from 'next'
import type {Locale} from '@/i18n/config'
import {Footer} from '@/components/Footer'
import {Header} from '@/components/Header'
import {buildLocaleAlternates} from '@/lib/seo/alternates'
import {getSiteSettings} from '@/lib/sanity/read'
import {DonateForm} from './DonateForm'
import styles from './DonatePage.module.css'

const donatePageCopy: Record<
  Locale,
  {
    sectionLabel: string
    title: string
    heroLead: string
    heroBody: string
    giveLabel: string
    giftHeading: string
    trustLabel: string
    trustHeading: string
    trustBody: string
    supportList: [string, string, string]
    reassuranceLabel: string
    reassuranceHeading: string
    reassuranceBody: string
  }
> = {
  en: {
    sectionLabel: 'Donate',
    title: 'Donate',
    heroLead: 'Support practical compassion with confidence',
    heroBody:
      'Help TXJ Care move essential support, outreach logistics, and community care to the people who need it most.',
    giveLabel: 'Give',
    giftHeading: 'Choose your gift',
    trustLabel: 'Trust',
    trustHeading: 'Why your support matters',
    trustBody:
      'Your gift helps fund essentials, transport, distributions, and practical community support across Malaysia.',
    supportList: [
      'Support direct community aid',
      'Help sustain consistent outreach',
      'Contribute to practical, on-the-ground care',
    ],
    reassuranceLabel: 'Reassurance',
    reassuranceHeading: 'Give with clarity and care',
    reassuranceBody:
      'Your donation flow remains secure and direct, with a calmer and clearer experience.',
  },
  bm: {
    sectionLabel: 'Derma',
    title: 'Derma',
    heroLead: 'Sokong belas ihsan praktikal dengan yakin',
    heroBody:
      'Bantu TXJ Care menggerakkan bantuan penting, logistik outreach, dan penjagaan komuniti kepada mereka yang paling memerlukan.',
    giveLabel: 'Sumbang',
    giftHeading: 'Pilih sumbangan anda',
    trustLabel: 'Kepercayaan',
    trustHeading: 'Mengapa sokongan anda penting',
    trustBody:
      'Sumbangan anda membantu membiayai keperluan asas, pengangkutan, pengagihan, dan sokongan komuniti praktikal di seluruh Malaysia.',
    supportList: [
      'Sokong bantuan komuniti secara langsung',
      'Bantu mengekalkan outreach yang konsisten',
      'Menyumbang kepada penjagaan praktikal di lapangan',
    ],
    reassuranceLabel: 'Jaminan',
    reassuranceHeading: 'Memberi dengan jelas dan penuh cermat',
    reassuranceBody:
      'Aliran sumbangan anda kekal selamat dan terus, dengan pengalaman yang lebih tenang dan jelas.',
  },
  zh: {
    sectionLabel: '捐助',
    title: '捐助',
    heroLead: '安心支持实际关怀行动',
    heroBody: '帮助 TXJ Care 把必要援助、外展后勤与社区关怀送到最需要帮助的人身边。',
    giveLabel: '捐助',
    giftHeading: '选择你的捐助金额',
    trustLabel: '信任',
    trustHeading: '为什么你的支持很重要',
    trustBody: '你的捐助能支持必需物资、运输、派发行动，以及马来西亚各地的实际社区援助。',
    supportList: ['支持直接社区援助', '帮助维持持续外展行动', '投入一线的实际关怀工作'],
    reassuranceLabel: '说明',
    reassuranceHeading: '清楚、安心地完成捐助',
    reassuranceBody: '整个捐助流程保持安全直接，体验也更清晰从容。',
  },
}

const donateMetadataCopy: Record<Locale, {title: string; description: string}> = {
  en: {
    title: 'Donate to TXJ Care | Direct Giving for Practical Support',
    description:
      'Support TXJ Care with direct giving that funds essentials, outreach logistics, and practical community care across Malaysia.',
  },
  bm: {
    title: 'Derma kepada TXJ Care | Sumbangan Langsung untuk Sokongan Praktikal',
    description:
      'Sokong TXJ Care melalui sumbangan langsung yang membiayai keperluan asas, logistik outreach, dan penjagaan komuniti praktikal di seluruh Malaysia.',
  },
  zh: {
    title: '捐助 TXJ Care | 直接支持实际援助',
    description: '通过直接捐助支持 TXJ Care，为马来西亚各地的必需物资、外展后勤与实际社区关怀提供资金。',
  },
}

export async function generateMetadata({params}: {params: Promise<{locale: Locale}>}): Promise<Metadata> {
  const {locale} = await params
  const copy = donateMetadataCopy[locale]

  return {
    title: copy.title,
    description: copy.description,
    alternates: buildLocaleAlternates('/donate', locale),
  }
}

export default async function DonatePage({params}: {params: Promise<{locale: Locale}>}) {
  const {locale} = await params
  const settings = await getSiteSettings()
  const copy = donatePageCopy[locale]

  return (
    <main className={styles.pageShell}>
      <Header locale={locale} />

      <div className={styles.pageFlow}>
        <section className={styles.heroCard}>
          <p className={styles.sectionLabel}>{copy.sectionLabel}</p>
          <h1>{copy.title}</h1>
          <p className={styles.heroLead}>{copy.heroLead}</p>
          <p className={styles.heroBody}>{copy.heroBody}</p>
        </section>

        <section className={styles.sectionCard}>
          <div className={styles.contentGrid}>
            <article className={styles.donationCard}>
              <p className={styles.sectionLabel}>{copy.giveLabel}</p>
              <h2>{copy.giftHeading}</h2>
              <DonateForm locale={locale} />
            </article>

            <article className={styles.supportCard}>
              <p className={styles.sectionLabel}>{copy.trustLabel}</p>
              <h2>{copy.trustHeading}</h2>
              <p className={styles.sectionBody}>{copy.trustBody}</p>
              <ul className={styles.supportList}>
                {copy.supportList.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className={styles.helperBand}>
          <p className={styles.sectionLabel}>{copy.reassuranceLabel}</p>
          <h2>{copy.reassuranceHeading}</h2>
          <p>{copy.reassuranceBody}</p>
        </section>
      </div>

      <Footer locale={locale} settings={settings} />
    </main>
  )
}
