import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/GameCard.module.css'

const GameCard = ({name, img, slug, id}) => {
  return (
    <>
        <Link href='/games/[id]' as={`/games/${slug}`} key={id}>
            <div className={styles.game}>
                <Image src={img} alt={name} width={400} height={250} />
                <h1 className={styles.title}>{name}</h1>
            </div>
        </Link>
    </>
  )
}

export default GameCard