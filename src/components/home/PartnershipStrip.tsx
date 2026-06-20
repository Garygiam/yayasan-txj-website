import Image from 'next/image'
import type {Locale} from '@/i18n/config'
import styles from './homepage.module.css'

type PartnerLogo = {
  id: string
  name: string
  shortName?: string
  src: string
  width: number
  height: number
}

type PartnershipGroup = {
  id: string
  label: string
  heading: string
  body: string
  testId: string
  ariaLabel: string
  logos: PartnerLogo[]
}

const partnershipGroupsByLocale: Record<Locale, PartnershipGroup[]> = {
  en: [
    {
      id: 'community-partnership',
      label: 'Partnership',
      heading: 'In Partnership With',
      body: 'Working with trusted community and business partners to extend support across Malaysia.',
      testId: 'partnership-logo-tile',
      ariaLabel: 'Partner logos',
      logos: [
        {
          id: 'celestial-yuan',
          name: 'Celestial Yuan',
          src: '/partners/celestial-yuan.png',
          width: 220,
          height: 220,
        },
        {
          id: 'tian-xin-ju',
          name: 'Tian Xin Ju',
          src: '/partners/tian-xin-ju.png',
          width: 220,
          height: 220,
        },
        {
          id: 'g-space',
          name: 'G SPACE',
          src: '/partners/g-space.png',
          width: 220,
          height: 220,
        },
        {
          id: 'belleco',
          name: 'Belleco',
          src: '/partners/belleco.png',
          width: 220,
          height: 220,
        },
      ],
    },
    {
      id: 'ngo-partnership',
      label: 'Partnership',
      heading: 'NGO Partnership',
      body: 'Collaborating with NGO partners to reach communities that need practical support the most.',
      testId: 'ngo-partnership-logo-tile',
      ariaLabel: 'NGO partner logos',
      logos: [
        {
          id: 'pkuts-tavan',
          name: 'Persatuan Kebajikan dan usahawan tavan sabah',
          shortName: 'PKUTS / Tavan',
          src: '/partners/pkuts-tavan.jpeg',
          width: 220,
          height: 220,
        },
      ],
    },
  ],
  bm: [
    {
      id: 'community-partnership',
      label: 'Kerjasama',
      heading: 'Bersama Rakan Kerjasama',
      body: 'Bekerjasama dengan rakan komuniti dan perniagaan yang dipercayai untuk memperluas sokongan di seluruh Malaysia.',
      testId: 'partnership-logo-tile',
      ariaLabel: 'Logo rakan kerjasama',
      logos: [
        {
          id: 'celestial-yuan',
          name: 'Celestial Yuan',
          src: '/partners/celestial-yuan.png',
          width: 220,
          height: 220,
        },
        {
          id: 'tian-xin-ju',
          name: 'Tian Xin Ju',
          src: '/partners/tian-xin-ju.png',
          width: 220,
          height: 220,
        },
        {
          id: 'g-space',
          name: 'G SPACE',
          src: '/partners/g-space.png',
          width: 220,
          height: 220,
        },
        {
          id: 'belleco',
          name: 'Belleco',
          src: '/partners/belleco.png',
          width: 220,
          height: 220,
        },
      ],
    },
    {
      id: 'ngo-partnership',
      label: 'Kerjasama',
      heading: 'Kerjasama NGO',
      body: 'Bekerjasama dengan rakan NGO untuk menyampaikan sokongan praktikal kepada komuniti yang paling memerlukan.',
      testId: 'ngo-partnership-logo-tile',
      ariaLabel: 'Logo rakan NGO',
      logos: [
        {
          id: 'pkuts-tavan',
          name: 'Persatuan Kebajikan dan usahawan tavan sabah',
          shortName: 'PKUTS / Tavan',
          src: '/partners/pkuts-tavan.jpeg',
          width: 220,
          height: 220,
        },
      ],
    },
  ],
  zh: [
    {
      id: 'community-partnership',
      label: '合作伙伴',
      heading: '合作机构',
      body: '与值得信赖的社区与企业伙伴携手，把支持扩展到马来西亚各地。',
      testId: 'partnership-logo-tile',
      ariaLabel: '合作伙伴标志',
      logos: [
        {
          id: 'celestial-yuan',
          name: 'Celestial Yuan',
          src: '/partners/celestial-yuan.png',
          width: 220,
          height: 220,
        },
        {
          id: 'tian-xin-ju',
          name: 'Tian Xin Ju',
          src: '/partners/tian-xin-ju.png',
          width: 220,
          height: 220,
        },
        {
          id: 'g-space',
          name: 'G SPACE',
          src: '/partners/g-space.png',
          width: 220,
          height: 220,
        },
        {
          id: 'belleco',
          name: 'Belleco',
          src: '/partners/belleco.png',
          width: 220,
          height: 220,
        },
      ],
    },
    {
      id: 'ngo-partnership',
      label: '合作伙伴',
      heading: 'NGO 合作伙伴',
      body: '与 NGO 伙伴协作，把务实支援送到最需要帮助的社区。',
      testId: 'ngo-partnership-logo-tile',
      ariaLabel: 'NGO 合作伙伴标志',
      logos: [
        {
          id: 'pkuts-tavan',
          name: 'Persatuan Kebajikan dan usahawan tavan sabah',
          shortName: 'PKUTS / Tavan',
          src: '/partners/pkuts-tavan.jpeg',
          width: 220,
          height: 220,
        },
      ],
    },
  ],
}

export function PartnershipStrip({locale}: {locale: Locale}) {
  const partnershipGroups = partnershipGroupsByLocale[locale]

  return (
    <div className={styles.partnershipSectionStack}>
      {partnershipGroups.map((group) => (
        <section key={group.id} className={styles.partnershipStrip} aria-labelledby={`${group.id}-heading`}>
          <div className={styles.partnershipHeader}>
            <p className={styles.sectionLabel}>{group.label}</p>
            <h2 id={`${group.id}-heading`}>{group.heading}</h2>
            <p className={styles.partnershipBody}>{group.body}</p>
          </div>

          <ul className={styles.partnershipGrid} aria-label={group.ariaLabel}>
            {group.logos.map((logo) => (
              <li key={logo.id} className={styles.partnershipLogoTile} data-testid={group.testId}>
                <div className={styles.partnershipLogoFrame}>
                  <Image
                    src={logo.src}
                    alt={`${logo.name} partner logo`}
                    width={logo.width}
                    height={logo.height}
                    className={styles.partnershipLogoImage}
                  />
                </div>
                <p className={styles.partnershipLogoName}>{logo.name}</p>
                {logo.shortName ? <p className={styles.partnershipLogoMeta}>{logo.shortName}</p> : null}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
