import type {Metadata} from 'next'
import type {Locale} from '@/i18n/config'
import {Footer} from '@/components/Footer'
import {Header} from '@/components/Header'
import {FinalCtaBand} from '@/components/home/FinalCtaBand'
import {FounderSpotlight} from '@/components/home/FounderSpotlight'
import {HeroSlider} from '@/components/home/HeroSlider'
import {ImpactStats} from '@/components/home/ImpactStats'
import {LatestUpdates} from '@/components/home/LatestUpdates'
import {PartnershipStrip} from '@/components/home/PartnershipStrip'
import {PillarsPreview} from '@/components/home/PillarsPreview'
import {TransparencyStrip} from '@/components/home/TransparencyStrip'
import {UrgentNeedsBanner} from '@/components/home/UrgentNeedsBanner'
import styles from '@/components/home/homepage.module.css'
import {getHomepageData} from '@/lib/homepage/getHomepageData'
import {buildLocaleAlternates} from '@/lib/seo/alternates'
import {buildSocialMetadata} from '@/lib/seo/metadata'
import {buildOrganizationSchemas} from '@/lib/seo/schema'
import {getSiteUrl} from '@/lib/seo/siteUrl'
import {getSiteSettings} from '@/lib/sanity/read'

const homeMetadataCopy: Record<Locale, {title: string; description: string}> = {
  en: {
    title: 'TXJ Care | Community Support Across Malaysia',
    description: 'TXJ Care connects practical aid, youth-led action, and community support across Malaysia.',
  },
  bm: {
    title: 'TXJ Care | Sokongan Komuniti Di Seluruh Malaysia',
    description:
      'TXJ Care menghubungkan bantuan praktikal, tindakan dipacu belia, dan sokongan komuniti di seluruh Malaysia.',
  },
  zh: {
    title: 'TXJ Care | 马来西亚社区关怀与援助',
    description: 'TXJ Care 连接实际援助、青年行动与马来西亚各地的社区支持。',
  },
}

const homeFallbackContentByLocale: Record<
  Locale,
  {
    stats: Array<{value: string; label: string}>
    urgentNeeds: {title: string; items: string[]; ctaLabel: string}
    pillars: Array<{id: string; slug: string; title: string; summary: string}>
    transparency: {
      title: string
      steps: Array<{id: string; title: string; description: string}>
    }
    founder: {
      title: string
      summary: string
      quote: string
    }
    latestUpdates: Array<{id: string; slug: string; title: string; summary: string; publishedAt: string}>
    finalCtas: Array<{id: string; label: string; body: string}>
  }
