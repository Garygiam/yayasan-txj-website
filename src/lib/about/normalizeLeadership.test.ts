import {describe, expect, it} from 'vitest'
import {buildLeadershipViewModel} from './normalizeLeadership'
import type {LeadershipMember} from '../sanity/types'
import * as sanityQueries from '../sanity/queries'
import * as sanityRead from '../sanity/read'

const typedMember: LeadershipMember = {
  _id: 'typed-1',
  name: 'Typed Member',
  title: {en: 'Director'},
  group: 'board',
  displayOrder: 1,
}

const members = [
  {
    _id: 'leader-1',
    name: "Dato' Sri Charles Hwang",
    title: {en: 'Founder and Chair'},
    group: 'board',
    displayOrder: 1,
    shortBio: {en: 'Leads TXJ Care with a practical, long-term model of service.'},
    isFeatured: true,
  },
  {
    _id: 'leader-2',
    name: 'Director Example',
    title: {en: 'Director'},
    group: 'board',
    displayOrder: 2,
  },
  {
    _id: 'leader-3',
    name: 'Operations Lead',
    title: {en: 'Head of Operations'},
    group: 'management',
    displayOrder: 1,
    shortBio: {en: 'Coordinates field execution and delivery operations.'},
  },
] as const

describe('buildLeadershipViewModel', () => {
  it('exposes the leadership member type for board and management groups', () => {
    expect(typedMember.group).toBe('board')
  })

  it('exposes leadership query and read helpers', () => {
    expect(sanityQueries.leadershipMembersQuery).toContain('leadershipMember')
    expect(typeof sanityRead.getLeadershipMembers).toBe('function')
  })

  it('selects the featured leader and groups remaining profiles', () => {
    const model = buildLeadershipViewModel({locale: 'en', members: [...members]})

    expect(model.featuredLeader?.name).toBe("Dato' Sri Charles Hwang")
    expect(model.boardMembers).toHaveLength(1)
    expect(model.managementMembers).toHaveLength(8)
    expect(model.boardMembers[0].title).toBe('Director')
  })

  it('keeps cards renderable when photo or bio is missing', () => {
    const model = buildLeadershipViewModel({
      locale: 'en',
      members: [
        {
          _id: 'leader-4',
          name: 'Board Member',
          title: {en: 'Board Member'},
          group: 'board',
          displayOrder: 3,
        },
      ],
    })

    expect(model.featuredLeader).toBeNull()
    expect(model.boardMembers[0]).toMatchObject({
      name: 'Board Member',
      title: 'Board Member',
      photoUrl: null,
      shortBio: null,
    })
  })

  it('uses safe fallback leadership content when runtime members are unavailable', () => {
    const model = buildLeadershipViewModel({
      locale: 'en',
      members: [],
    })

    expect(model.featuredLeader).toMatchObject({
      name: "Dato' Sri Charles Hwang",
      title: 'Founder and Chair',
      photoUrl: '/about/featured-leader.png',
    })
    expect(model.boardMembers[0]).toMatchObject({
      name: 'Hwang Jia-Zhen',
      title: 'First Deputy Chairman',
      photoUrl: '/about/hwang-jia-zhen.png',
      photoObjectPosition: 'center 24%',
    })
    expect(model.boardMembers[1]).toMatchObject({
      name: 'Gary Giam',
      title: 'Second Deputy Chairman',
      photoUrl: '/about/Gary Giam.png',
    })
    expect(model.boardMembers).toHaveLength(2)
    expect(model.managementMembers).toHaveLength(8)
  })

  it('localizes fallback leadership titles when non-English locales use fallback data', () => {
    const bmModel = buildLeadershipViewModel({
      locale: 'bm',
      members: [],
    })
    const zhModel = buildLeadershipViewModel({
      locale: 'zh',
      members: [],
    })

    expect(bmModel.featuredLeader).toMatchObject({
      title: 'Pengasas dan Pengerusi',
    })
    expect(bmModel.managementMembers.find((member) => member.name === 'QIQI')).toMatchObject({
      title: 'Ketua Pegawai Komunikasi',
    })
    expect(zhModel.featuredLeader).toMatchObject({
      title: '创办人兼主席',
    })
    expect(zhModel.managementMembers.find((member) => member.name === 'QIQI')).toMatchObject({
      title: '首席传播官',
    })
  })

  it('omits empty leadership groups and missing featured profiles cleanly', () => {
    const model = buildLeadershipViewModel({
      locale: 'en',
      members: [
        {
          _id: 'management-only',
          name: 'Management Example',
          title: {en: 'Operations Manager'},
          group: 'management',
          displayOrder: 1,
        },
      ],
    })

    expect(model.featuredLeader).toBeNull()
    expect(model.boardMembers).toEqual([])
    expect(model.managementMembers).toHaveLength(8)
  })

  it('appends fixed additional management profiles even when Sanity returns leadership members', () => {
    const model = buildLeadershipViewModel({
      locale: 'en',
      members: [
        {
          _id: 'sanity-management-1',
          name: 'Existing Management',
          title: {en: 'Head of Operations'},
          group: 'management',
          displayOrder: 1,
        },
      ],
    })

    expect(model.managementMembers.map((member) => member.name)).toContain('QIQI')
    expect(model.managementMembers.map((member) => member.name)).toContain('Dax')
    expect(model.managementMembers).toHaveLength(8)
  })

  it('uses uploaded portrait files for the fixed management profiles', () => {
    const model = buildLeadershipViewModel({
      locale: 'en',
      members: [],
    })

    expect(model.managementMembers.find((member) => member.name === 'QIQI')).toMatchObject({
      photoUrl: '/about/Qiqi.png',
      photoAlt: 'QIQI portrait',
    })
    expect(model.managementMembers.find((member) => member.name === 'Eve Sim')).toMatchObject({
      photoUrl: '/about/Eve Sim.png',
      photoAlt: 'Eve Sim portrait',
    })
    expect(model.managementMembers.find((member) => member.name === 'Elaine Wong')).toMatchObject({
      photoUrl: '/about/Elaine Wong.jpeg',
      photoAlt: 'Elaine Wong portrait',
    })
    expect(model.managementMembers.find((member) => member.name === 'Adam Chang Yin Fui')).toMatchObject({
      photoUrl: '/about/Adam Chang Yin fui.png',
      photoAlt: 'Adam Chang Yin Fui portrait',
    })
    expect(model.managementMembers.find((member) => member.name === 'Kelvin Chang Khang Vui')).toMatchObject({
      photoUrl: '/about/Kelvin Chang Khang Vui.png',
      photoAlt: 'Kelvin Chang Khang Vui portrait',
    })
    expect(model.managementMembers.find((member) => member.name === 'Mee See')).toMatchObject({
      photoUrl: '/about/Mee See.png',
      photoAlt: 'Mee See portrait',
    })
    expect(model.managementMembers.find((member) => member.name === 'Dax')).toMatchObject({
      photoUrl: '/about/Dax.png',
      photoAlt: 'Dax portrait',
    })
  })

  it('keeps operations management lead as the last management profile', () => {
    const model = buildLeadershipViewModel({
      locale: 'en',
      members: [
        {
          _id: 'sanity-management-operations',
          name: 'Operations Management Lead',
          title: {en: 'Head of Operations'},
          group: 'management',
          displayOrder: 1,
        },
      ],
    })

    expect(model.managementMembers[model.managementMembers.length - 1]?.name).toBe('Operations Management Lead')
  })

  it('assigns stable slugs to leadership profiles for detail routes', () => {
    const model = buildLeadershipViewModel({
      locale: 'en',
      members: [
        {
          _id: 'board-member',
          name: 'Gary Giam',
          title: {en: 'Second Deputy Chairman'},
          group: 'board',
          displayOrder: 1,
        },
      ],
    })

    expect(model.boardMembers[0]?.slug).toBe('gary-giam')
    expect(model.managementMembers.find((member) => member.name === 'Adam Chang Yin Fui')?.slug).toBe(
      'adam-chang-yin-fui',
    )
  })
})
