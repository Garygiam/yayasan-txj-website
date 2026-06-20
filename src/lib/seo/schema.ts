export type BreadcrumbItem = {
  name: string
  url: string
}

type OrganizationSchemaInput = {
  siteUrl: string
  brandName: string
  officialName: string
  description: string
}

export function buildOrganizationSchemas({
  siteUrl,
  brandName,
  officialName,
  description,
}: OrganizationSchemaInput) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: brandName,
      legalName: officialName,
      url: siteUrl,
      description,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'NonprofitOrganization',
      name: brandName,
      legalName: officialName,
      url: siteUrl,
      description,
    },
  ]
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