> = {
  en: {
    stats: [
      {value: '5,000+', label: 'Families helped'},
      {value: '120+', label: 'Youth volunteers mobilized'},
      {value: '40', label: 'Community routes covered monthly'},
    ],
    urgentNeeds: {
      title: 'Urgent Needs',
      items: ['Rice', 'School supplies', 'Basic hygiene kits'],
      ctaLabel: 'Donate Essentials',
    },
    pillars: [
      {
        id: 'pillar-homeless',
        slug: 'homeless',
        title: 'Homeless Support',
        summary: 'Meals, hygiene kits, and street outreach for people in immediate need.',
      },
      {
        id: 'pillar-orphanage',
        slug: 'orphanage',
        title: 'Orphanage Partnerships',
        summary: 'Daily necessities and learning support for children in partner homes.',
      },
      {
        id: 'pillar-elderly',
        slug: 'elderly',
        title: 'Elderly Care',
        summary: 'Practical essentials, mobility support, and consistent companionship.',
      },
      {
        id: 'pillar-rural',
        slug: 'rural',
        title: 'Rural Community Aid',
        summary: 'Remote-area assessments, supply runs, and follow-up care delivery.',
      },
    ],
    transparency: {
      title: 'How Help Works',
      steps: [
        {
          id: 'transparency-receive',
          title: 'Receive',
          description: 'We collect funds, goods, and requests directly from community partners.',
        },
        {
          id: 'transparency-verify',
          title: 'Verify',
          description: 'The team confirms priorities and matches aid to practical local needs.',
        },
        {
          id: 'transparency-deliver',
          title: 'Deliver',
          description: 'Volunteers distribute support and document what reached each community.',
        },
      ],
    },
    founder: {
      title: 'Founder Spotlight',
      summary: 'Dato Sri Charles Hwang leads a practical, long-term model of community care.',
      quote: 'Real help means showing up consistently with what people actually need.',
    },
    latestUpdates: [
      {
        id: 'story-field-update',
        slug: 'field-update',
        title: '2026 field supplies update',
        summary: 'The latest distribution round delivered essentials to families and elders.',
        publishedAt: '2026-06-01',
      },
    ],
    finalCtas: [
      {
        id: 'cta-donate',
        label: 'Donate',
        body: 'Fund logistics, meals, school supplies, and urgent essentials.',
      },
      {
        id: 'cta-partner',
        label: 'Partner',
        body: 'Coordinate sponsorships, in-kind support, and joint outreach with TXJ Care.',
      },
    ],
  },
  bm: {
    stats: [
      {value: '5,000+', label: 'Keluarga dibantu'},
      {value: '120+', label: 'Sukarelawan belia digerakkan'},
      {value: '40', label: 'Laluan komuniti diliputi setiap bulan'},
    ],
    urgentNeeds: {
      title: 'Keperluan Mendesak',
      items: ['Beras', 'Bekalan sekolah', 'Kit kebersihan asas'],
      ctaLabel: 'Sumbang Keperluan',
    },
    pillars: [
      {
        id: 'pillar-homeless',
        slug: 'homeless',
        title: 'Sokongan Gelandangan',
        summary: 'Makanan, kit kebersihan, dan bantuan lapangan untuk mereka yang memerlukan segera.',
      },
      {
        id: 'pillar-orphanage',
        slug: 'orphanage',
        title: 'Kerjasama Rumah Anak Yatim',
        summary: 'Keperluan harian dan sokongan pembelajaran untuk kanak-kanak di rumah rakan.',
      },
      {
        id: 'pillar-elderly',
        slug: 'elderly',
        title: 'Penjagaan Warga Emas',
        summary: 'Keperluan praktikal, sokongan mobiliti, dan pendampingan yang konsisten.',
      },
      {
        id: 'pillar-rural',
        slug: 'rural',
        title: 'Bantuan Komuniti Luar Bandar',
        summary: 'Penilaian kawasan pedalaman, penghantaran bekalan, dan susulan penjagaan.',
      },
    ],
    transparency: {
      title: 'Bagaimana Bantuan Disalurkan',
      steps: [
        {
          id: 'transparency-receive',
          title: 'Terima',
          description: 'Kami mengumpul dana, barangan, dan permintaan terus daripada rakan komuniti.',
        },
        {
          id: 'transparency-verify',
          title: 'Sahkan',
          description: 'Pasukan mengesahkan keutamaan dan memadankan bantuan dengan keperluan setempat.',
        },
        {
          id: 'transparency-deliver',
          title: 'Salurkan',
          description: 'Sukarelawan mengagihkan bantuan dan merekodkan apa yang sampai kepada komuniti.',
        },
      ],
    },
    founder: {
      title: 'Sorotan Pengasas',
      summary: 'Dato Sri Charles Hwang memimpin model penjagaan komuniti yang praktikal dan berjangka panjang.',
      quote: 'Bantuan sebenar bermaksud hadir secara konsisten dengan apa yang benar-benar diperlukan.',
    },
    latestUpdates: [
      {
        id: 'story-field-update',
        slug: 'field-update',
        title: 'Kemaskini bekalan lapangan 2026',
        summary: 'Pusingan agihan terkini menyampaikan keperluan asas kepada keluarga dan warga emas.',
        publishedAt: '2026-06-01',
      },
    ],
    finalCtas: [
      {
        id: 'cta-donate',
        label: 'Sumbang',
        body: 'Biayai logistik, makanan, bekalan sekolah, dan keperluan mendesak.',
      },
      {
        id: 'cta-partner',
        label: 'Jadi Rakan',
        body: 'Selaraskan tajaan, sokongan barangan, dan jangkauan bersama TXJ Care.',
      },
    ],
  },
  zh: {
    stats: [
      {value: '5,000+', label: '受助家庭'},
      {value: '120+', label: '动员青年志愿者'},
      {value: '40', label: '每月覆盖社区路线'},
    ],
    urgentNeeds: {
      title: '紧急需求',
      items: ['白米', '学校用品', '基础卫生包'],
      ctaLabel: '捐助物资',
    },
    pillars: [
      {
        id: 'pillar-homeless',
        slug: 'homeless',
        title: '流浪者支援',
        summary: '为急需帮助的人提供餐食、卫生包与街头关怀服务。',
      },
      {
        id: 'pillar-orphanage',
        slug: 'orphanage',
        title: '孤儿院合作',
        summary: '为合作机构中的孩子提供日常所需与学习支持。',
      },
      {
        id: 'pillar-elderly',
        slug: 'elderly',
        title: '长者关怀',
        summary: '提供实际物资、行动支持与持续陪伴。',
      },
      {
        id: 'pillar-rural',
        slug: 'rural',
        title: '乡区社区援助',
        summary: '进行偏远地区评估、物资运输与后续关怀服务。',
      },
    ],
    transparency: {
      title: '援助如何落实',
      steps: [
        {
          id: 'transparency-receive',
          title: '接收',
          description: '我们直接从社区伙伴接收资金、物资与援助需求。',
        },
        {
          id: 'transparency-verify',
          title: '核实',
          description: '团队确认优先事项，并把援助对应到实际在地需求。',
        },
        {
          id: 'transparency-deliver',
          title: '送达',
          description: '志愿者分发援助，并记录每个社区实际收到的支持。',
        },
      ],
    },
    founder: {
      title: '创办人介绍',
      summary: 'Dato Sri Charles Hwang 以务实且长期的方式带领社区关怀工作。',
      quote: '真正的帮助，就是持续出现，并带来人们真正需要的支持。',
    },
    latestUpdates: [
      {
        id: 'story-field-update',
        slug: 'field-update',
        title: '2026 年一线物资更新',
        summary: '最新一轮分发已把必需品送到家庭与长者手中。',
        publishedAt: '2026-06-01',
      },
    ],
    finalCtas: [
      {
        id: 'cta-donate',
        label: '捐助',
        body: '支持物流、餐食、学校用品与紧急必需品。',
      },
      {
        id: 'cta-partner',
        label: '成为伙伴',
        body: '与 TXJ Care 协调赞助、物资支持与联合外展行动。',
      },
    ],
  },
}

