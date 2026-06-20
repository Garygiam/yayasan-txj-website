import {getFallbackProgramBySlug, getFallbackPrograms} from '../programs/fallbackPrograms'
import type {ImpactStory, LeadershipMember, Program, SiteSettings} from './types'
import {getSanityReadClient} from './client'
import {
  impactStoriesQuery,
  leadershipMembersQuery,
  programBySlugQuery,
  programsQuery,
  siteSettingsQuery,
} from './queries'

export async function getSiteSettings(): Promise<SiteSettings | null> {
  const client = getSanityReadClient()
  if (!client) return null
  return client.fetch(siteSettingsQuery)
}

export async function getPrograms(): Promise<Program[]> {
  const client = getSanityReadClient()
  if (!client) return getFallbackPrograms()

  const programs = await client.fetch<Program[]>(programsQuery)
  return programs.length > 0 ? programs : getFallbackPrograms()
}

export async function getProgramBySlug(slug: string): Promise<Program | null> {
  const client = getSanityReadClient()
  if (!client) return getFallbackProgramBySlug(slug)

  const program = await client.fetch<Program | null>(programBySlugQuery, {slug})
  return program ?? getFallbackProgramBySlug(slug)
}

export async function getImpactStories(): Promise<ImpactStory[]> {
  const client = getSanityReadClient()
  if (!client) return []
  return client.fetch<ImpactStory[]>(impactStoriesQuery)
}

export async function getLeadershipMembers(): Promise<LeadershipMember[]> {
  const client = getSanityReadClient()
  if (!client) return []
  return client.fetch(leadershipMembersQuery)
}
