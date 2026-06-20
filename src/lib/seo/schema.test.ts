import {describe, expect, it} from 'vitest'
import {buildBreadcrumbSchema, buildOrganizationSchemas} from './schema'

describe('schema helpers', () => {
  it('builds organization and nonprofit organization schema objects', () => {
    const schemas = buildOrganizationSchemas({
      siteUrl: 'https://yayasantxj.org',
      brandName: 'TXJ Care',
      officialName: 'Yayasan TXJ Malaysia',
      description: 'Community support across Malaysia',
    })

    expect(schemas).toHaveLength(2)
    expect(schemas[0]).toMatchObject({['@type']: 'Organization'})
    expect(schemas[1]).toMatchObject({['@type']: 'NonprofitOrganization'})
  })

  it('builds breadcrumb schema from ordered items', () => {
    const schema = buildBreadcrumbSchema([
      {name: 'Home', url: 'https://yayasantxj.org/en'},
      {name: 'Programs', url: 'https://yayasantxj.org/en/programs'},
      {name: 'Homeless Support', url: 'https://yayasantxj.org/en/programs/homeless'},
    ])

    expect(schema).toMatchObject({['@type']: 'BreadcrumbList'})
    expect(schema.itemListElement).toHaveLength(3)
  })
})
