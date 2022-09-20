import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/GameCard.module.css'
import Metascore from './Metascore'

const GameCard = ({name, img, slug, id, metascore}) => {
  return (
    <>
        <Link href='/games/[id]' as={`/games/${slug}`} key={id}>
            <div className={styles.game}>
                <Image src={img} alt={name} width={400} height={250} />
                <div>
                  <h1 className={styles.title}>{name}</h1>
                  <Metascore metascore={metascore}/>
                </div>
            </div>
        </Link>
    </>
  )
}

export default GameCard