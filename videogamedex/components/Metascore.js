import React from 'react'
import styles from '../styles/Metascore.module.css'

const Metascore = ({metascore}) => {

  return (
    <div className={styles.container} id='meta'>
      <div className={metascore >= 75 ? styles.green
           : metascore >= 60 && metascore <= 74 ? styles.orange
           : styles.red}>
        {metascore}
      </div>
    </div>
  )
}

export default Metascore