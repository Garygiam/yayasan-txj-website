import {createClient} from '@sanity/client'

type SanityConfig = {
  projectId?: string
  dataset?: string
  apiVersion: string
}

export const sanityConfig: SanityConfig = {
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: process.env.SANITY_API_VERSION ?? '2025-01-01',
}

export function getSanityReadClient() {
  if (!sanityConfig.projectId || !sanityConfig.dataset) return null
  return createClient({
    projectId: sanityConfig.projectId,
    dataset: sanityConfig.dataset,
    apiVersion: sanityConfig.apiVersion,
    useCdn: true,
    perspective: 'published',
  })
}

export function getSanityWriteClient() {
  if (!sanityConfig.projectId || !sanityConfig.dataset) return null

  const token = process.env.SANITY_READ_TOKEN
  if (!token) return null

  return createClient({
    projectId: sanityConfig.projectId,
    dataset: sanityConfig.dataset,
    apiVersion: sanityConfig.apiVersion,
    useCdn: false,
    token,
    perspective: 'published',
  })
}
