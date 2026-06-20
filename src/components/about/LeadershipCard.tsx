/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import type {LeadershipCardModel} from '@/lib/about/types'
import styles from './about.module.css'

export function LeadershipCard({href, person}: {href: string; person: LeadershipCardModel}) {
  return (
    <Link className={styles.cardLink} href={href}>
      <article className={styles.card}>
        {person.photoUrl ? (
          <div className={styles.cardPhoto}>
            <img
              alt={person.photoAlt}
              className={styles.cardImage}
              src={person.photoUrl}
              style={person.photoObjectPosition ? {objectPosition: person.photoObjectPosition} : undefined}
            />
          </div>
        ) : null}
        <div className={styles.cardBody}>
          <h3>{person.name}</h3>
          <p className={styles.cardTitle}>{person.title}</p>
          {person.shortBio ? <p>{person.shortBio}</p> : null}
        </div>
      </article>
    </Link>
  )
}
