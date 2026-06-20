import type {Locale} from '@/i18n/config'

type AboutStoryContent = {
  storyTitle: string
  storyParagraphs: string[]
  missionTitle: string
  mission: string
  visionTitle: string
  vision: string
  pillarsTitle: string
  pillarsIntro: string
  pillars: {title: string; description: string}[]
  connectionModel: string
  youthCorpsTitle: string
  youthCorpsParagraphs: string[]
  valuesTitle: string
  values: {title: string; description: string}[]
  founderTitle: string
  founderIntro: string
  founderRoles: string[]
  founderBeliefIntro: string
  founderQuote: string
  founderGroundNote: string
  impactTitle: string
  impactStats: string[]
  impactClosing: string
}

const aboutStoryContentByLocale: Record<Locale, AboutStoryContent> = {
  en: {
    storyTitle: 'Our Story',
    storyParagraphs: [
      "Yayasan TXJ Malaysia was founded by Dato' Sri Charles Hwang - a philanthropist who saw a gap between good intentions and real, practical help.",
      'Too often, charitable efforts are scattered, temporary, or disconnected from what communities actually need. A homeless person needs more than a one-time meal. An orphanage needs consistent supplies, not just holiday visits. An elderly villager living alone needs someone to show up - not just on special occasions, but regularly. And a family in a remote rural area, cut off by mountains and rivers, needs someone willing to cross the bridge.',
      "So Dato' Sri Charles Hwang gathered a team of passionate young Malaysians and created something different: TXJ Care.",
      'Not just a charity. A movement of practical compassion.',
    ],
    missionTitle: 'Our Mission',
    mission:
      "To provide comprehensive, practical support to Malaysia's most vulnerable communities - ensuring no one lacks life's basic necessities, regardless of their location or circumstances.",
    visionTitle: 'Our Vision',
    vision:
      'A Malaysia where every individual has access to essential daily needs, where communities are strengthened through shared support, and where compassion translates into tangible improvements in quality of life.',
    pillarsTitle: 'Our Four Pillars',
    pillarsIntro: 'We focus on four communities that are often overlooked:',
    pillars: [
      {
        title: 'Homeless Support',
        description: 'Daily meals, hygiene facilities, shelter linkage, and clothing.',
      },
      {
        title: 'Orphanage Partnerships',
        description:
          'Regular supplies of daily necessities, educational materials, recreational equipment, and nutritional support.',
      },
      {
        title: 'Elderly Care',
        description:
          'Delivery of daily essentials, mobility aids, special diets, and social connection activities.',
      },
      {
        title: 'Rural Community Aid',
        description:
          'Distribution of essential goods to remote areas, overcoming transportation barriers and geographic isolation.',
      },
    ],
    connectionModel:
      'These are not separate silos. We call it the TXJ Care Connection Model - resources, volunteers, and care flow between all four pillars. A youth volunteer who packs supplies for the homeless might also deliver food to an elderly villager. A former orphan might grow up to become a youth ambassador. Those we help become those who help.',
    youthCorpsTitle: 'The TXJ Youth Corps',
    youthCorpsParagraphs: [
      'TXJ Care is youth-driven by design.',
      'Our Youth Corps are not just volunteers - they are leaders, decision-makers, and the heartbeat of our organisation. They manage logistics, coordinate distributions, build community relationships, and bring fresh energy and ideas.',
      'We believe young Malaysians are not the future of change. They are the change, right now.',
    ],
    valuesTitle: 'Our Values',
    values: [
      {
        title: 'Practicality',
        description: 'No empty slogans. Only measurable, tangible help.',
      },
      {
        title: 'Consistency',
        description: 'We show up regularly, not just during holidays or emergencies.',
      },
      {
        title: 'Dignity',
        description:
          'Every person we serve is treated with respect. We give, but we never make anyone feel small.',
      },
      {
        title: 'Community',
        description: "We don't replace communities. We strengthen them from within.",
      },
    ],
    founderTitle: "Our Founder - Dato' Sri Charles Hwang",
    founderIntro:
      "Dato' Sri Charles Hwang is a successful entrepreneur and philanthropist who holds chairmanships across multiple companies and institutions, including:",
    founderRoles: [
      'Chairman of TXJ Group Sdn Bhd',
      'Chairman of Tian Xin Ju Geomancy Centre',
      'Chairman of Tian Xin Ju International Metaphysics and Energy Science Certified Institute Association',
      'President of China NPO Malaysia Chapter',
      'Visiting Professor at Nation of Hawaii University',
    ],
    founderBeliefIntro: 'But beyond the titles, he is known for one simple belief:',
    founderQuote: '"Real help means showing up consistently with what people actually need."',
    founderGroundNote:
      "He personally walks into remote villages, crossing streams, muddy roads, and swaying suspension bridges to deliver aid, talk to elders, and listen. He doesn't just lead from an office. He leads from the ground.",
    impactTitle: 'Our Impact So Far',
    impactStats: [
      '5,000+ families received essential packs',
      '100,000+ meals served or supplied',
      '50+ rural communities regularly supported',
      '200+ active youth volunteers',
      'Multiple states across Malaysia, including Sabah and Sarawak',
    ],
    impactClosing:
      "We don't just count numbers. We count connections. Every meal, every school bag, every visit to a bedridden elder - that is a bridge of compassion built.",
  },
  bm: {
    storyTitle: 'Kisah Kami',
    storyParagraphs: [
      "Yayasan TXJ Malaysia diasaskan oleh Dato' Sri Charles Hwang - seorang dermawan yang melihat jurang antara niat yang baik dan bantuan sebenar yang praktikal.",
      'Terlalu kerap, usaha kebajikan bersifat berpecah-pecah, sementara, atau tidak benar-benar berkait dengan keperluan komuniti. Seorang gelandangan memerlukan lebih daripada satu hidangan sekali sahaja. Sebuah rumah anak yatim memerlukan bekalan yang konsisten, bukan sekadar lawatan musim perayaan. Seorang warga emas di kampung yang tinggal sendirian memerlukan seseorang yang hadir - bukan hanya pada waktu tertentu, tetapi secara berkala. Dan sebuah keluarga di kawasan pedalaman, yang terpisah oleh gunung dan sungai, memerlukan seseorang yang sanggup menyeberangi jambatan.',
      "Jadi Dato' Sri Charles Hwang mengumpulkan sekumpulan anak muda Malaysia yang bersemangat dan membina sesuatu yang berbeza: TXJ Care.",
      'Bukan sekadar sebuah badan kebajikan. Sebuah gerakan belas ihsan yang praktikal.',
    ],
    missionTitle: 'Misi Kami',
    mission:
      'Memberikan sokongan yang menyeluruh dan praktikal kepada komuniti paling rentan di Malaysia - memastikan tiada sesiapa yang kekurangan keperluan asas kehidupan tanpa mengira lokasi atau keadaan mereka.',
    visionTitle: 'Visi Kami',
    vision:
      'Sebuah Malaysia di mana setiap individu mempunyai akses kepada keperluan harian yang asas, di mana komuniti diperkukuh melalui sokongan bersama, dan di mana belas ihsan diterjemahkan kepada peningkatan nyata dalam kualiti hidup.',
    pillarsTitle: 'Empat Tonggak Kami',
    pillarsIntro: 'Kami memberi tumpuan kepada empat komuniti yang sering terpinggir:',
    pillars: [
      {
        title: 'Sokongan Gelandangan',
        description: 'Hidangan harian, kemudahan kebersihan, bantuan tempat perlindungan, dan pakaian.',
      },
      {
        title: 'Kerjasama Rumah Anak Yatim',
        description:
          'Bekalan keperluan harian secara berkala, bahan pendidikan, peralatan rekreasi, dan sokongan pemakanan.',
      },
      {
        title: 'Penjagaan Warga Emas',
        description:
          'Penghantaran keperluan harian, alat bantuan mobiliti, diet khas, dan aktiviti hubungan sosial.',
      },
      {
        title: 'Bantuan Komuniti Pedalaman',
        description:
          'Pengagihan barangan keperluan ke kawasan terpencil dengan mengatasi halangan pengangkutan dan pengasingan geografi.',
      },
    ],
    connectionModel:
      'Ini bukan empat bahagian yang terpisah. Kami memanggilnya Model Hubungan TXJ Care - sumber, sukarelawan, dan penjagaan mengalir antara keempat-empat tonggak ini. Seorang sukarelawan belia yang membungkus bekalan untuk gelandangan mungkin juga menghantar makanan kepada warga emas di kampung. Seorang bekas anak yatim mungkin membesar dan menjadi duta belia. Mereka yang kami bantu akan menjadi mereka yang membantu.',
    youthCorpsTitle: 'Kor Belia TXJ',
    youthCorpsParagraphs: [
      'TXJ Care digerakkan oleh belia secara sengaja.',
      'Kor Belia kami bukan sekadar sukarelawan - mereka ialah pemimpin, pembuat keputusan, dan nadi organisasi kami. Mereka mengurus logistik, menyelaras pengagihan, membina hubungan komuniti, serta membawa tenaga dan idea baharu.',
      'Kami percaya anak muda Malaysia bukan masa depan perubahan. Mereka ialah perubahan itu, sekarang.',
    ],
    valuesTitle: 'Nilai Kami',
    values: [
      {
        title: 'Kepraktisan',
        description: 'Tiada slogan kosong. Hanya bantuan yang boleh diukur dan benar-benar nyata.',
      },
      {
        title: 'Konsistensi',
        description: 'Kami hadir secara berkala, bukan hanya ketika musim perayaan atau kecemasan.',
      },
      {
        title: 'Maruah',
        description:
          'Setiap individu yang kami bantu dilayan dengan hormat. Kami memberi, tetapi kami tidak pernah membuat sesiapa berasa kecil.',
      },
      {
        title: 'Komuniti',
        description: 'Kami tidak menggantikan komuniti. Kami memperkukuhnya dari dalam.',
      },
    ],
    founderTitle: "Pengasas Kami - Dato' Sri Charles Hwang",
    founderIntro:
      "Dato' Sri Charles Hwang ialah seorang usahawan dan dermawan berjaya yang memegang jawatan pengerusi dalam pelbagai syarikat dan institusi, termasuk:",
    founderRoles: [
      'Pengerusi TXJ Group Sdn Bhd',
      'Pengerusi Tian Xin Ju Geomancy Centre',
      'Pengerusi Tian Xin Ju International Metaphysics and Energy Science Certified Institute Association',
      'Presiden China NPO Malaysia Chapter',
      'Profesor Pelawat di Nation of Hawaii University',
    ],
    founderBeliefIntro: 'Namun di sebalik semua gelaran itu, beliau dikenali kerana satu kepercayaan yang mudah:',
    founderQuote: '"Bantuan sebenar bermaksud hadir secara konsisten dengan apa yang benar-benar diperlukan orang ramai."',
    founderGroundNote:
      'Beliau sendiri turun ke kampung-kampung pedalaman, menyeberangi sungai, jalan berlumpur, dan jambatan gantung yang bergoyang untuk menyampaikan bantuan, berbual dengan warga emas, dan mendengar. Beliau tidak hanya memimpin dari pejabat. Beliau memimpin dari lapangan.',
    impactTitle: 'Kesan Kami Setakat Ini',
    impactStats: [
      '5,000+ keluarga menerima pek keperluan asas',
      '100,000+ hidangan dihidangkan atau dibekalkan',
      '50+ komuniti pedalaman menerima sokongan berkala',
      '200+ sukarelawan belia aktif',
      'Pelbagai negeri di Malaysia, termasuk Sabah dan Sarawak',
    ],
    impactClosing:
      'Kami bukan sekadar mengira angka. Kami mengira hubungan. Setiap hidangan, setiap beg sekolah, setiap lawatan kepada warga emas yang terlantar - itulah jambatan belas ihsan yang dibina.',
  },
  zh: {
    storyTitle: '我们的故事',
    storyParagraphs: [
      "Yayasan TXJ Malaysia 由拿督斯里 Charles Hwang 创立。他是一位慈善家，看见了善意与真正务实援助之间的落差。",
      '很多时候，慈善行动零散、短暂，或与社区真正需要的东西脱节。流浪者需要的不只是一次性的餐食。孤儿院需要稳定持续的物资，而不只是节庆探访。独居乡村长者需要的是有人出现陪伴他们，不是在特别日子才来，而是持续地来。而住在偏远山区、被山河阻隔的家庭，需要的是愿意跨过桥梁前去帮助他们的人。',
      "因此，拿督斯里 Charles Hwang 召集了一群充满热忱的马来西亚年轻人，创建了与众不同的 TXJ Care。",
      '这不只是一家慈善机构，而是一场务实关怀的行动。',
    ],
    missionTitle: '我们的使命',
    mission:
      '为马来西亚最脆弱的群体提供全面而务实的支持，不论他们身处何地、处于何种境况，都不缺乏生活基本所需。',
    visionTitle: '我们的愿景',
    vision:
      '建设一个人人都能获得基本生活所需、社区因彼此扶持而更有力量、关怀能够转化为切实生活改善的马来西亚。',
    pillarsTitle: '我们的四大支柱',
    pillarsIntro: '我们聚焦于四个常被忽视的群体：',
    pillars: [
      {
        title: '流浪者支持',
        description: '提供日常餐食、卫生设施、庇护所转介与衣物援助。',
      },
      {
        title: '孤儿院伙伴合作',
        description: '定期提供生活必需品、教育材料、康乐设备与营养支持。',
      },
      {
        title: '长者关怀',
        description: '配送日常必需品、行动辅具、特殊饮食与社交陪伴活动。',
      },
      {
        title: '偏远社区援助',
        description: '把必需物资送到偏远地区，克服交通障碍与地理隔绝。',
      },
    ],
    connectionModel:
      '这四个支柱并不是彼此割裂的。我们称之为 TXJ Care 连接模式: 资源、志愿者与关怀在四个支柱之间流动。为流浪者打包物资的青年志愿者，也可能去为乡村长者送餐。曾经受助的孤儿，未来也可能成长为青年大使。我们帮助过的人，也会成为帮助别人的人。',
    youthCorpsTitle: 'TXJ 青年团',
    youthCorpsParagraphs: [
      'TXJ Care 从一开始就以青年为核心驱动力。',
      '我们的青年团不只是志愿者，更是领导者、决策者，也是整个组织的心跳。他们负责物流、协调派发、建立社区关系，并带来新的能量与想法。',
      '我们相信，马来西亚年轻人不是改变的未来，他们现在就是改变本身。',
    ],
    valuesTitle: '我们的价值观',
    values: [
      {
        title: '务实',
        description: '拒绝空洞口号，只做可衡量、看得见的帮助。',
      },
      {
        title: '持续',
        description: '我们持续出现，而不只是在节庆或紧急时刻才行动。',
      },
      {
        title: '尊严',
        description: '我们以尊重对待每一个服务对象。我们给予帮助，但绝不让任何人感到卑微。',
      },
      {
        title: '社区',
        description: '我们不取代社区，而是从内部增强社区的力量。',
      },
    ],
    founderTitle: "我们的创办人 - 拿督斯里 Charles Hwang",
    founderIntro:
      '拿督斯里 Charles Hwang 是一位成功企业家与慈善家，担任多家企业与机构的主席，包括：',
    founderRoles: [
      'TXJ Group Sdn Bhd 主席',
      'Tian Xin Ju Geomancy Centre 主席',
      'Tian Xin Ju International Metaphysics and Energy Science Certified Institute Association 主席',
      'China NPO Malaysia Chapter 会长',
      'Nation of Hawaii University 客座教授',
    ],
    founderBeliefIntro: '但比起这些头衔，更让人记住的是他始终坚持的一句信念：',
    founderQuote: '"真正的帮助，就是持续出现，并带来人们真正需要的支持。"',
    founderGroundNote:
      '他亲自走进偏远村落，跨过溪流、泥泞小路和摇晃的吊桥，把援助送到当地，与长者交谈，倾听他们的需要。他不是在办公室里领导，而是在第一线领导。',
    impactTitle: '我们至今的影响',
    impactStats: [
      '5,000+ 户家庭获得生活必需包',
      '100,000+ 份餐食被提供或送达',
      '50+ 个偏远社区获得定期支持',
      '200+ 名活跃青年志愿者',
      '服务覆盖马来西亚多个州属，包括 Sabah 和 Sarawak',
    ],
    impactClosing:
      '我们不只计算数字，也重视人与人之间的连接。每一餐、每一个书包、每一次探访卧床长者，都是搭起的一座关怀之桥。',
  },
}

export function getAboutStoryContent(locale: Locale) {
  return aboutStoryContentByLocale[locale]
}
