import type {Metadata} from 'next'
import Link from 'next/link'
import type {Locale} from '@/i18n/config'
import {Footer} from '@/components/Footer'
import {Header} from '@/components/Header'
import {buildLocaleAlternates} from '@/lib/seo/alternates'
import {buildSocialMetadata} from '@/lib/seo/metadata'
import {buildBreadcrumbSchema} from '@/lib/seo/schema'
import {getSiteUrl} from '@/lib/seo/siteUrl'
import {getSiteSettings} from '@/lib/sanity/read'
import {PartnerForm, type PartnerFormCopy} from './PartnerForm'
import {VolunteerForm, type VolunteerFormCopy} from './VolunteerForm'
import styles from './GetInvolvedPage.module.css'

type GetInvolvedPageCopy = {
  sectionLabel: string
  title: string
  heroLead: string
  heroBody: string
  trustList: [string, string, string]
  actionGridLabel: string
  actionCards: {title: string; body: string; featured: boolean}[]
  featuredPathLabel: string
  volunteerHeading: string
  volunteerBody: string
  whyVolunteerLabel: string
  supportHeading: string
  supportBody: string
  volunteerSupport: [string, string, string]
  partnershipLabel: string
  partnershipHeading: string
  partnershipBody: string
  donateLabel: string
  donateHeading: string
  donateBody: string
  donateCta: string
  volunteerForm: VolunteerFormCopy
  partnerForm: PartnerFormCopy
}

