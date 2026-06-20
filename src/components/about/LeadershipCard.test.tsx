import {describe, expect, it} from 'vitest'
import {renderToStaticMarkup} from 'react-dom/server'
import {LeadershipCard} from './LeadershipCard'
import styles from './about.module.css'

describe('LeadershipCard', () => {
  it('does not render an empty photo container when no photoUrl is provided', () => {
    const markup = renderToStaticMarkup(
      <LeadershipCard
        href="/en/about/team/no-photo-person"
        person={{
          id: 'no-photo',
          slug: 'no-photo-person',
          name: 'No Photo Person',
          title: 'Role',
          group: 'management',
          photoUrl: null,
          photoAlt: 'No Photo Person portrait',
          photoObjectPosition: null,
          shortBio: null,
        }}
      />,
    )

    expect(markup).not.toContain('<img')
    expect(markup).not.toContain(styles.cardPhoto)
    expect(markup).toContain('/en/about/team/no-photo-person')
  })
})
