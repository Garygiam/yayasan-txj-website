import type {Program} from '../sanity/types'

const fallbackPrograms: Program[] = [
  {
    _id: 'fallback-program-elderly',
    slug: 'elderly',
    name: {en: 'Elderly Care', bm: 'Penjagaan Warga Emas', zh: '长者关怀'},
    summary: {
      en: 'Practical essentials, mobility support, and consistent companionship.',
      bm: 'Keperluan asas, sokongan mobiliti, dan teman yang berterusan.',
      zh: '提供日常必需品、行动支援与持续陪伴。',
    },
    body: {
      en: 'TXJ Care supports elderly communities through practical check-ins, daily essentials, and dignity-centered care.',
      bm: 'TXJ Care menyokong komuniti warga emas melalui lawatan berkala, keperluan harian, dan penjagaan yang memelihara maruah.',
      zh: 'TXJ Care 透过定期关怀、日常必需品与以尊严为核心的照护，支持长者群体。',
    },
    howToHelp: {
      en: 'You can support with care packs, mobility essentials, and volunteer visits.',
      bm: 'Anda boleh membantu melalui pek penjagaan, keperluan mobiliti, dan lawatan sukarelawan.',
      zh: '你可以通过关怀包、行动辅助用品与志愿探访来提供支持。',
    },
    logisticsNotes: {
      en: 'Deliveries are coordinated with local partners to match priority needs.',
      bm: 'Penghantaran diselaraskan bersama rakan tempatan mengikut keutamaan keperluan.',
      zh: '物资派送会与当地伙伴协调，以配合最优先的实际需求。',
    },
  },
  {
    _id: 'fallback-program-homeless',
    slug: 'homeless',
    name: {en: 'Homeless Support', bm: 'Sokongan Gelandangan', zh: '流浪者援助'},
    summary: {
      en: 'Meals, hygiene kits, and street outreach for people in immediate need.',
      bm: 'Makanan, kit kebersihan, dan outreach jalanan untuk mereka yang memerlukan bantuan segera.',
      zh: '为急需帮助的人提供餐食、卫生包与街头外展支援。',
    },
    body: {
      en: 'TXJ Care provides practical frontline support for homeless communities through food aid, hygiene supplies, and direct outreach.',
      bm: 'TXJ Care menyediakan sokongan barisan hadapan yang praktikal untuk komuniti gelandangan melalui bantuan makanan, bekalan kebersihan, dan outreach secara langsung.',
      zh: 'TXJ Care 透过食物援助、卫生用品与直接外展行动，为流浪者群体提供实际的一线支持。',
    },
    howToHelp: {
      en: 'You can help by sponsoring meal packs, hygiene items, and volunteer outreach support.',
      bm: 'Anda boleh membantu dengan menaja pek makanan, barangan kebersihan, dan sokongan outreach sukarelawan.',
      zh: '你可以赞助餐食包、卫生用品与志愿外展支援来参与帮助。',
    },
    logisticsNotes: {
      en: 'The team coordinates urban distribution rounds based on current street-level needs.',
      bm: 'Pasukan menyelaras rondaan pengagihan di kawasan bandar berdasarkan keperluan semasa di lapangan.',
      zh: '团队会根据街头最新需求来协调城市分发路线。',
    },
  },
  {
    _id: 'fallback-program-orphanage',
    slug: 'orphanage',
    name: {en: 'Orphanage Partnerships', bm: 'Kerjasama Rumah Anak Yatim', zh: '孤儿院合作'},
    summary: {
      en: 'Daily necessities and learning support for children in partner homes.',
      bm: 'Keperluan harian dan sokongan pembelajaran untuk kanak-kanak di rumah jagaan rakan.',
      zh: '为合作院舍中的孩子提供日常必需品与学习支持。',
    },
    body: {
      en: 'TXJ Care works with partner homes to provide essentials, learning materials, and sustained support for children.',
      bm: 'TXJ Care bekerjasama dengan rumah jagaan rakan untuk menyediakan barangan keperluan, bahan pembelajaran, dan sokongan berterusan kepada kanak-kanak.',
      zh: 'TXJ Care 与合作院舍携手，为孩子提供必需品、学习物资与持续支持。',
    },
    howToHelp: {
      en: 'You can contribute school supplies, daily necessities, and sponsorship support.',
      bm: 'Anda boleh menyumbang bekalan sekolah, keperluan harian, dan sokongan tajaan.',
      zh: '你可以捐助学习用品、日常必需品与赞助支持。',
    },
    logisticsNotes: {
      en: 'Support is scheduled with partner homes to align donations with current operational needs.',
      bm: 'Sokongan dijadualkan bersama rumah jagaan rakan supaya sumbangan menepati keperluan operasi semasa.',
      zh: '支援会与合作院舍协调安排，确保捐助符合当前运营需要。',
    },
  },
  {
    _id: 'fallback-program-rural',
    slug: 'rural',
    name: {en: 'Rural Community Aid', bm: 'Bantuan Komuniti Luar Bandar', zh: '乡区社区援助'},
    summary: {
      en: 'Remote-area assessments, supply runs, and follow-up care delivery.',
      bm: 'Penilaian kawasan pedalaman, penghantaran bekalan, dan susulan bantuan penjagaan.',
      zh: '进行偏远地区评估、物资运送与后续关怀支援。',
    },
    body: {
      en: 'TXJ Care extends support to rural communities through field assessments, targeted aid runs, and follow-up delivery.',
      bm: 'TXJ Care memperluas sokongan kepada komuniti luar bandar melalui penilaian lapangan, penghantaran bantuan bersasar, dan susulan bekalan.',
      zh: 'TXJ Care 透过实地评估、定向援助行动与后续物资运送，把支持带到乡区社区。',
    },
    howToHelp: {
      en: 'You can support transport, essential goods, and rural logistics sponsorship.',
      bm: 'Anda boleh menyokong pengangkutan, barangan keperluan, dan tajaan logistik luar bandar.',
      zh: '你可以支持交通、必需物资与乡区物流赞助。',
    },
    logisticsNotes: {
      en: 'Distribution planning depends on route access, distance, and verified local requests.',
      bm: 'Perancangan pengagihan bergantung pada akses laluan, jarak, dan permintaan tempatan yang disahkan.',
      zh: '分发规划会依据路线通达性、距离与已核实的当地需求来安排。',
    },
  },
]

export function getFallbackPrograms(): Program[] {
  return [...fallbackPrograms].sort((a, b) => a.slug.localeCompare(b.slug))
}

export function getFallbackProgramBySlug(slug: string): Program | null {
  return fallbackPrograms.find((program) => program.slug === slug) ?? null
}
