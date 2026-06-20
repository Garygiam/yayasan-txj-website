import groq from 'groq'

export const siteSettingsQuery = groq`*[_type == "siteSettings" && _id == "siteSettings"][0]{
  officialName,
  brandName,
  tagline,
  vision,
  mission,
  philosophy,
  founderName,
  contactPhone,
  contactEmail,
  contactAddress,
  websiteUrl,
  homeHeroHeadline,
  homeHeroSubheadline,
  homeHeroSlides,
  homeStats,
  urgentNeedsTitle,
  urgentNeedsItems,
  urgentNeedsCtaLabel,
  urgentNeedsCtaLink,
  homeTransparencyTitle,
  homeTransparencySteps,
  founderSpotlightTitle,
  founderSpotlightSummary,
  founderQuote,
  homeFinalCtaTitle,
  homeFinalCtas
}`

export const programsQuery = groq`*[_type == "program"]|order(slug.current asc){
  _id,
  "slug": slug.current,
  name,
  summary,
  body,
  howToHelp,
  logisticsNotes
}`

export const programBySlugQuery = groq`*[_type == "program" && slug.current == $slug][0]{
  _id,
  "slug": slug.current,
  name,
  summary,
  body,
  howToHelp,
  logisticsNotes
}`

export const impactStoriesQuery = groq`*[_type == "impactStory" && defined(publishedAt)]|order(publishedAt desc){
  _id,
  "slug": slug.current,
  title,
  body,
  publishedAt,
  gallery[]{
    _key,
    alt,
    asset->{
      _ref,
      url
    }
  }
}`

export const leadershipMembersQuery = groq`*[_type == "leadershipMember"]|order(group asc, displayOrder asc){
  _id,
  name,
  title,
  group,
  displayOrder,
  photo,
  shortBio,
  isFeatured
}`