const getInvolvedPageCopy: Record<Locale, GetInvolvedPageCopy> = {
  en: {
    sectionLabel: 'Get involved',
    title: 'Get involved',
    heroLead: 'Join practical compassion in action',
    heroBody:
      'Support youth-led action across Malaysia through volunteering, partnerships, and practical giving.',
    trustList: ['Youth-led support', 'Practical community action', 'Direct impact across Malaysia'],
    actionGridLabel: 'Ways to get involved',
    actionCards: [
      {
        title: 'Volunteer',
        body: 'Join youth-led practical support across packing, distributions, outreach, and community care.',
        featured: true,
      },
      {
        title: 'Partnership',
        body: 'Support TXJ Care with goods, logistics, employee volunteering, or funding collaboration.',
        featured: false,
      },
      {
        title: 'Donate',
        body: 'Help move essentials and compassion quickly to the communities that need them most.',
        featured: false,
      },
    ],
    featuredPathLabel: 'Featured path',
    volunteerHeading: 'Volunteer with TXJ Care',
    volunteerBody:
      'Join practical support across packing, distributions, outreach, and community care while helping TXJ respond where needs are most immediate.',
    whyVolunteerLabel: 'Why volunteer',
    supportHeading: 'How you can help',
    supportBody:
      'Volunteer roles flex around real campaign needs, so steady weekly support and occasional campaign help are both welcome.',
    volunteerSupport: [
      'Support packing teams, distributions, outreach, and youth-led initiatives.',
      'Sign up even if you are available only on weekends, evenings, or selected campaigns.',
      'Bring practical energy, a service mindset, and a willingness to support real community needs.',
    ],
    partnershipLabel: 'Partnership',
    partnershipHeading: 'Partnership opportunities',
    partnershipBody:
      'Work with TXJ Care through goods, logistics, employee volunteering, or strategic support that strengthens practical care on the ground.',
    donateLabel: 'Donate',
    donateHeading: 'Support practical compassion with direct giving',
    donateBody:
      'Help fund essential supplies, field logistics, and consistent support for vulnerable communities.',
    donateCta: 'Go to donate',
    volunteerForm: {
      nameLabel: 'Name',
      emailLabel: 'Email',
      phoneLabel: 'Phone',
      preferredRolesLegend: 'Preferred roles',
      roleOptions: {
        packing: 'Packing teams',
        distribution: 'Distribution support',
        assessment: 'Community assessment',
        youthAmbassador: 'Youth ambassadors',
      },
      availabilityLabel: 'Availability',
      availabilityPlaceholder: 'e.g. Weekends, evenings',
      locationLabel: 'Location',
      locationPlaceholder: 'City / State',
      messageLabel: 'Message (optional)',
      captchaNote: 'Captcha is not configured.',
      submittingLabel: 'Submitting...',
      submitLabel: 'Sign up to volunteer',
      successMessage: 'Thanks - we will contact you about next steps.',
      errorMessage: 'Submission failed. Please try again.',
    },
    partnerForm: {
      companyLabel: 'Company / Organization',
      contactNameLabel: 'Contact name',
      emailLabel: 'Email',
      phoneLabel: 'Phone',
      partnershipOptionsLegend: 'Partnership options',
      optionLabels: {
        goodsSponsorship: 'Goods sponsorship',
        logisticsSupport: 'Logistics support',
        employeeVolunteering: 'Employee volunteering',
        financialSupport: 'Financial support',
      },
      messageLabel: 'Message',
      captchaNote: 'Captcha is not configured.',
      submittingLabel: 'Submitting...',
      submitLabel: 'Submit partnership inquiry',
      successMessage: 'Thanks - we will follow up shortly.',
      errorMessage: 'Submission failed. Please try again.',
    },
  },
  bm: {
    sectionLabel: 'Sertai kami',
    title: 'Sertai kami',
    heroLead: 'Sertai belas ihsan yang diterjemah kepada tindakan',
    heroBody:
      'Sokong gerakan anak muda di seluruh Malaysia melalui kesukarelawanan, kerjasama, dan sumbangan yang praktikal.',
    trustList: ['Dipimpin belia', 'Tindakan komuniti yang praktikal', 'Impak langsung di seluruh Malaysia'],
    actionGridLabel: 'Cara untuk terlibat',
    actionCards: [
      {
        title: 'Sukarelawan',
        body: 'Sertai sokongan praktikal yang dipimpin belia melalui pembungkusan, pengagihan, outreach, dan penjagaan komuniti.',
        featured: true,
      },
      {
        title: 'Kerjasama',
        body: 'Sokong TXJ Care melalui barangan, logistik, sukarelawan kakitangan, atau kerjasama pendanaan.',
        featured: false,
      },
      {
        title: 'Derma',
        body: 'Bantu menggerakkan keperluan asas dan belas ihsan dengan cepat kepada komuniti yang paling memerlukannya.',
        featured: false,
      },
    ],
    featuredPathLabel: 'Laluan utama',
    volunteerHeading: 'Jadi sukarelawan bersama TXJ Care',
    volunteerBody:
      'Sertai sokongan praktikal melalui pembungkusan, pengagihan, outreach, dan penjagaan komuniti sambil membantu TXJ bertindak di lokasi yang paling memerlukan.',
    whyVolunteerLabel: 'Mengapa menjadi sukarelawan',
    supportHeading: 'Bagaimana anda boleh membantu',
    supportBody:
      'Peranan sukarelawan mengikut keperluan kempen sebenar, jadi sokongan mingguan yang konsisten dan bantuan semasa kempen sekali-sekala amat dialu-alukan.',
    volunteerSupport: [
      'Bantu pasukan pembungkusan, pengagihan, outreach, dan inisiatif yang dipimpin belia.',
      'Daftar walaupun anda hanya tersedia pada hujung minggu, waktu malam, atau kempen tertentu.',
      'Bawa tenaga praktikal, semangat khidmat, dan kesediaan untuk menyokong keperluan komuniti sebenar.',
    ],
    partnershipLabel: 'Kerjasama',
    partnershipHeading: 'Peluang kerjasama',
    partnershipBody:
      'Bekerjasama dengan TXJ Care melalui barangan, logistik, sukarelawan kakitangan, atau sokongan strategik yang menguatkan penjagaan praktikal di lapangan.',
    donateLabel: 'Derma',
    donateHeading: 'Sokong belas ihsan praktikal melalui sumbangan langsung',
    donateBody:
      'Bantu membiayai bekalan penting, logistik lapangan, dan sokongan yang konsisten untuk komuniti yang memerlukan.',
    donateCta: 'Pergi ke derma',
    volunteerForm: {
      nameLabel: 'Nama',
      emailLabel: 'E-mel',
      phoneLabel: 'Telefon',
      preferredRolesLegend: 'Peranan pilihan',
      roleOptions: {
        packing: 'Pasukan pembungkusan',
        distribution: 'Sokongan pengagihan',
        assessment: 'Penilaian komuniti',
        youthAmbassador: 'Duta belia',
      },
      availabilityLabel: 'Ketersediaan',
      availabilityPlaceholder: 'contoh: Hujung minggu, waktu malam',
      locationLabel: 'Lokasi',
      locationPlaceholder: 'Bandar / Negeri',
      messageLabel: 'Mesej (pilihan)',
      captchaNote: 'Captcha belum dikonfigurasikan.',
      submittingLabel: 'Sedang dihantar...',
      submitLabel: 'Daftar sebagai sukarelawan',
      successMessage: 'Terima kasih - kami akan hubungi anda tentang langkah seterusnya.',
      errorMessage: 'Penghantaran gagal. Sila cuba lagi.',
    },
    partnerForm: {
      companyLabel: 'Syarikat / Organisasi',
      contactNameLabel: 'Nama pegawai hubungan',
      emailLabel: 'E-mel',
      phoneLabel: 'Telefon',
      partnershipOptionsLegend: 'Pilihan kerjasama',
      optionLabels: {
        goodsSponsorship: 'Tajaan barangan',
        logisticsSupport: 'Sokongan logistik',
        employeeVolunteering: 'Sukarelawan kakitangan',
        financialSupport: 'Sokongan kewangan',
      },
      messageLabel: 'Mesej',
      captchaNote: 'Captcha belum dikonfigurasikan.',
      submittingLabel: 'Sedang dihantar...',
      submitLabel: 'Hantar pertanyaan kerjasama',
      successMessage: 'Terima kasih - kami akan membuat susulan tidak lama lagi.',
      errorMessage: 'Penghantaran gagal. Sila cuba lagi.',
    },
  },
  zh: {
    sectionLabel: '参与方式',
    title: '参与方式',
    heroLead: '一起把实际的关怀化为行动',
    heroBody: '通过志愿服务、合作支持与直接捐助，一起支持马来西亚各地由青年推动的行动。',
    trustList: ['青年主导支持', '实际社区行动', '覆盖马来西亚各地的直接影响'],
    actionGridLabel: '参与方式',
    actionCards: [
      {
        title: '志愿服务',
        body: '加入由青年带动的实际支援工作，参与打包、派发、外展与社区关怀。',
        featured: true,
      },
      {
        title: '合作支持',
        body: '通过物资、物流、员工志愿服务或资金合作支持 TXJ Care。',
        featured: false,
      },
      {
        title: '捐助',
        body: '帮助把必需物资与关怀更快送到最需要帮助的社区。',
        featured: false,
      },
    ],
    featuredPathLabel: '重点参与方式',
    volunteerHeading: '加入 TXJ Care 志愿团队',
    volunteerBody:
      '参与打包、派发、外展与社区关怀等实际支援工作，帮助 TXJ 在最需要的地方快速回应。',
    whyVolunteerLabel: '为什么参与志愿服务',
    supportHeading: '你可以如何帮忙',
    supportBody: '志愿角色会根据真实行动需要灵活安排，稳定的每周参与与阶段性支援都同样欢迎。',
    volunteerSupport: [
      '支持打包团队、物资派发、外展行动与青年倡议。',
      '即使你只在周末、晚上或特定行动期间有空，也欢迎报名。',
      '带着实际行动力、服务精神，以及支持真实社区需要的意愿加入。',
    ],
    partnershipLabel: '合作',
    partnershipHeading: '合作机会',
    partnershipBody:
      '通过物资、物流、员工志愿服务或策略支持与 TXJ Care 合作，加强一线的实际关怀行动。',
    donateLabel: '捐助',
    donateHeading: '以直接捐助支持实际关怀',
    donateBody: '帮助资助必需物资、前线后勤，以及对弱势社区持续不断的支援。',
    donateCta: '前往捐助',
    volunteerForm: {
      nameLabel: '姓名',
      emailLabel: '电子邮箱',
      phoneLabel: '电话',
      preferredRolesLegend: '偏好岗位',
      roleOptions: {
        packing: '打包团队',
        distribution: '派发支援',
        assessment: '社区评估',
        youthAmbassador: '青年大使',
      },
      availabilityLabel: '可参与时间',
      availabilityPlaceholder: '例如：周末、晚上',
      locationLabel: '地点',
      locationPlaceholder: '城市 / 州属',
      messageLabel: '留言（可选）',
      captchaNote: 'Captcha 尚未配置。',
      submittingLabel: '提交中...',
      submitLabel: '报名成为志愿者',
      successMessage: '谢谢你，我们会尽快联系你说明后续安排。',
      errorMessage: '提交失败，请再试一次。',
    },
    partnerForm: {
      companyLabel: '公司 / 机构',
      contactNameLabel: '联系人姓名',
      emailLabel: '电子邮箱',
      phoneLabel: '电话',
      partnershipOptionsLegend: '合作选项',
      optionLabels: {
        goodsSponsorship: '物资赞助',
        logisticsSupport: '物流支持',
        employeeVolunteering: '员工志愿服务',
        financialSupport: '资金支持',
      },
      messageLabel: '留言',
      captchaNote: 'Captcha 尚未配置。',
      submittingLabel: '提交中...',
      submitLabel: '提交合作咨询',
      successMessage: '谢谢你，我们会尽快跟进。',
      errorMessage: '提交失败，请再试一次。',
    },
  },
}

