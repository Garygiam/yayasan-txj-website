import type {Metadata} from 'next'
import type {Locale} from '@/i18n/config'
import {Footer} from '@/components/Footer'
import {Header} from '@/components/Header'
import {buildLocaleAlternates} from '@/lib/seo/alternates'
import {buildSocialMetadata} from '@/lib/seo/metadata'
import {buildBreadcrumbSchema} from '@/lib/seo/schema'
import {getSiteUrl} from '@/lib/seo/siteUrl'
import {getSiteSettings} from '@/lib/sanity/read'
import {ContactForm, type ContactFormCopy} from './ContactForm'
import styles from './ContactPage.module.css'

type ContactPageCopy = {
  sectionLabel: string
  title: string
  heroLead: string
  heroBody: string
  detailsLabel: string
  detailsHeading: string
  detailsBody: string
  emailLabel: string
  phoneLabel: string
  addressLabel: string
  messageSectionLabel: string
  messageHeading: string
  privacyLabel: string
  privacyHeading: string
  privacyBody: string
  form: ContactFormCopy
}

const contactPageCopy: Record<Locale, ContactPageCopy> = {
  en: {
    sectionLabel: 'Contact',
    title: 'Contact',
    heroLead: 'We would love to hear from you',
    heroBody:
      'Reach out to the TXJ Care team for enquiries, support, partnership questions, or general information.',
    detailsLabel: 'Details',
    detailsHeading: 'Contact details',
    detailsBody: 'Use the details below or send us a message through the contact form.',
    emailLabel: 'Email',
    phoneLabel: 'Phone',
    addressLabel: 'Address',
    messageSectionLabel: 'Message',
    messageHeading: 'Send us a message',
    privacyLabel: 'Privacy',
    privacyHeading: 'We handle enquiries with care',
    privacyBody:
      'Share only the details needed for your enquiry. Our team uses your message to follow up and support you appropriately.',
    form: {
      nameLabel: 'Name',
      emailLabel: 'Email',
      messageLabel: 'Message',
      captchaNote: 'Captcha is not configured.',
      submittingLabel: 'Sending...',
      submitLabel: 'Send message',
      successMessage: 'Thanks - we will get back to you soon.',
      errorMessage: 'Submission failed. Please try again.',
      privacyNote: 'We collect only the details needed to respond to your request.',
    },
  },
  bm: {
    sectionLabel: 'Hubungi kami',
    title: 'Hubungi kami',
    heroLead: 'Kami sedia mendengar daripada anda',
    heroBody:
      'Hubungi pasukan TXJ Care untuk pertanyaan, sokongan, soalan kerjasama, atau maklumat umum.',
    detailsLabel: 'Butiran',
    detailsHeading: 'Maklumat perhubungan',
    detailsBody: 'Gunakan butiran di bawah atau hantarkan mesej melalui borang hubungan.',
    emailLabel: 'E-mel',
    phoneLabel: 'Telefon',
    addressLabel: 'Alamat',
    messageSectionLabel: 'Mesej',
    messageHeading: 'Hantar mesej kepada kami',
    privacyLabel: 'Privasi',
    privacyHeading: 'Kami mengurus pertanyaan dengan cermat',
    privacyBody:
      'Kongsi hanya butiran yang diperlukan untuk pertanyaan anda. Pasukan kami menggunakan mesej anda untuk membuat susulan dan membantu dengan sewajarnya.',
    form: {
      nameLabel: 'Nama',
      emailLabel: 'E-mel',
      messageLabel: 'Mesej',
      captchaNote: 'Captcha belum dikonfigurasikan.',
      submittingLabel: 'Sedang dihantar...',
      submitLabel: 'Hantar mesej',
      successMessage: 'Terima kasih - kami akan menghubungi anda semula tidak lama lagi.',
      errorMessage: 'Penghantaran gagal. Sila cuba lagi.',
      privacyNote: 'Kami hanya mengumpul butiran yang diperlukan untuk membalas permintaan anda.',
    },
  },
  zh: {
    sectionLabel: '联系我们',
    title: '联系我们',
    heroLead: '很期待收到你的来信',
    heroBody: '如有咨询、求助、合作问题或一般了解需求，都欢迎联系 TXJ Care 团队。',
    detailsLabel: '详情',
    detailsHeading: '联系资料',
    detailsBody: '你可以使用以下联系方式，或直接通过联系表单给我们留言。',
    emailLabel: '电子邮箱',
    phoneLabel: '电话',
    addressLabel: '地址',
    messageSectionLabel: '留言',
    messageHeading: '给我们留言',
    privacyLabel: '隐私',
    privacyHeading: '我们会谨慎处理每一则咨询',
    privacyBody: '只需提供处理咨询所需的信息即可。团队会使用你的留言进行后续联系与适当协助。',
    form: {
      nameLabel: '姓名',
      emailLabel: '电子邮箱',
      messageLabel: '留言',
      captchaNote: 'Captcha 尚未配置。',
      submittingLabel: '发送中...',
      submitLabel: '发送留言',
      successMessage: '谢谢你，我们会尽快回复。',
      errorMessage: '提交失败，请再试一次。',
      privacyNote: '我们只会收集回应你的请求所需的信息。',
    },
  },
}

