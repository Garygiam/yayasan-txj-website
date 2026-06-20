import type {LocaleString, LocaleText} from '../sanity/types'

export type LeadershipGroup = 'board' | 'management'

export type LeadershipMemberSource = {
  _id: string
  name: string
  title?: LocaleString
  group: LeadershipGroup
  displayOrder?: number
  shortBio?: LocaleText
  isFeatured?: boolean
  photoUrl?: string | null
  photoAlt?: string | null
  photoObjectPosition?: string | null
}

export type LeadershipCardModel = {
  id: string
  slug: string
  name: string
  title: string
  group: LeadershipGroup
  photoUrl: string | null
  photoAlt: string
  photoObjectPosition: string | null
  shortBio: string | null
}

export type LeadershipViewModel = {
  featuredLeader: LeadershipCardModel | null
  boardMembers: LeadershipCardModel[]
  managementMembers: LeadershipCardModel[]
}