const getInvolvedMetadataCopy: Record<Locale, {title: string; description: string}> = {
  en: {
    title: 'Get Involved with TXJ Care | Volunteer, Partner, or Donate',
    description:
      'Join TXJ Care through volunteering, partnerships, or direct giving to support practical community action across Malaysia.',
  },
  bm: {
    title: 'Sertai TXJ Care | Sukarelawan, Rakan Kerjasama, atau Derma',
    description:
      'Sertai TXJ Care melalui kesukarelawanan, kerjasama, atau sumbangan langsung untuk menyokong tindakan komuniti yang praktikal di seluruh Malaysia.',
  },
  zh: {
    title: '参与 TXJ Care | 志愿服务、合作或捐助',
    description: '通过志愿服务、合作支持或直接捐助参与 TXJ Care，一起推动马来西亚各地的实际社区行动。',
  },
}

const homeLabelByLocale: Record<Locale, string> = {
  en: 'Home',
  bm: 'Laman utama',
  zh: '首页',
}

export async function generateMetadata({params}: {params: Promise<{locale: Locale}>}): Promise<Metadata> {
  const {locale} = await params
  const copy = getInvolvedMetadataCopy[locale]

  return {
    title: copy.title,
    description: copy.description,
    alternates: buildLocaleAlternates('/get-involved', locale),
    ...buildSocialMetadata({
      title: copy.title,
      description: copy.description,
      path: `/${locale}/get-involved`,
    }),
  }
}