export async function generateMetadata({params}: {params: Promise<{locale: Locale}>}): Promise<Metadata> {
  const {locale} = await params
  const copy = homeMetadataCopy[locale]

  return {
    title: copy.title,
    description: copy.description,
    alternates: buildLocaleAlternates('/', locale),
    ...buildSocialMetadata({
      title: copy.title,
      description: copy.description,
      path: `/${locale}`,
    }),
  }
}

export default async function HomePage({params}: {params: Promise<{locale: Locale}>}) {
  const {locale} = await params
  const [homepage, settings] = await Promise.all([getHomepageData(locale), getSiteSettings()])
  const fallbackContent = homeFallbackContentByLocale[locale]
  const siteUrl = getSiteUrl()
  const organizationSchemas = buildOrganizationSchemas({
    siteUrl,
    brandName: settings?.brandName ?? 'TXJ Care',
    officialName: settings?.officialName ?? 'Yayasan TXJ Malaysia',
    description: homeMetadataCopy[locale].description,
  })

  const hero = homepage.hero
  const stats =
    homepage.stats.length > 0
      ? homepage.stats
      : fallbackContent.stats
  const urgentNeeds =
    homepage.urgentNeeds ?? {
      title: fallbackContent.urgentNeeds.title,
      items: fallbackContent.urgentNeeds.items,
      ctaLabel: fallbackContent.urgentNeeds.ctaLabel,
      ctaHref: `/${locale}/donate`,
    }
  const pillars =
    homepage.pillars.length > 0
      ? homepage.pillars
      : fallbackContent.pillars.map((pillar) => ({
          ...pillar,
          href: `/${locale}/programs/${pillar.slug}`,
        }))
  const transparency = homepage.transparency ?? fallbackContent.transparency
  const founder = homepage.founder ?? {
    title: fallbackContent.founder.title,
    summary: fallbackContent.founder.summary,
    quote: fallbackContent.founder.quote,
    imageUrl: null,
    href: `/${locale}/about`,
  }
  const latestUpdates =
    homepage.latestUpdates.length > 0
      ? homepage.latestUpdates
      : fallbackContent.latestUpdates.map((story) => ({
          ...story,
          href: `/${locale}/impact`,
        }))
  const finalCtas =
    homepage.finalCtas.length > 0
      ? homepage.finalCtas
      : fallbackContent.finalCtas.map((cta) => ({
          ...cta,
          href: cta.id === 'cta-donate' ? `/${locale}/donate` : `/${locale}/get-involved`,
        }))

  return (
    <main className={styles.pageShell}>
      {organizationSchemas.map((schema, index) => (
        <script
          key={`org-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(schema).replace(/</g, '\\u003c')}}
        />
      ))}
      <Header locale={locale} />
      <div className={styles.contentShell}>
        <HeroSlider hero={hero} locale={locale} />
        <ImpactStats stats={stats} locale={locale} />
        <UrgentNeedsBanner urgentNeeds={urgentNeeds} locale={locale} />
        <PillarsPreview pillars={pillars} locale={locale} />
        <TransparencyStrip transparency={transparency} locale={locale} />
        <FounderSpotlight founder={founder} locale={locale} />
        <LatestUpdates stories={latestUpdates} locale={locale} />
        <FinalCtaBand ctas={finalCtas} locale={locale} />
        <PartnershipStrip locale={locale} />
      </div>
      <Footer locale={locale} settings={settings} />
    </main>
  )
}
