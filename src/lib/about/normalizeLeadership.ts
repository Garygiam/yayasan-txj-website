import type {Locale} from '../../i18n/config'
import {pickLocaleString, pickLocaleText} from '../sanity/resolveLocale'
import type {LeadershipCardModel, LeadershipMemberSource, LeadershipViewModel} from './types'

const fallbackLeadershipMembers: LeadershipMemberSource[] = [
  {
    _id: 'fallback-featured-founder',
    name: "Dato' Sri Charles Hwang",
    title: {en: 'Founder and Chair', bm: 'Pengasas dan Pengerusi', zh: '创办人兼主席'},
    group: 'board',
    displayOrder: 1,
    photoUrl: '/about/featured-leader.png',
    photoAlt: "Dato' Sri Charles Hwang portrait",
    shortBio: {
      en: 'Provides long-term direction for TXJ Care with a practical model of transparent, community-based service.',
      bm: 'Memberi hala tuju jangka panjang kepada TXJ Care melalui model khidmat yang praktikal, telus, dan berasaskan komuniti.',
      zh: '以务实、透明、社区导向的服务模式，为 TXJ Care 提供长期方向。',
    },
    isFeatured: true,
  },
  {
    _id: 'fallback-board-governance',
    name: 'Hwang Jia-Zhen',
    title: {en: 'First Deputy Chairman', bm: 'Timbalan Pengerusi Pertama', zh: '第一副主席'},
    group: 'board',
    displayOrder: 2,
    photoUrl: '/about/hwang-jia-zhen.png',
    photoAlt: 'Hwang Jia-Zhen portrait',
    photoObjectPosition: 'center 24%',
    shortBio: {
      en: 'Supports governance oversight, stewardship, and accountable delivery across the organization.',
      bm: 'Menyokong tadbir urus, pemeliharaan amanah, dan penyampaian yang bertanggungjawab di seluruh organisasi.',
      zh: '支持机构的治理监督、 stewardship 与问责执行。',
    },
  },
  {
    _id: 'fallback-board-community',
    name: 'Gary Giam',
    title: {en: 'Second Deputy Chairman', bm: 'Timbalan Pengerusi Kedua', zh: '第二副主席'},
    group: 'board',
    displayOrder: 3,
    photoUrl: '/about/Gary Giam.png',
    photoAlt: 'Gary Giam portrait',
    shortBio: {
      en: 'Helps align board decisions with on-the-ground community needs and partner feedback.',
      bm: 'Membantu menyelaraskan keputusan lembaga dengan keperluan komuniti di lapangan dan maklum balas rakan kerjasama.',
      zh: '协助让董事会决策更贴近前线社区需求与伙伴反馈。',
    },
  },
  {
    _id: 'fallback-management-operations',
    name: 'Operations Management Lead',
    title: {en: 'Head of Operations', bm: 'Ketua Operasi', zh: '运营主管'},
    group: 'management',
    displayOrder: 1,
    shortBio: {
      en: 'Coordinates field delivery, volunteer logistics, and day-to-day execution for community support programs.',
      bm: 'Menyelaras pelaksanaan lapangan, logistik sukarelawan, dan operasi harian bagi program sokongan komuniti.',
      zh: '统筹前线执行、志愿者物流与社区支持项目的日常运作。',
    },
  },
]

