import React from 'react'
import styles from '../styles/Metascore.module.css'

const Metascore = ({metascore}) => {

    const metascoreColor = (metascore) => {
        // if(metascore.metascore > 90) {

        // }



    }

  return (
    <div className={styles.container} id='meta'>{metascore}</div>
  )
}

export default Metascore