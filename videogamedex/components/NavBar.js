import React from 'react'
import styles from '../styles/NavBar.module.css'

const NavBar = () => {
  return (
    <nav className={styles.nav}>
        <div className={styles.navtitle}>
            <h1>VideoGameDex</h1>
        </div>
        <div>
            <input placeholder='Search 790k+ games' type='text' className={styles.searchbar}/>
        </div>
    </nav>
  )
}
// const NavBar = () => {
//   return (
//     <nav >
//         <div >
//             <h1>VideoGameDex</h1>
//         </div>
//         <div>
//             <input placeholder='Search 790k+ games' type='text' />
//         </div>
//     </nav>
//   )
// }

export default NavBar