const contactMetadataCopy: Record<Locale, {title: string; description: string}> = {
  en: {
    title: 'Contact TXJ Care | Enquiries and Support Details',
    description:
      'Contact TXJ Care for enquiries, support requests, partnerships, or general information using our direct details or contact form.',
  },
  bm: {
    title: 'Hubungi TXJ Care | Pertanyaan dan Butiran Sokongan',
    description:
      'Hubungi TXJ Care untuk pertanyaan, permintaan sokongan, kerjasama, atau maklumat umum melalui butiran terus atau borang hubungan kami.',
  },
  zh: {
    title: '联系 TXJ Care | 咨询与支援联系方式',
    description: '如需咨询、求助、合作洽谈或一般信息，可通过 TXJ Care 的直接联系方式或联系表单与我们联络。',
  },
}

const homeLabelByLocale: Record<Locale, string> = {
  en: 'Home',
  bm: 'Laman utama',
  zh: '首页',
}

export async function generateMetadata({params}: {params: Promise<{locale: Locale}>}): Promise<Metadata> {
  const {locale} = await params
  const copy = contactMetadataCopy[locale]

  return {
    title: copy.title,
    description: copy.description,
    alternates: buildLocaleAlternates('/contact', locale),
    ...buildSocialMetadata({
      title: copy.title,
      description: copy.description,
      path: `/${locale}/contact`,
    }),
  }
}

export default async function ContactPage({params}: {params: Promise<{locale: Locale}>}) {
  const {locale} = await params
  const settings = await getSiteSettings()
  const copy = contactPageCopy[locale]
  const phone = settings?.contactPhone ?? '+6013 757 9999'
  const email = settings?.contactEmail ?? 'support@yayasantxj.org'
  const address =
    settings?.contactAddress ??
    '9A, Jln Kenari 7\nBandar Puchong Jaya\n47100 Puchong, Selangor'
  const siteUrl = getSiteUrl()
  const breadcrumbSchema = buildBreadcrumbSchema([
    {name: homeLabelByLocale[locale], url: `${siteUrl}/${locale}`},
    {name: copy.title, url: `${siteUrl}/${locale}/contact`},
  ])
  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'NonprofitOrganization',
    name: settings?.brandName ?? 'TXJ Care',
    legalName: settings?.officialName ?? 'Yayasan TXJ Malaysia',
    url: siteUrl,
    email,
    telephone: phone,
    address,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email,
        telephone: phone,
        areaServed: 'MY',
        availableLanguage: ['en', 'ms', 'zh'],
      },
    ],
  }

  return (
    <main className={styles.pageShell}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c')}}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(contactSchema).replace(/</g, '\\u003c')}}
      />
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
            <article className={styles.infoCard}>
              <p className={styles.sectionLabel}>{copy.detailsLabel}</p>
              <h2>{copy.detailsHeading}</h2>
              <p className={styles.sectionBody}>{copy.detailsBody}</p>
              <ul className={styles.infoList}>
                <li>{copy.emailLabel}: {email}</li>
                <li>{copy.phoneLabel}: {phone}</li>
                <li style={{whiteSpace: 'pre-line'}}>{copy.addressLabel}: {address}</li>
              </ul>
            </article>

            <article className={styles.formCard}>
              <p className={styles.sectionLabel}>{copy.messageSectionLabel}</p>
              <h2>{copy.messageHeading}</h2>
              <ContactForm copy={copy.form} />
            </article>
          </div>
        </section>

        <section className={styles.helperBand}>
          <p className={styles.sectionLabel}>{copy.privacyLabel}</p>
          <h2>{copy.privacyHeading}</h2>
          <p>{copy.privacyBody}</p>
        </section>
      </div>

      <Footer locale={locale} settings={settings} />
    </main>
  )
}
