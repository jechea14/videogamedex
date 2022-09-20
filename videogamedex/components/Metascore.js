import React from 'react'
import styles from '../styles/Metascore.module.css'

const Metascore = ({metascore}) => {
  return (
    <div className={styles.container}>{metascore}</div>
  )
}

export default Metascore