const additionalManagementMembers: LeadershipMemberSource[] = [
  {
    _id: 'fixed-management-qiqi',
    name: 'QIQI',
    title: {en: 'Chief Communications Officer', bm: 'Ketua Pegawai Komunikasi', zh: '首席传播官'},
    group: 'management',
    displayOrder: 10,
    photoUrl: '/about/Qiqi.png',
    photoAlt: 'QIQI portrait',
  },
  {
    _id: 'fixed-management-eve-sim',
    name: 'Eve Sim',
    title: {en: 'Head of Partnerships', bm: 'Ketua Kerjasama', zh: '合作事务主管'},
    group: 'management',
    displayOrder: 11,
    photoUrl: '/about/Eve Sim.png',
    photoAlt: 'Eve Sim portrait',
  },
  {
    _id: 'fixed-management-elaine-wong',
    name: 'Elaine Wong',
    title: {en: 'Head of Rural Community Aid', bm: 'Ketua Bantuan Komuniti Luar Bandar', zh: '乡区社区援助主管'},
    group: 'management',
    displayOrder: 12,
    photoUrl: '/about/Elaine Wong.jpeg',
    photoAlt: 'Elaine Wong portrait',
  },
  {
    _id: 'fixed-management-adam-chang-yin-fui',
    name: 'Adam Chang Yin Fui',
    title: {en: 'Head of Homeless Support', bm: 'Ketua Sokongan Gelandangan', zh: '流浪者支援主管'},
    group: 'management',
    displayOrder: 13,
    photoUrl: '/about/Adam Chang Yin fui.png',
    photoAlt: 'Adam Chang Yin Fui portrait',
  },
  {
    _id: 'fixed-management-kelvin-chang-khang-vui',
    name: 'Kelvin Chang Khang Vui',
    title: {en: 'Head of Orphanage Partnerships', bm: 'Ketua Kerjasama Rumah Anak Yatim', zh: '孤儿院合作主管'},
    group: 'management',
    displayOrder: 14,
    photoUrl: '/about/Kelvin Chang Khang Vui.png',
    photoAlt: 'Kelvin Chang Khang Vui portrait',
  },
  {
    _id: 'fixed-management-mee-see',
    name: 'Mee See',
    title: {en: 'Program Director', bm: 'Pengarah Program', zh: '项目总监'},
    group: 'management',
    displayOrder: 15,
    photoUrl: '/about/Mee See.png',
    photoAlt: 'Mee See portrait',
  },
  {
    _id: 'fixed-management-dax',
    name: 'Dax',
    title: {en: 'Finance & Admin Manager', bm: 'Pengurus Kewangan dan Pentadbiran', zh: '财务与行政经理'},
    group: 'management',
    displayOrder: 16,
    photoUrl: '/about/Dax.png',
    photoAlt: 'Dax portrait',
  },
]

function createLeadershipSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function toCard(locale: Locale, member: LeadershipMemberSource): LeadershipCardModel {
  return {
    id: member._id,
    slug: createLeadershipSlug(member.name),
    name: member.name,
    title: pickLocaleString(member.title, locale),
    group: member.group,
    photoUrl: member.photoUrl ?? null,
    photoAlt: member.photoAlt ?? `${member.name} portrait`,
    photoObjectPosition: member.photoObjectPosition ?? null,
    shortBio: pickLocaleText(member.shortBio, locale) || null,
  }
}

function getMergedLeadershipMembers(members: LeadershipMemberSource[]) {
  const baseMembers = members.length > 0 ? members : fallbackLeadershipMembers
  return baseMembers.map((member) => {
    if (member.group !== 'management') return member
    if (member.name !== 'Operations Management Lead') return member
    return {...member, displayOrder: 99}
  })
}

function getSortedLeadershipMembers(members: LeadershipMemberSource[]) {
  const normalizedBaseMembers = getMergedLeadershipMembers(members)
  const mergedMembers = [
    ...normalizedBaseMembers,
    ...additionalManagementMembers.filter(
      (member) =>
        !normalizedBaseMembers.some((existing) => existing.group === 'management' && existing.name === member.name),
    ),
  ]
  const sortedMembers = [...mergedMembers].sort((left, right) => {
    return (left.displayOrder ?? Number.MAX_SAFE_INTEGER) - (right.displayOrder ?? Number.MAX_SAFE_INTEGER)
  })

  return sortedMembers
}

export function buildLeadershipViewModel({
  locale,
  members,
}: {
  locale: Locale
  members: LeadershipMemberSource[]
}): LeadershipViewModel {
  const sortedMembers = getSortedLeadershipMembers(members)
  const featuredSource = sortedMembers.find((member) => member.isFeatured) ?? null

  return {
    featuredLeader: featuredSource ? toCard(locale, featuredSource) : null,
    boardMembers: sortedMembers
      .filter((member) => member.group === 'board' && member._id !== featuredSource?._id)
      .map((member) => toCard(locale, member)),
    managementMembers: sortedMembers
      .filter((member) => member.group === 'management' && member._id !== featuredSource?._id)
      .map((member) => toCard(locale, member)),
  }
}

export function getLeadershipProfileBySlug({
  locale,
  members,
  slug,
}: {
  locale: Locale
  members: LeadershipMemberSource[]
  slug: string
}): LeadershipCardModel | null {
  const member = getSortedLeadershipMembers(members).find((candidate) => createLeadershipSlug(candidate.name) === slug)
  return member ? toCard(locale, member) : null
}
