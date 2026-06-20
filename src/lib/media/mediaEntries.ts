export type MediaEntry = {
  id: string
  title: string
  publication: string
  publishedAt: string
  summary: string
  imageSrc: string
  imageAlt: string
  url: string
}

export const mediaEntries: MediaEntry[] = [
  {
    id: 'seehua-2026-05-18-cultural-community',
    title: '“甘榜加罗魅力社区活动”弘扬都顺族传统文化',
    publication: 'See Hua Daily News',
    publishedAt: '2026-05-18',
    summary:
      'Coverage highlighting a community-led cultural activity that brought together youth participation, local heritage, and public attention around on-the-ground service work.',
    imageSrc: '/coverage-1.jpg',
    imageAlt: 'See Hua Daily News clipping showing community and charity coverage',
    url: 'https://news.seehua.com/post/1486142',
  },
  {
    id: 'seehua-2026-06-02-home-visit',
    title: '下南南甘榜公益探访',
    publication: 'See Hua Daily News',
    publishedAt: '2026-06-02',
    summary:
      'A practical home-visit report featuring welfare outreach, wheelchair support, and direct aid delivered to an elderly resident in KG. Kionsom Tengah.',
    imageSrc: '/coverage-2.jpg',
    imageAlt: 'Newspaper clipping about a welfare home visit and wheelchair support',
    url: '',
  },
  {
    id: 'seehua-2026-03-08-donation-handover',
    title: '传海福利联盟爱心捐赠 移交新斋所冷气食品包',
    publication: 'See Hua Daily News',
    publishedAt: '2026-03-08',
    summary:
      'Printed coverage of a local donation handover focused on practical support, including supplies and community assistance shared through a welfare alliance effort.',
    imageSrc: '/coverage-3.jpg',
    imageAlt: 'See Hua Daily News clipping showing a donation handover and community group photo',
    url: '',
  },
]
