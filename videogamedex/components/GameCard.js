import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/GameCard.module.css'
import Metascore from './Metascore'

const GameCard = ({name, img, slug, id, metascore, platform}) => {

  return (
    <>
        <div className={styles.game}>
          <div>
            {
              img === null ? 
              <></> :
              <Image src={img} alt={name} width={400} height={250} loading="lazy"/>

            }
            <div className={styles.titleAndMetascore}>
              <h1 className={styles.title}>{name}</h1>
              <Metascore metascore={metascore}/>
            </div>
            {
              platform === undefined ? <p>N/A</p> : <>            <div className={styles.platform}>
              {
                platform.map((platforms) => {
                  return <p key={platforms.platform.name} className={styles.platformName}>{platforms.platform.name}</p>
                })
              }</div></>
            }

            
          </div>
          <Link href='/games/[id]' as={`/games/${slug}`} key={id}>
            <div className={styles.link}>
              <button className={styles.linkButton}>
                View More
              </button>
            </div>
          </Link>
        </div>
    </>
  )
}

export default GameCard