export default async function GetInvolvedPage({params}: {params: Promise<{locale: Locale}>}) {
  const {locale} = await params
  const settings = await getSiteSettings()
  const copy = getInvolvedPageCopy[locale]
  const siteUrl = getSiteUrl()
  const breadcrumbSchema = buildBreadcrumbSchema([
    {name: homeLabelByLocale[locale], url: `${siteUrl}/${locale}`},
    {name: copy.title, url: `${siteUrl}/${locale}/get-involved`},
  ])

  return (
    <main className={styles.pageShell}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c')}}
      />
      <Header locale={locale} />

      <div className={styles.pageFlow}>
        <section className={styles.heroCard}>
          <p className={styles.sectionLabel}>{copy.sectionLabel}</p>
          <h1>{copy.title}</h1>
          <p className={styles.heroLead}>{copy.heroLead}</p>
          <p className={styles.heroBody}>{copy.heroBody}</p>
          <ul className={styles.trustList}>
            {copy.trustList.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className={styles.actionGrid} aria-label={copy.actionGridLabel}>
          {copy.actionCards.map((card) => (
            <article
              key={card.title}
              data-testid="get-involved-action-card"
              className={card.featured ? `${styles.actionCard} ${styles.actionCardFeatured}` : styles.actionCard}
            >
              <h2>{card.title}</h2>
              <p>{card.body}</p>
            </article>
          ))}
        </section>

        <section className={styles.featuredSection} aria-labelledby="volunteer-section-heading">
          <div className={styles.featuredContent}>
            <div className={styles.featuredMain}>
              <p className={styles.sectionLabel}>{copy.featuredPathLabel}</p>
              <h2 id="volunteer-section-heading">{copy.volunteerHeading}</h2>
              <p className={styles.sectionBody}>{copy.volunteerBody}</p>
              <VolunteerForm copy={copy.volunteerForm} />
            </div>

            <aside className={styles.supportCard}>
              <p className={styles.sectionLabel}>{copy.whyVolunteerLabel}</p>
              <h3>{copy.supportHeading}</h3>
              <p>{copy.supportBody}</p>
              <ul className={styles.supportList}>
                {copy.volunteerSupport.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        <section className={styles.sectionCard} aria-labelledby="partnership-section-heading">
          <p className={styles.sectionLabel}>{copy.partnershipLabel}</p>
          <h2 id="partnership-section-heading">{copy.partnershipHeading}</h2>
          <p className={styles.sectionBody}>{copy.partnershipBody}</p>
          <PartnerForm copy={copy.partnerForm} />
        </section>

        <section className={styles.donateBand} aria-labelledby="donate-band-heading">
          <p className={styles.sectionLabel}>{copy.donateLabel}</p>
          <h2 id="donate-band-heading">{copy.donateHeading}</h2>
          <p className={styles.sectionBody}>{copy.donateBody}</p>
          <Link href={`/${locale}/donate`} className={styles.donateLink}>
            {copy.donateCta}
          </Link>
        </section>
      </div>

      <Footer locale={locale} settings={settings} />
    </main>
  )
}
